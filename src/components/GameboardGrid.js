import React from 'react';

function GameboardGrid(props) {
    const cellIds = getGridCellIds();

    return (
        <div className="gameboard-container">
            { cellIds.map((cell)=>{
                return <GridCell id={ cell }/>
            }) }
        </div>
    )
}

function GridCell(props) {
    return <div id={ props.id } className="gameboard-cell"/>
}

function getGridCellIds() {
    const gridColumns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    let cellIds = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < gridColumns.length; j++) {
            cellIds.push(gridColumns[j] + (i + 1));
        }
    }
    return cellIds;
}


export default GameboardGrid;