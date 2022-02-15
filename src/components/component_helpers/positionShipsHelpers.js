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

// Empty grid cells
function createShipCells(ship) {
    let cells = [];
    for (let i = 0; i < ship.length; i++) {
        cells.push(i);
    }
    return cells;
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

function placeShipsOnRandomCoordinates (setShipsOnBoard, arrShipsCoordinates, humanGameboard, gameLevel) {
    humanGameboard.emptyGameBoard();
    humanGameboard.placeAllShipsOnBoard();
    setShipsOnBoard(() => getShipTypesArrayForEmptySidebar(gameLevel));
    arrShipsCoordinates(() => {
        return humanGameboard.shipsCoordinates
    })
    console.log('human board ships coordinates: ', humanGameboard.shipsCoordinates);
}

// When player wants random positions to ships, show ship in sidebar only ships names and count 0 so player cannot
// position ships anymore
function getShipTypesArrayForEmptySidebar(gameLevel) {
    const shipTypes = gameLevel === 'mediterranean' ? mediterranean : gameLevel === 'atlantic' ? atlantic : pacific;
    return shipTypes.map((ship)=>Object.assign({}, {name: ship.name, count: 0}, {id: uuidv4()}));
    
}

function invalidShipPositionMessage () {
    const popUpMsg = document.querySelector('.pop-up-message');
    popUpMsg.classList.remove("hidden");
    popUpMsg.classList.add("invalid_position_animation");
    
    setTimeout(() => {
        document.querySelector('header').style.filter = "none";
        popUpMsg.classList.remove("invalid_position_animation");
        popUpMsg.classList.add("hidden");
    }, 2500)
    // remove drag hover classname from the document
    document.querySelectorAll(".drag-hover").forEach(el => el.classList.remove('drag-hover'));
}

export {
    changeShipsCount,
    getNewShipTypesArr,
    createShipCells,
    checkIfThisIsShipPosition,
    allTheShipsHasPositioned,
    placeShipsOnRandomCoordinates,
    invalidShipPositionMessage
}
