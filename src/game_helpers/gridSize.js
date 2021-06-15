function getRightAmountOfGridCells(level) {
    const columnsPacific = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const columnsAtlantic = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    const columnsMediterranean = ['a', 'b', 'c', 'd', 'e'];

    return level === 'mediterranean' ? columnsMediterranean : level === 'atlantic' ? columnsAtlantic : columnsPacific;
}

function getGridSize(level) {
    return level === 'mediterranean' ? 5 : level === 'atlantic' ? 7 : 10;
}

export { getRightAmountOfGridCells, getGridSize };