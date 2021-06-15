function getRightAmountOfGridCells(level) {
    const columnsPacific = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const columnsAtlantic = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    const columnsMediterranean = ['a', 'b', 'c', 'd', 'e'];

    return level === 'mediterranean' ? columnsMediterranean : level === 'atlantic' ? columnsAtlantic : columnsPacific;
}

export default getRightAmountOfGridCells;