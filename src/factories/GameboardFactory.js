import Ship from "./ShipFactory.js";


class Gameboard {
    constructor(name) {
        this.name = name;
        this.shipsCoordinates = [];
        this.ships = [];
        this.missedShots = [];
        this.hitShots = [];
        this.sunkenShips = [];
        this.allShipHaveSunk = false;
        this.attackInfo = {
            message: '',
            shotHit: false
        };
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
        let shipGotHit = false;
        let shipThatGotHit;
        for (let i = 0; i < this.ships.length; i++) {
            const currentShip = this.ships[i];
            shipGotHit = currentShip.checkIfHit(coordinate);
            if ( shipGotHit ) {
                shipThatGotHit = currentShip;
                break; // Jump out of loop
            }
        }
        if ( shipGotHit ) {
            this.attackInfo.shotHit = true;
            const shipSunk = this.checkIfShipsSunk(shipThatGotHit);
            this.attackInfo.message = this.getShipGotHitMessage(shipSunk, shipThatGotHit, coordinate);
            this.hitShots.push(coordinate);
        } else {
            this.attackInfo.shotHit = false;
            this.attackInfo.message = `${ this.name === 'Friendly' ? 'Enemy' : 'You'} shot at ${ coordinate }. Didn't hit any ship`;
            this.missedShots.push(coordinate);
        }
    }

    checkIfShipsSunk(currentShip) {
        if ( currentShip.isSunk() ) {
            this.sunkenShips.push(currentShip);
            if ( this.sunkenShips.length === this.ships.length ) {
                this.allShipHaveSunk = true;
            }
            return true;
        }
        return false;
    }

    getShipGotHitMessage(shipSunk, shipThatGotHit, coordinate) {
        const playerName = this.name === 'Friendly' ? 'Enemy' : 'You';
        const gotHitMessage = `${ playerName } shot at ${ coordinate }.`;
        if ( shipSunk ) {
            if ( this.allShipHaveSunk ) {
                return `${ gotHitMessage } Ship ${ shipThatGotHit.name } got hit, sunk and now all the ships are sunk`;
            } else {
                return `${ gotHitMessage } Ship ${ shipThatGotHit.name } got hit and sunk`;
            }
        } else {
            return `${ gotHitMessage } Ship ${ shipThatGotHit.name } got hit`;
        }
    }
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