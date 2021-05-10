class Player {
    constructor(name, turn) {
        this.name = name;
        this.turn = turn;
        this.shotsFired = 0;
        this.shotsReceived = 0;
        this.shotsMissed = [];
        this.shotsHit = ['a8', 'd7'];
        this.allShotsFired = ['a1', 'b2', 'g5', 'j3', 'a10', 'd7'];
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
        let coordinate = '';
        let startPosition = [];
        const lastShotArr = hint.split("");
        if ( this.shotsHit.length >= 2 ) {
            let anotherHint = getAnotherHint(lastShotArr, this.shotsHit);
            if ( anotherHint ) {
                startPosition.push(anotherHint)
            } else {
                // gives random index which determines first startPosition (row/column) from hint
                const randomIndex = Math.floor(Math.random() * 2)
                startPosition.push(lastShotArr[randomIndex])
            }
        } else {
            // gives random index which determines first startPosition (row/column) from hint
            const randomIndex = Math.floor(Math.random() * 2)
            startPosition.push(lastShotArr[randomIndex])
        }

        return coordinate;
    }

}

function getAnotherHint(lastShotArr, shotsHit) {
    // Take second to last item from shotsHit and change it to array
    const nextToLastShotHit = shotsHit.slice(-2)[0];
    const nextToLastArr = [nextToLastShotHit.charAt(0), nextToLastShotHit.slice(1)]
    for (let i = 0; i < lastShotArr.length; i++) {
        if ( lastShotArr[i] === nextToLastArr[i] ) {
            return lastShotArr[i];
        }
    }
}


const computer = new Player('com', false);
computer.shootTheEnemy()

export default Player;
