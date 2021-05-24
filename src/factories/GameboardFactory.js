import Ship from "./ShipFactory.js";

class Gameboard {
    constructor(name) {
        this.name = name;
        this.shipsCoordinates = [];
        this.ships = [];
        this.missedShots = [];
        this.sunkenShips = [];
        this.allShipHaveSunk = false;
        this.attackInfo = { message: '', shotHit: false};
    }

    placeShip(obj, coordinate, axelIsVertical) {
        let newShip = new Ship(obj.name, obj.length, coordinate, axelIsVertical);
        let coordinates = getShipsPosition(newShip);
        if ( newShip.validPosition ) {
            // Checks if in that position is another ship
            const positionIsEmpty = checkIfPositionIsEmpty(this.ships, coordinates)
            if ( positionIsEmpty ) {
                newShip.setPosition = coordinates;
                this.shipsCoordinates.push(coordinates);
                this.ships.push(newShip);
                return 'placing ship was successful'
            }
        }
        return 'invalid position, try again'
    }

    receiveAttack(coordinate) {
        const gotHitMessage = `Shot at ${ coordinate }.`
        // Default values
        let message = `${ gotHitMessage } Didn't hit any ship`;
        this.attackInfo.shotHit = false;

        for (let i = 0; i < this.ships.length; i++) {
            const currentShip = this.ships[i];
            const shipGotHit = currentShip.checkIfHit(coordinate);
            if ( shipGotHit ) {
                this.attackInfo.shotHit = true;
                message = checkIfShipsSunk(currentShip, gotHitMessage)
                break;
            }
        }
        this.missedShots.push(coordinate);
        this.attackInfo.message = message;
    }
}

// Message return always the last statement. Needs to be fixed!
function checkIfShipsSunk(currentShip, gotHitMessage) {
    if ( currentShip.isSunk() ) {
        this.sunkenShips.push(currentShip);
        if ( this.sunkenShips.length === this.ships.length ) {
            this.allShipHaveSunk = true;
            return `${ gotHitMessage } Ship ${ currentShip.name } got hit, sunk and now all the ships are sunk`;

        }
        return`${ gotHitMessage } Ship ${ currentShip.name } got hit and sunk`;
    }
    return `${ gotHitMessage } Ship ${ currentShip.name } got hit`;
}

function checkIfPositionIsEmpty(ships, coordinates) {
    if ( ships.length > 0 ) {
        for (let i = 0; i < ships.length; i++) {
            let shipPosition = ships[i].position;
            for (let j = 0; j < shipPosition.length; j++) {
                for (let k = 0; k < coordinates.length; k++) {
                    if ( coordinates[k] === shipPosition[j] ) {
                        return false
                    }
                }
            }
        }
    }
    return true
}

function getShipsPosition(ship) {
    const xPosition = ship.startPosition.slice(0, 1);
    const yPosition = Number(ship.startPosition.slice(1));

    let shipPosition = [];
    for (let i = 0; i < ship.length; i++) {
        let coordinate;
        coordinate = ship.axelIsVertical ? getVerticalPosition(ship, xPosition, (yPosition + i)) : getHorizontalPosition(ship, xPosition, yPosition, i);
        shipPosition.push(coordinate)
    }
    return shipPosition;
}

function getVerticalPosition(ship, xPosition, yPosition) {
    if ( yPosition > 10 ) {
        ship.positionIsValid = false;
    } else {
        return xPosition + yPosition;
    }
}

function getHorizontalPosition(ship, xPosition, yPosition, index) {
    const gridColumns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const startColumnIndex = gridColumns.indexOf(xPosition);
    let nextColumnIndex = startColumnIndex + index;
    if ( nextColumnIndex > gridColumns.length ) {
        ship.positionIsValid = false;
    } else {
        return gridColumns[nextColumnIndex] + yPosition;
    }
}


export default Gameboard;