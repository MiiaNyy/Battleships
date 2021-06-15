import getRightAmountOfGridCells from "../../game_helpers/getRightAmountOfGridCells";

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

export { isShipInThisPosition, getGridCellIds }