class Player {
    constructor(name, turn) {
        this.name = name;
        this.turn = turn;
        this.shotsFired = 0;
        this.shotsReceived = 0;
        this.shotsMissed = [];
        this.shotsHit = ['a8', 'b8'];
        this.allShotsFired = ['a1', 'b2', 'g5', 'j3', 'a10', 'b8'];
    }

    turnOver() {
        this.turn = false;
    }

    startTurn() {
        this.turn = true;
    }

    shootTheEnemy() {
        const lastShotFired = this.allShotsFired.slice(-1)[0];
        const lastShotHit = this.shotsHit.slice(-1)[0];
        const coordinate = lastShotFired === lastShotHit ? this.getCoordinate(lastShotFired) : this.getCoordinate();
        for (let i = 0; i < this.allShotsFired.length; i++) {
            if ( this.allShotsFired[i] === coordinate ) {
                this.shootTheEnemy()
            }
        }
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
        // First letter/num for coordinate from hint
        const firstCharacter = getFirstCharacterFromHint(lastShotArr, this.shotsHit);
        const coordinate = getRestOfTheCoordinate(firstCharacter, lastShotArr);
        return coordinate;
        //coordinate.push(firstCharacter)


    }

}

function getRestOfTheCoordinate(character, hint) {


    if ( isNumeric(character) ) {
        // We need to get horizontal coordinate
        const gridColumns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        const columnIndex = gridColumns.indexOf(hint[0]);
        const randomNum = Math.floor(Math.random() * 2);
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
        return gridColumns[index] + character;
    }
    // we need to get vertical coordinate
    return 'string'
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

const computer = new Player('com', false);
computer.shootTheEnemy()

export default Player;
