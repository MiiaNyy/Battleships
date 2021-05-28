/*import {
    getFirstCharacterFromHint,
    getRowCoordinate,
    getColumnCoordinate,
    isNumeric
} from "../game_helpers/playerFactoryHelpers"
import shipTypes from "../game_helpers/shipTypes";


import { isNumeric } from "../game_helpers/playerFactoryHelpers";*/

class Player {
    constructor(name, turn) {
        this.name = name;
        this.turn = turn;
        this.shotsFired = 0;
        this.shotsReceived = 0;
        this.allMissedShots = [];
        this.allHitShots = 0;
        // list of ship objects, that is created when hit happens. It creates id, arr of coordinates that has been
        // found and list of possible neighbors
        // e.g: [{coordinates: ['a1'], shipSunk: false, neighbors: [{mark: 'b1', tried: false}, {mark: 'a1', tried: false}]}]
        this.foundShips = [];
        //this.enemy'sSunkenShips = [] // coordinates of enemy's sunken ships
        this.allFiredShots = [];
        this.latestShotCoordinate = '';
        this.timesTriedToShootEnemy = 0;
    }

    turnOver() {
        this.turn = false;
    }

    startTurn() {
        this.turn = true;
    }

    setShots(attackHit, coordinate) {
        this.shotsFired++;
        this.allFiredShots.push(coordinate);
        if ( attackHit ) {
            this.addCoordinateToFoundShipsList(coordinate);
            this.allHitShots++;
            console.log(this.name + ' player all shots fired ' + this.allFiredShots)

        } else {
            this.allMissedShots.push(coordinate);
        }
    }

    addCoordinateToFoundShipsList(coordinate) {
        // check if coordinate is neighbor to older hit coordinate. If false, create new foundShips item
        const foundShipsNeighbor = checkIfCoordinateHitShipsNeighbor(coordinate, this.foundShips);
        if ( !foundShipsNeighbor ) {
            this.foundShips.push({
                coordinates: [coordinate],
                shipSunk: false,
                sharedMark: undefined,
                neighbors: getCoordinatesNeighbors(coordinate)
            });
        }
    }

    // loops already fired shots to check if shot is valid (cannot shot twice in the same coordinate)
    shotIsValid(coordinate) {
        for (let i = 0; i < this.allFiredShots.length; i++) {
            if ( this.allFiredShots[i] === coordinate ) {
                return false
            }
        }
        return true
    }

    // Computer uses this method. Human player chooses coordinate by clicking the cell.
    shootTheEnemy() {
        let coordinate = getCoordinateFromHitNeighbors(this.foundShips);

        if ( coordinate === undefined ) {
            console.log('giving random coordinate')
            coordinate = getRandomCoordinate();
        }
        /* let coordinate;
 coordinate = this.foundShips.length === 0 ? getRandomCoordinate() : getCoordinateFromHitNeighbors(this.foundShips);*/
        // timesTriedToSHootEnemy is fail safe, if getCoordinate don't give valid coordinate with a hint in 10 tries,
        ///let coordinate = lastShotFired === lastShotHit && this.timesTriedToShootEnemy < 10 ?
        // this.getCoordinate(lastShotFired) : this.getCoordinate();


        if ( !this.shotIsValid(coordinate) ) {
            console.log('shot at coordinate ' + coordinate + ' was not valid')
            this.timesTriedToShootEnemy++;
            this.shootTheEnemy();
        } else {
            console.log('shot at coordinate ' + coordinate)
            this.timesTriedToShootEnemy = 0;
            this.shotsFired++;
            this.latestShotCoordinate = coordinate;
        }
    }


}

function getCoordinateFromHitNeighbors(foundShips) {

    for (let i = 0; i < foundShips.length; i++) {
        const neighborCoordinates = foundShips[i].neighbors; // Example:  neighbors:[{mark: 'b1', tried: false}]}
        for (let j = 0; j < neighborCoordinates.length; j++) {
            const neighbor = neighborCoordinates[j];
            if ( !neighbor.tried ) {
                console.log('giving coordinate from neighbor')
                neighbor.tried = true;
                return neighbor.mark
            }
        }

    }
    return getRandomCoordinate();
}

function getRandomCoordinate() {
    const gridColumns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const columnIndex = Math.floor(Math.random() * 9);
    const rowIndex = (Math.floor(Math.random() * 9)) + 1;
    return gridColumns[columnIndex] + rowIndex;

}

function checkIfCoordinateHitShipsNeighbor(coordinate, foundShips) {

    for (let i = 0; i < foundShips.length; i++) {
        const ship = foundShips[i]; // Example: {coordinate: ['a1'], shipSunk: false, neighbors: [{mark:
        // 'b1', tried: false}]}

        const shipsNeighbors = ship.neighbors; // list of possible next coordinates where ship is
        if ( !ship.shipSunk ) { // If ship is sunk, jump over this one
            break;
        } else {
            for (let j = 0; j < shipsNeighbors.length; j++) {
                let neighborCoordinate = shipsNeighbors[j];
                if ( neighborCoordinate.mark === coordinate ) {
                    ship.coordinates.push(coordinate); // add this coordinate to ship obj
                    modifyShipsNeighborList(ship, coordinate, j, ship.neighbors);
                    return true;
                }
            }
        }
    }
    return false;
}

