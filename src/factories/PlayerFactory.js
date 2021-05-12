import Gameboard from "./GameboardFactory";

class Player {
    constructor(name, turn) {
        this.name = name;
        this.turn = turn;
        this.shotsFired = 0;
        this.shotsReceived = 0;
        this.allMissedShots = [];
        this.allHitShots = [];
        this.allFiredShots = [];
        this.timesTriedToShootEnemy = 0;
        this.gameboard = {};
    }

    set createGameboard(name) {
        this.gameboard = new Gameboard(name);
    }

    turnOver() {
        this.turn = false;
    }

    startTurn() {
        this.turn = true;
    }

    set shotFired(coordinate) {
        this.allFiredShots.push(coordinate);
    }

    set shotHit(coordinate) {
        this.allHitShots.push(coordinate);
    }

    set shotMissed(coordinate) {
        this.allMissedShots.push(coordinate);
    }

    shootTheEnemy() {
        const lastShotFired = this.allFiredShots.slice(-1)[0];
        const lastShotHit = this.allHitShots.slice(-1)[0];
        // timesTriedToSHootEnemy is fail safe, if getCoordinate don't give valid coordinate with a hint in 10 tries,
        // forget the hint and give random coordinate
        let coordinate = lastShotFired === lastShotHit && this.timesTriedToShootEnemy < 10 ? this.getCoordinate(lastShotFired) : this.getCoordinate();
        for (let i = 0; i < this.allFiredShots.length; i++) {
            if ( this.allFiredShots[i] === coordinate ) {
                this.timesTriedToShootEnemy++;
                this.shootTheEnemy()
            }
        }
        this.timesTriedToShootEnemy = 0;
        this.shotsFired++;
        return coordinate;
    }

    getCoordinate(hint) {
        const gridColumns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        if ( hint ) {
            return this.getCoordinateWithAHint(hint)
        } else {
            const columnIndex = Math.floor(Math.random() * 9);
            const rowIndex = (Math.floor(Math.random() * 9)) + 1;
            return gridColumns[columnIndex] + rowIndex;
        }
    }

    getCoordinateWithAHint(hint) {
        const lastShotArr = [hint.charAt(0), hint.slice(1)];
        // First character for coordinate from hint
        const firstCharacter = getFirstCharacterFromHint(lastShotArr, this.allHitShots);
        const randomNum = Math.floor(Math.random() * 2);
        let missingCoordinate;
        if ( isNumeric(firstCharacter) ) {
            // first character is row/horizontal coordinate and we need to get vertical (alphabet) coordinate
            missingCoordinate = getColumnCoordinate(firstCharacter, hint, randomNum);
            return missingCoordinate + firstCharacter;
        }
        // first character is column/vertical, we need to get horizontal/row (number) coordinate
        missingCoordinate = getRowCoordinate(firstCharacter, hint, randomNum);
        return firstCharacter + missingCoordinate;
    }
}


function getRowCoordinate(character, hint, randomNum) {
    let rowNumber = Number(hint.slice(1));
    if ( randomNum !== 0 ) {
        rowNumber--;
        if ( rowNumber <= 0 ) {
            rowNumber = 2;
        }
    } else {
        rowNumber++;
        if ( rowNumber > 10 ) {
            rowNumber = 9;
        }
    }
    return rowNumber;
}

function getColumnCoordinate(character, hint, randomNum) {
    const gridColumns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const columnIndex = gridColumns.indexOf(hint[0]);
    let index = 0;
    if ( randomNum !== 0 ) {
        index = columnIndex + 1;
        if ( index > gridColumns.length ) {
            index = columnIndex - 1;
        }
    } else {
        index = columnIndex - 1;
        if ( index < 0 ) {
            index = columnIndex + 1
        }
    }
    return gridColumns[index];
}

function getFirstCharacterFromHint(lastShotArr, shotsHit) {
    // if there is more than/equal 2 items in shotsHit, compare last and second to last to get first
    // character/clue where next shot/ship should be
    if ( shotsHit.length >= 2 ) {
        let firstCharacter = compareLastsShots(lastShotArr, shotsHit);
        if ( firstCharacter ) {
            return firstCharacter
        }
        // If there is less than 2 items or there was not anything similar when comparing last shots, give first or
        // second item from lastShotArr
        const randomIndex = Math.floor(Math.random() * 2)
        return lastShotArr[randomIndex];
    }
}

function compareLastsShots(lastShotArr, shotsHit) {
    // Take second to last item from shotsHit and change it to array
    const nextToLastShotHit = shotsHit.slice(-2)[0];
    const nextToLastArr = [nextToLastShotHit.charAt(0), nextToLastShotHit.slice(1)]
    for (let i = 0; i < lastShotArr.length; i++) {
        if ( lastShotArr[i] === nextToLastArr[i] ) {
            return lastShotArr[i];
        }
    }
}

function isNumeric(num) {
    return !isNaN(num)
}


export default Player;
