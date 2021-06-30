import { pacific, atlantic, mediterranean } from "../../game_helpers/shipTypes";
import { v4 as uuidv4 } from "uuid";

// When ship is dragged to grid area, decrease ships count
function changeShipsCount(allShips, id) {
    const shipsIndex = allShips.findIndex((ship)=>ship.id === id);
    const targetShip = allShips.filter((currentShip)=>currentShip.id === id);
    const newArr = allShips.filter((currentShip)=>currentShip.id !== id);

    const newShip = {
        name: targetShip[0].name,
        count: (targetShip[0].count - 1),
        length: targetShip[0].length,
        id: targetShip[0].id
    }
    newArr.splice(shipsIndex, 0, newShip);
    return newArr;
}

// make new array from shipTypes and add every ship obj an id
function getNewShipTypesArr(gameLevel) {
    const shipTypes = gameLevel === 'mediterranean' ? mediterranean : gameLevel === 'atlantic' ? atlantic : pacific;
    return shipTypes.map((ship)=>Object.assign({}, ship, {id: uuidv4()}));
}

function createShipCells(ship) {
    let cells = [];
    for (let i = 0; i < ship.length; i++) {
        cells.push(i);
    }
    return cells;
}

// allow drop if this is not ship position
function checkIfDropIsAllowed(e, shipPosition) {
    if ( !shipPosition ) {
        e.preventDefault();
    }
}

function getClonesXPosition(length) {
    switch (length) {
        case 1:
            return 15;
        case 2:
            return 35;
        case 3:
            return 50;
        case 4:
            return 65;
        case 5:
            return 85;
    }
}

function checkIfThisIsShipPosition(cell, shipsCoordinates) {
    for (let i = 0; i < shipsCoordinates.length; i++) {
        for (let j = 0; j < shipsCoordinates[i].length; j++) {
            if ( shipsCoordinates[i][j] === cell ) {
                return true
            }
        }
    }
    return false;
}

function allTheShipsHasPositioned(gameLevel, humanBoard) {
    const shipsCount = gameLevel === 'mediterranean' ? 4 : gameLevel === 'atlantic' ? 5 : 9;
    return humanBoard.ships.length >= shipsCount
}

export {
    changeShipsCount,
    getNewShipTypesArr,
    createShipCells,
    checkIfDropIsAllowed,
    getClonesXPosition,
    checkIfThisIsShipPosition,
    allTheShipsHasPositioned,
}