import { getRightAmountOfGridCells } from "../../game_helpers/gridSize";

function isShipInThisPosition(playerShips, cellId) {
    for (let i = 0; i < playerShips.length; i++) {
        for (let j = 0; j < playerShips[i].length; j++) {
            let currentShip = playerShips[i];
            if ( currentShip[j] === cellId ) {
                return true;
            }
        }
    }
    return false;
}

function getGridCellIds(gameLevel) {
    const gridColumns = getRightAmountOfGridCells(gameLevel);
    let cellIds = [];
    for (let i = 0; i < gridColumns.length; i++) {
        for (let j = 0; j < gridColumns.length; j++) {
            cellIds.push(gridColumns[j] + (i + 1));
        }
    }
    return cellIds;
}

function isThereSunkShipInThisPosition(gameboard, coordinate) {
    const sunkenShips = gameboard.sunkenShips;
    for (let i = 0; i < sunkenShips.length; i++) {
        for (let j = 0; j < sunkenShips[i].length; j++) {
            let ship = sunkenShips[i];
            for (let k = 0; k < ship.position.length; k++) {
                if ( ship.position[k] === coordinate ) {
                    return true
                }
            }
        }
    }
    return false
}

function isThisPositionHit(gameboard, coordinate) {
    for (let i = 0; i < gameboard.missedShots.length; i++) {
        if ( gameboard.missedShots[i] === coordinate ) {
            return [true, 'x']
        }
    }
    for (let i = 0; i < gameboard.hitShots.length; i++) {
        if ( gameboard.hitShots[i] === coordinate ) {
            return [true, '💥']
        }
    }
    return [false, ''];
}

export { isShipInThisPosition, getGridCellIds, isThereSunkShipInThisPosition, isThisPositionHit }