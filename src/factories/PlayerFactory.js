import {
    getCoordinateFromOlderHit,
    getRandomCoordinate,
    checkIfCoordinateHitShipsNeighbor,
    getCoordinatesNeighbors,
} from "./factoryHelpers/playerFactoryHelpers";

class Player {
    constructor(name) {
        this.name = name;
        this.turn = false;
        this.gameLevel = '';
        this.shotsReceived = 0;
        // array of ship objects, that is created when hit happens in the enemy board. Includes coordinates that have
        // been found and array of possible neighbors e.g: [{coordinates: ['a1'], shipSunk: false, neighbors:
        // [{mark: 'b1', tried: false}, {mark: 'a2', tried: false}]}]
        this.foundShips = [];
        this.allFiredShots = []; // coordinates of all of the fired shots to enemy gameboard
        this.latestShotCoordinate = '';
    }

    set setGameLevel(level) {
        this.gameLevel = level;
    }

    turnOver() {
        this.turn = false;
    }

    startTurn() {
        this.turn = true;
    }

    firstShotFired() { // tells if first shot is fired
        return this.allFiredShots.length > 0;
    }

    resetValues() {
        this.gameLevel = '';
        this.turn = false;
        this.shotsReceived = 0;
        this.foundShips = [];
        this.allFiredShots = [];
        this.latestShotCoordinate = '';
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

        if ( coordinate === undefined ) { // if foundShips arr is empty/there is not any found ships
            coordinate = getRandomCoordinate(this.gameLevel);
        }

        if ( this.shotIsValid(coordinate) ) {
            this.latestShotCoordinate = coordinate;
        } else {
            this.shootTheEnemy();
        }
    }

    // after shooting enemy
    setShots(attackHit, shipThatGotHit, coordinate) {
        this.allFiredShots.push(coordinate);
        if ( attackHit ) {
            // adds hit shot to already existing foundShips arr or creates its own found ship arr.
            this.addCoordinateToFoundShipsArr(coordinate);
            if ( shipThatGotHit.sunk ) {
                this.changeShipsStatusToSunk(shipThatGotHit.position);
            }
        }
    }

    // check if coordinate is neighbor to older hit coordinate. If false, create new foundShips item
    addCoordinateToFoundShipsArr(coordinate) {
        const foundShipsNeighbor = checkIfCoordinateHitShipsNeighbor(coordinate, this.foundShips, this.gameLevel);
        if ( !foundShipsNeighbor ) {
            this.foundShips.push({
                coordinates: [coordinate],
                shipSunk: false,
                sharedMark: undefined,
                neighbors: getCoordinatesNeighbors(coordinate, this.gameLevel)
            });
        }
    }

    // computer attack hit ship and now it is sunk. Find that ship on the foundShips arr and change its status to
    // shipSunk:true. Computer doesn't use any of its coordinates when shooting enemy
    changeShipsStatusToSunk(sunkenShipsCoordinates) {
        this.foundShips.forEach((ship)=>{
            ship.coordinates.forEach((coordinate)=>{
                sunkenShipsCoordinates.forEach((sunkCoordinate)=>{
                    if ( coordinate === sunkCoordinate ) {
                        ship.shipSunk = true;
                    }
                })
            })
        })
    }
}


export default Player;















