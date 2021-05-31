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
        this.shotsReceived = 0;
        this.allHitShots = 0;
        // array of ship objects, that is created when hit happens in the enemy board. Includes coordinates that have
        // been found and array of possible neighbors e.g: [{coordinates: ['a1'], shipSunk: false, neighbors: [{mark: 'b1', tried: false}, {mark: 'a1', tried: false}]}]
        this.foundShips = [];
        this.allFiredShots = []; // coordinates of all of the fired shots to enemy gameboard
        this.allMissedShots = [];
        this.latestShotCoordinate = '';
    }

    turnOver() {
        this.turn = false;
    }

    startTurn() {
        this.turn = true;
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
        let coordinate = getCoordinateFromOlderHit(this.foundShips);

        if ( coordinate === undefined ) {
            coordinate = getRandomCoordinate();
        }

        if ( this.shotIsValid(coordinate) ) {
            this.latestShotCoordinate = coordinate;
        } else {
            console.log('shot at coordinate ' + coordinate + ' was not valid')
            this.shootTheEnemy();
        }
    }

    setShots(attackHit, shipThatGotHit, coordinate) {
        this.allFiredShots.push(coordinate);
        if ( attackHit ) {
            this.allHitShots++;
            if ( shipThatGotHit.sunk ) {
                console.log('ship sunk and now changing sunk status. ship.position is ' + shipThatGotHit.position);
                this.changeShipsStatusToSunk(shipThatGotHit.position);
            } else {
                // adds hit shot to already existing foundShips arr or creates its own found ship arr.
                this.addCoordinateToFoundShipsArr(coordinate);
            }
        } else {
            this.allMissedShots.push(coordinate);
        }
    }

    // check if coordinate is neighbor to older hit coordinate. If false, create new foundShips item
    addCoordinateToFoundShipsArr(coordinate) {
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

    // computer attack hit ship and now it is sunk. Find that ship on the foundShips arr and change its status to
    // shipSunk:true. Computer doesn't use any of its coordinates when shooting enemy
    changeShipsStatusToSunk(sunkenShipsCoordinates) {
        for (let i = 0; i < this.foundShips.length; i++) {
            const ship = this.foundShips[i];
            for (let j = 0; j < ship.coordinates.length; j++) {
                const coordinate = ship.coordinates[j];
                for (let k = 0; k < sunkenShipsCoordinates.length; k++) {
                    const sunkCoordinate = sunkenShipsCoordinates[k];
                    if ( coordinate === sunkCoordinate ) {
                        ship.shipSunk = true;
                        console.log('ship at coordinates: ' + ship.coordinates + ' status changed to sunk');
                        break;
                    }
                }
            }
        }
    }



}

// If there is older hits, check that neighbor coordinate for new coordinate
function getCoordinateFromOlderHit(foundShips) {
    for (let i = 0; i < foundShips.length; i++) {
        const neighborCoordinates = foundShips[i].neighbors; // Example:  neighbors:[{mark: 'b1', tried: false}]}
        if ( foundShips[i].shipSunk ) { // if ship is sunk, jump over this iteration
            continue;
        }
        for (let j = 0; j < neighborCoordinates.length; j++) {
            const neighbor = neighborCoordinates[j];
            if ( !neighbor.tried ) {
                neighbor.tried = true;
                return neighbor.mark
            }
        }
    }
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
        if ( !ship.shipSunk ) {
            const shipsNeighbors = ship.neighbors; // list of possible next coordinates where ship is
            for (let j = 0; j < shipsNeighbors.length; j++) {
                let neighborCoordinate = shipsNeighbors[j];
                if ( neighborCoordinate.mark === coordinate /*&& neighborCoordinate.tried*/ ) {
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
    console.log('inside modifyShipsNeighborList')
    //shipsNeighbors.splice(currentIndex, 1); // remove this coordinate from possible neighbors
    if ( ship.sharedMark === undefined ) { // check if ships direction has been found yet
        console.log('ship does not have shared mark yet')
        ship.sharedMark = getShipsDirection(ship.coordinates);
        // delete all of the neighbors that do not share the shared mark
        removeRedundantNeighbors(shipsNeighbors, ship.sharedMark)
    }
    // add new possible neighbors to neighbors arr
    const newNeighbor = getNewNeighborsWithSharedMark(coordinate, ship.sharedMark, ship.coordinates);
    newNeighbor.forEach((mark)=>{
        console.log('added mark ' + mark + ' to ship neighbor')
        shipsNeighbors.push({mark: mark, tried: false})
    })

    shipsNeighbors.forEach((ship)=>console.log('ship neighbor coordinates are ' + ship.mark + ' tried: ' + ship.tried))
}

function removeRedundantNeighbors(shipsNeighbors, sharedMark) {
    for (let i = shipsNeighbors.length - 1; i >= 0; i--) {// all of the possible hit coordinates, near older hit
        // coordinate
        const currentNeighbor = shipsNeighbors[i].mark;
        const [horizontalMark, verticalMark] = getHorizontalAndVerticalMark(currentNeighbor);
        if ( horizontalMark !== sharedMark && verticalMark !== sharedMark ) {
            console.log('found coordinate from ships neighbor that does not share the the direction mark ' + shipsNeighbors[i].mark)
            shipsNeighbors.splice(i, 1);
        }
    }
}


function getNewNeighborsWithSharedMark(coordinate, sharedMark, shipsCoordinates) {
    const [horizontalMark, verticalMark] = getHorizontalAndVerticalMark(coordinate);
    let possibleNeighbors;

    if ( isNumeric(sharedMark) ) { // e.g sharedMark = 1/ sharedMark is verticalMark
        possibleNeighbors = getHorizontalNeighbors(horizontalMark, sharedMark);
    } else {
        possibleNeighbors = getVerticalNeighbors(sharedMark, verticalMark);
    }

    const neighbors = possibleNeighbors.filter(val=>!shipsCoordinates.includes(val)); //compare two arrays remove matches
    return neighbors.filter((item, index)=>neighbors.indexOf(item) === index); // Removes duplicates
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



export default Player;















