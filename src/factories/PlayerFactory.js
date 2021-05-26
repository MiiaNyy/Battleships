import {
    getFirstCharacterFromHint,
    getRowCoordinate,
    getColumnCoordinate,
    isNumeric
} from "../game_helpers/playerFactoryHelpers"

class Player {
    constructor(name, turn) {
        this.name = name;
        this.turn = turn;
        this.shotsFired = 0;
        this.shotsReceived = 0;
        this.allMissedShots = [];
        this.allHitShots = [];
        this.allFiredShots = [];
        this.shotCoordinate = '';
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
            this.allHitShots.push(coordinate);
            console.log(this.name + ' player all shots fired ' + this.allFiredShots)
            console.log(this.name + ' player all shots hit ' + this.allHitShots);

        } else {
            this.allMissedShots.push(coordinate);
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
            this.shotCoordinate = coordinate;
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


export default Player;
