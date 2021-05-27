/*import {
    getFirstCharacterFromHint,
    getRowCoordinate,
    getColumnCoordinate,
    isNumeric
} from "../game_helpers/playerFactoryHelpers"
import shipTypes from "../game_helpers/shipTypes";*/


class Player {
    constructor(name, turn) {
        this.name = name;
        this.turn = turn;
        this.shotsFired = 0;
        this.shotsReceived = 0;
        this.allMissedShots = [];
        // list of obj, that has hit coordinate, and that coordinate all its neighbor coordinates.
        // Example: [{coordinate: 'a1', neighborCoordinateFound: false, neighbors: [{mark: 'b1', tried: false}]}]
        this.allHitShots = [];
        this.enemysSunkenShips = [] // coordinates of enemy's sunken ships
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

    setShots(attackHit, shipThatGotHit, coordinate) {
        this.shotsFired++;
        this.allFiredShots.push(coordinate);
        if ( attackHit ) {
            //this.allHitShots.push(coordinate);
            this.addCoordinateToHitList(coordinate);
            console.log(this.name + ' player all shots fired ' + this.allFiredShots)

        } else {
            this.allMissedShots.push(coordinate);
        }
    }

    addCoordinateToHitList(coordinate) {
        // If hit list is empty
        if ( this.allHitShots.length === 0 ) {
            this.allHitShots.push({
                coordinate,
                neighborCoordinateFound: false,
                neighbors: getCoordinatesNeighbors(coordinate)
            });
        } else {

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
        const lastShotFired = this.allFiredShots.slice(-1)[0];
        const lastShotHit = this.allHitShots.slice(-1)[0];
        // timesTriedToSHootEnemy is fail safe, if getCoordinate don't give valid coordinate with a hint in 10 tries,
        // forget the hint and give random coordinate
        let coordinate = lastShotFired === lastShotHit && this.timesTriedToShootEnemy < 10 ? this.getCoordinate(lastShotFired) : this.getCoordinate();

        if ( !isNaN(coordinate) ) {
            console.error(coordinate + 'coordinate was nan')
            //coordinate = this.getCoordinate();
        }
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

    getCoordinate(hint) {
        const gridColumns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        if ( hint ) {
            console.log('inside get coordinate with hint');
            return this.getCoordinateWithAHint(hint);
        } else {
            const columnIndex = Math.floor(Math.random() * 9);
            const rowIndex = (Math.floor(Math.random() * 9)) + 1;
            return gridColumns[columnIndex] + rowIndex;
        }
    }

    getCoordinateWithAHint(hint) {
        let firstCharacter = getFirstCharacterFromHint(hint, this.allHitShots);
        if ( isNumeric(firstCharacter) ) {
            // first character is row/horizontal coordinate and we need to get vertical (alphabet) coordinate
            return getColumnCoordinate(hint) + firstCharacter;
        } else {
            // first character is column/vertical, we need to get horizontal/row (number) coordinate
            return firstCharacter + getRowCoordinate(hint);
        }
    }
}

function getCoordinatesNeighbors(coordinate) {
    // neighbors: [{mark: 'b1', tried: false}]}]
    const neighbors = [];
    const horizontalMark = coordinate[0];
    const verticalMark = Number(coordinate.substring(1)); // Take string without the first letter (could be 1-10)

    const horizontalNeighbors = getHorizontalNeighbors(horizontalMark, verticalMark);
    const verticalNeighbors = getVerticalNeighbors(horizontalMark, verticalMark);

    horizontalNeighbors.forEach((element) => {
        neighbors.push({mark: element, tried: false})
    })

    verticalNeighbors.forEach((element) => {
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

let x = new Player('x', true);

x.addCoordinateToHitList('g8');

export default Player;















