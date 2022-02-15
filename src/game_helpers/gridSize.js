function getRightAmountOfGridCells (level) {
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    switch (level) {
        case 'mediterranean':
            return columns.slice(0, 5)
        case 'atlantic':
            return columns.slice(0, 7)
        case 'pacific':
            return columns;
    }
}

function getGridSize (level) {
    return level === 'mediterranean' ? 5 : level === 'atlantic' ? 7 : 10;
}



export { getRightAmountOfGridCells, getGridSize };
