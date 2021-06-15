//import {getRightAmountOfColumns} from "./gameboardFactoryHelpers";
function getRightAmountOfColumns(level) {
    const columnsPacific = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const columnsAtlantic = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    const columnsMediterranean = ['a', 'b', 'c', 'd', 'e'];

    return level === 'mediterranean' ? columnsMediterranean : level === 'atlantic' ? columnsAtlantic : columnsPacific;
}
// If there is older hits, check that neighbor coordinate for new coordinate
function getCoordinateFromOlderHit(foundShips) {
    for (let i = 0; i < foundShips.length; i++) {
        const neighborCoordinates = foundShips[i].neighbors; // Example:  neighbors:[{mark: 'b1', tried: false}]}
        if ( !foundShips[i].shipSunk ) { // if ship is not sunk
            for (let j = 0; j < neighborCoordinates.length; j++) {
                const neighbor = neighborCoordinates[j];
                if ( !neighbor.tried ) {
                    neighbor.tried = true;
                    return neighbor.mark
                }
            }
        }
    }
}

function getRandomCoordinate(gameLevel) {
    const gridColumns = getRightAmountOfColumns(gameLevel);
    const gridRows = (gridColumns.length - 1);

    const columnIndex = Math.floor(Math.random() * (gridColumns.length - 1));
    const rowIndex = (Math.floor(Math.random() * gridRows)) + 1;
    return gridColumns[columnIndex] + rowIndex;
}

function checkIfCoordinateHitShipsNeighbor(coordinate, foundShips, gameLevel) {
    for (let i = 0; i < foundShips.length; i++) {
        const ship = foundShips[i];
        if ( !ship.shipSunk ) {
            const shipsNeighbors = ship.neighbors; // list of possible next coordinates where ship is
            for (let j = 0; j < shipsNeighbors.length; j++) {
                let neighborCoordinate = shipsNeighbors[j];
                if ( neighborCoordinate.mark === coordinate ) {
                    ship.coordinates.push(coordinate); // add this coordinate to ship obj
                    modifyShipsNeighborList(ship, coordinate, j, ship.neighbors, gameLevel);
                    return true;
                }
            }
        }
    }
    return false;
}

function getCoordinatesNeighbors(coordinate) {
    const [horizontalMark, verticalMark] = getHorizontalAndVerticalMark(coordinate);
    const neighbors = []; // Example neighbors: [{mark: 'b1', tried: false}]}]

    const horizontalNeighbors = getHorizontalNeighbors(horizontalMark, verticalMark);
    const verticalNeighbors = getVerticalNeighbors(horizontalMark, verticalMark);

    horizontalNeighbors.forEach((element)=>{
        neighbors.push({mark: element, tried: false})
    })

    verticalNeighbors.forEach((element)=>{
        neighbors.push({mark: element, tried: false})
    })

    return neighbors
}

function modifyShipsNeighborList(ship, coordinate, currentIndex, shipsNeighbors, gameLevel) {
    if ( ship.sharedMark === undefined ) { // check if ships direction has been found yet
        ship.sharedMark = getShipsDirection(ship.coordinates);
        console.log('ships shared mark is ' + ship.sharedMark);
        removeRedundantNeighbors(shipsNeighbors, ship.sharedMark) // delete all the neighbors that don't have sharedMark
    }
    // add new possible neighbors to neighbors arr
    const newNeighbors = getNewNeighborsWithSharedMark(coordinate, ship.sharedMark, ship.coordinates, gameLevel);
    newNeighbors.forEach((mark)=>shipsNeighbors.push({mark: mark, tried: false}))
    shipsNeighbors.forEach((ship)=>console.log('ship neighbor coordinates are ' + ship.mark + ' tried: ' + ship.tried))
}

function removeRedundantNeighbors(shipsNeighbors, sharedMark) {
    for (let i = shipsNeighbors.length - 1; i >= 0; i--) {
        const [horizontalMark, verticalMark] = getHorizontalAndVerticalMark(shipsNeighbors[i].mark);
        if ( horizontalMark !== sharedMark && verticalMark !== sharedMark ) {
            console.log('removing redundant neighbor: ' + shipsNeighbors[i].mark)
            shipsNeighbors.splice(i, 1);
        }
    }
}

function getNewNeighborsWithSharedMark(coordinate, sharedMark, shipsCoordinates, gameLevel) {
    const [horizontalMark, verticalMark] = getHorizontalAndVerticalMark(coordinate);
    const possibleNeighbors = isNumeric(sharedMark) ? getHorizontalNeighbors(horizontalMark, sharedMark, gameLevel) : getVerticalNeighbors(sharedMark, verticalMark, gameLevel);

    // Remove coordinate if it's in shipsCoordinates and return other coordinates to neighbors
    const neighbors = possibleNeighbors.filter(coordinate=>!shipsCoordinates.includes(coordinate));
    return neighbors.filter((item, index)=>neighbors.indexOf(item) === index); // Removes any duplicates
}

function getShipsDirection(shipsCoordinates) {
    const coordinateOneHorizontal = shipsCoordinates[0][0]; // alphabet
    const coordinateOneVertical = Number(shipsCoordinates[0].substring(1)); // number
    const coordinateTwoHorizontal = shipsCoordinates[1][0];
    // if horizontal coordinates aren't the same, we can assume that vertical coordinate is same in both
    return coordinateOneHorizontal === coordinateTwoHorizontal ? coordinateOneHorizontal : coordinateOneVertical;

}

function getHorizontalNeighbors(horizontalMark, verticalMark, gameLevel) {
    const columns = getRightAmountOfColumns(gameLevel)
    const columnIndex = columns.indexOf(horizontalMark);
    // if coordinate is a/j (start/end columns), there is only one horizontal neighbor
    if ( columnIndex === 0 ) {
        return [columns[columnIndex + 1] + verticalMark]
    } else if ( columnIndex === (columns.length - 1) ) {
        return [columns[columnIndex - 1] + verticalMark]
    } else {
        return [columns[columnIndex - 1] + verticalMark, columns[columnIndex + 1] + verticalMark]
    }
}

function getVerticalNeighbors(horizontalMark, verticalMark, gameLevel) {
    const gridRows = getRightAmountOfColumns(gameLevel).length
    if ( verticalMark === 1 ) {
        return [horizontalMark + 2]
    } else if ( verticalMark === gridRows ) {
        return [horizontalMark + (gridRows - 1)]
    } else {
        return [horizontalMark + (verticalMark + 1), horizontalMark + (verticalMark - 1)]
    }
}

function getHorizontalAndVerticalMark(coordinate) {
    return [coordinate[0], Number(coordinate.substring(1))];
}

function isNumeric(num) {
    return !isNaN(num)
}

export {
    getCoordinateFromOlderHit,
    getRandomCoordinate,
    checkIfCoordinateHitShipsNeighbor,
    getCoordinatesNeighbors,
}