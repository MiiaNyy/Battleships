class Ship {
    constructor(name, length, startPosition, axelIsVertical) {
        this.name = name;
        this.length = length;
        this.startPosition = startPosition;
        this.axelIsVertical = axelIsVertical;
        this.position = [];
        this.hitPositions = [];
        this.validPosition = true;
    }

    set setPosition(arr) {
        this.position = arr;
    }

    positionIsValid() {
        this.validPosition = true;
    }

    positionIsInvalid() {
        this.validPosition = false;
    }

    checkIfHit(coordinate) {
        for (let i = 0; i < this.position.length; i++) {
            if ( coordinate === this.position[i] ) {
                this.hitPositions.push(coordinate);
                return true
            }
        }
        return false
    }

    isSunk() {
        return this.hitPositions.length === this.length;
    }

}




export default Ship;