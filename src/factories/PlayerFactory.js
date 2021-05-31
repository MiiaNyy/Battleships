import {
    getCoordinateFromOlderHit,
    getRandomCoordinate,
    checkIfCoordinateHitShipsNeighbor,
    getCoordinatesNeighbors,
} from "../game_helpers/playerFactoryHelpers";

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
            // adds hit shot to already existing foundShips arr or creates its own found ship arr.
            this.addCoordinateToFoundShipsArr(coordinate);
            if ( shipThatGotHit.sunk ) {
                console.log('ship sunk and now changing sunk status. ship.position is ' + shipThatGotHit.position);
                this.changeShipsStatusToSunk(shipThatGotHit.position);
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
        this.foundShips.forEach((ship)=>{
            ship.coordinates.forEach((coordinate)=>{
                sunkenShipsCoordinates.forEach((sunkCoordinate)=>{
                    if ( coordinate === sunkCoordinate ) {
                        ship.shipSunk = true;
                        console.log('ship at coordinates: ' + ship.coordinates + ' status changed to sunk');
                    }
                })
            })
        })
    }
}


export default Player;















