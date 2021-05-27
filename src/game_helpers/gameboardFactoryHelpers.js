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

export {
    checkIfAnyShipGotHit,
    checkIfPositionIsEmpty,
    getShipsPosition
}