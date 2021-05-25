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


    shootTheEnemy() {
        const lastShotFired = this.allFiredShots.slice(-1)[0];
        const lastShotHit = this.allHitShots.slice(-1)[0];
        // timesTriedToSHootEnemy is fail safe, if getCoordinate don't give valid coordinate with a hint in 10 tries,
        // forget the hint and give random coordinate
        let coordinate = lastShotFired === lastShotHit && this.timesTriedToShootEnemy < 10 ? this.getCoordinate(lastShotFired) : this.getCoordinate();
        if ( !isNaN(coordinate) ) {
            console.log(coordinate + 'coordinate was nan')
            //coordinate = this.getCoordinate();
        }

        if ( !this.shotIsValid(coordinate) ) {
            console.log('shot at coordinate ' + coordinate + ' was not valid')
            this.timesTriedToShootEnemy++;
            this.shootTheEnemy();
        } else {
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
        const hintArr = [hint.charAt(0), hint.slice(1)];
        console.log('lastShotarr is ' + hintArr)
        // First character for coordinate from hint
        const firstCharacter = hintArr[Math.floor(Math.random() * 2)]


        console.log('first character is ' + firstCharacter)
        const randomNum = Math.floor(Math.random() * 2);
        let missingCoordinate;
        if ( isNumeric(firstCharacter) ) {
            // first character is row/horizontal coordinate and we need to get vertical (alphabet) coordinate
            missingCoordinate = getColumnCoordinate(firstCharacter, hint, randomNum);
            return missingCoordinate + firstCharacter;
        } else {
            // first character is column/vertical, we need to get horizontal/row (number) coordinate
            missingCoordinate = getRowCoordinate(firstCharacter, hint, randomNum);
            return firstCharacter + missingCoordinate;
        }

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
    let index;
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

/*function compareLastsShots(lastShotArr, shotsHit) {
    // Take second to last item from shotsHit and change it to array
    const nextToLastShotHit = shotsHit.slice(-2)[0];
    const nextToLastArr = [nextToLastShotHit.charAt(0), nextToLastShotHit.slice(1)]
    for (let i = 0; i < lastShotArr.length; i++) {
        if ( lastShotArr[i] === nextToLastArr[i] ) {
            return lastShotArr[i];
        }
    }
}*/

function isNumeric(num) {
    return !isNaN(num)
}

/*const player = new Player('player', true);
player.allFiredShots = ['c7','d8','h4','i2','g2','h1'];
player.allHitShots = ['h1'];

player.shootTheEnemy();
let coord = player.shotCoordinate;*/


export default Player;
