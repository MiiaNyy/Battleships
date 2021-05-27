import Ship from "./ShipFactory.js";
import {
    checkIfAnyShipGotHit,
    checkIfPositionIsEmpty,
    getShipsPosition
} from "../game_helpers/gameboardFactoryHelpers"

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
            shotHit: false,
            shipThatGotHit: {},
        };
    }

    get latestHitShipName() {
        return this.attackInfo.shipThatGotHit.name;
    }

    get latestAttackInfoMsg() {
        return this.attackInfo.message;
    }

    get didLatestShotHit() {
        return this.attackInfo.shotHit;
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
        let attackMessage;
        let [didShipGotHit, nameOfShipThatGotHit] = checkIfAnyShipGotHit(this.ships, coordinate);

        if ( didShipGotHit ) {
            const shipSunk = this.checkIfShipsSunk(nameOfShipThatGotHit);
            attackMessage = this.getShipGotHitMessage(shipSunk, nameOfShipThatGotHit, coordinate);
            didShipGotHit = true;
            this.hitShots.push(coordinate);
        } else {
            didShipGotHit = false;
            attackMessage = `${ this.name === 'Friendly' ? 'Enemy' : 'You' } shot at ${ coordinate }. Didn't hit any ship`;
            this.missedShots.push(coordinate);
        }
        this.setInfoAboutTheAttack(attackMessage, didShipGotHit, nameOfShipThatGotHit)
    }

    setInfoAboutTheAttack(message, shotDidHit, shipThatGotHit) {
        this.attackInfo.message = message;
        this.attackInfo.shotHit = shotDidHit;
        if ( shotDidHit ) {
            this.attackInfo.shipThatGotHit = {name: shipThatGotHit.name}
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


export default Gameboard;