import { atlantic, mediterranean, pacific } from "../game_helpers/shipTypes";
import { getRightAmountOfGridCells } from "../game_helpers/gridSize";


function checkIfAnyShipGotHit(allShips, coordinate) {
    // if ship got hit, return true and that ship
    for (let i = 0; i < allShips.length; i++) {
        const currentShip = allShips[i];
        const didShipGotHit = currentShip.checkIfHit(coordinate);
        if ( didShipGotHit ) {
            return [true, currentShip];
        }
    }
    return [false, '']
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

function getShipsPosition(ship, gameLevel) {
    const xPosition = ship.startPosition.slice(0, 1); // e.g 'a'
    const yPosition = Number(ship.startPosition.slice(1)); // e.g '1'

    let shipPosition = [];
    for (let i = 0; i < ship.length; i++) {
        const coordinate = ship.axelIsVertical ? getVerticalPosition(gameLevel, ship, xPosition, (yPosition + i)) : getHorizontalPosition(gameLevel, ship, xPosition, yPosition, i);
        if ( coordinate ) {
            ship.positionIsValid();
            shipPosition.push(coordinate);
        } else {
            ship.positionIsInvalid();
            break;
        }

    }
    return shipPosition;
}

function getVerticalPosition(gameLevel, ship, xPosition, yPosition) {
    const rowAmount = getRightAmountOfGridCells(gameLevel).length;
    if ( yPosition > rowAmount ) { // depending on which level, row amount is different
        ship.positionIsInvalid()
    } else {
        return xPosition + yPosition;
    }
}

function getHorizontalPosition(gameLevel, ship, xPosition, yPosition, index) {
    const gridColumns = getRightAmountOfGridCells(gameLevel)
    const startColumnIndex = gridColumns.indexOf(xPosition);
    let nextColumnIndex = startColumnIndex + index;
    if ( nextColumnIndex > gridColumns.length ) {
        ship.positionIsInvalid()
    } else {
        return gridColumns[nextColumnIndex] + yPosition;
    }
}


/*
const x = new Ship('test', 3, 'j10', false);

getShipsPosition(x);*/
export {
    checkIfAnyShipGotHit,
    checkIfPositionIsEmpty,
    getShipsPosition
}