function modifyShipsNeighborList(ship, coordinate, currentIndex, shipsNeighbors) {

    shipsNeighbors.splice(currentIndex, 1); // remove this coordinate from possible neighbors
    if ( ship.sharedMark === undefined ) { // check if ships direction has been found yet
        ship.sharedMark = getShipsDirection(ship.coordinates);
        // delete all of the neighbors that do not share the shared mark
        removeRedundantNeighbors(shipsNeighbors, ship.sharedMark)
    }
    // add new possible neighbors to neighbors arr
    const newNeighbor = getNewNeighborsWithSharedMark(coordinate, ship.sharedMark, ship.coordinates)
    shipsNeighbors.push(newNeighbor);
}

function removeRedundantNeighbors(shipsNeighbors, sharedMark) {
    for (let i = 0; i < shipsNeighbors.length; i++) { // all of the possible hit coordinates, near older hit coordinate
        const currentNeighbor = shipsNeighbors[i].mark;
        const [horizontalMark, verticalMark] = getHorizontalAndVerticalMark(currentNeighbor);
        if ( horizontalMark !== sharedMark && verticalMark !== sharedMark ) {
            shipsNeighbors.splice(i, 1);
        }
    }
}


function getNewNeighborsWithSharedMark(coordinate, sharedMark, shipsCoordinates) {
    const [horizontalMark, verticalMark] = getHorizontalAndVerticalMark(coordinate);

    let possibleNeighbors;
    let neighbors = [];

    if ( isNumeric(sharedMark) ) { // e.g sharedMark = 1/ sharedMark is verticalMark
        possibleNeighbors = getHorizontalNeighbors(horizontalMark, sharedMark);
    } else {
        possibleNeighbors = getVerticalNeighbors(sharedMark, verticalMark);
    }

    for (let i = 0; i < shipsCoordinates.length; i++) { // all of the coordinates that already has been hit/found
        for (let j = 0; j < possibleNeighbors.length; j++) {
            if ( shipsCoordinates[i] !== possibleNeighbors[j] ) {
                neighbors.push({mark: possibleNeighbors[j], tried: false})
            }
        }
    }
    return neighbors;
}

function getHorizontalAndVerticalMark(coordinate) {
    return [coordinate[0], Number(coordinate.substring(1))];
}

function getShipsDirection(shipsCoordinates) {
    const coordinateOne = shipsCoordinates[0];
    const coordinateTwo = shipsCoordinates[1];

    const coordinateOneHorizontal = coordinateOne[0]; // alphabet
    const coordinateOneVertical = Number(coordinateOne.substring(1)); // number

    const coordinateTwoHorizontal = coordinateTwo[0];
    // if horizontal coordinates not the same, we can assume that vertical coordinate is same in both
    return coordinateOneHorizontal === coordinateTwoHorizontal ? coordinateOneHorizontal : coordinateOneVertical;

}


function getCoordinatesNeighbors(coordinate) {
    const [horizontalMark, verticalMark] = getHorizontalAndVerticalMark(coordinate);
    const neighbors = []; // Example neighbors: [{mark: 'b1', tried: false}]}]

    const horizontalNeighbors = getHorizontalNeighbors(horizontalMark, verticalMark);
    const verticalNeighbors = getVerticalNeighbors(horizontalMark, verticalMark);

    horizontalNeighbors.forEach((element)=>{
        neighbors.push({mark: element, tried: false})
    })

    verticalNeighbors.forEach((element)=>{
        neighbors.push({mark: element, tried: false})
    })

    return neighbors
}

function getHorizontalNeighbors(horizontalMark, verticalMark) {
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const columnIndex = columns.indexOf(horizontalMark);
    // if coordinate is a/j (start/end columns), there is only one horizontal neighbor
    if ( columnIndex === 0 ) {
        return [columns[columnIndex + 1] + verticalMark]
    } else if ( columnIndex === (columns.length - 1) ) {
        return [columns[columnIndex - 1] + verticalMark]
    } else {
        return [columns[columnIndex - 1] + verticalMark, columns[columnIndex + 1] + verticalMark]
    }
}

function getVerticalNeighbors(horizontalMark, verticalMark) {
    if ( verticalMark === 1 ) {
        return [horizontalMark + 2]
    } else if ( verticalMark === 10 ) {
        return [horizontalMark + 9]
    } else {
        return [horizontalMark + (verticalMark + 1), horizontalMark + (verticalMark - 1)]
    }
}

function isNumeric(num) {
    return !isNaN(num)
}

getNewNeighborsWithSharedMark('b1', '1', ['a1'])

export default Player;















