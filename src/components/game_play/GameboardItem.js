import React from 'react';

import {
    getGridCellIds,
} from "../component_helpers/gameboardItemHelpers";

import { Grid } from "../styled_components/general";
import { getGridSize } from "../../game_helpers/gridSize";

import GridCell from "./GridCell";

function GameboardItem (props) {
    const cellIds = getGridCellIds(props.gameLevel);
    const gridSize = getGridSize(props.gameLevel);
    
    const humanPlayer = props.players[0];
    const computerPlayer = props.players[1];
    const playerGrid = props.playerGrid;
    
    const coordinateLabelRowY = [...Array(gridSize)].map((u, i) => i);
    const coordinateLabelRowX = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    
    return (
        <div>
            <div>
                <h2 className="gameboard__title">{ playerGrid.name } waters</h2>
                <Grid size={ gridSize }>
                    <div className="coordinate-label-empty"/>
                    
                    { coordinateLabelRowY.map((cell, index) => {
                        return <div className="coordinate-label">{ coordinateLabelRowX[index] }</div>
                    }) }
                    
                    { cellIds.map((cell, index) => {
                        if ( (index) % gridSize === 0 ) {
                            return (
                                <>
                                    <div className="coordinate-label">
                                        <p>{ cell.substring(1) }</p>
                                    </div>
                                    <GridCell key={ cell } id={ cell } cellId={ cellIds }
                                              gameHandlers={ props.gameHandlers }
                                              players={ [humanPlayer, computerPlayer] } playerGrid={ playerGrid }
                                              gameOver={ props.gameOver } infoOpen={ props.infoOpen }/>
                                </>)
                            
                        } else {
                            return <GridCell key={ cell } id={ cell } cellId={ cellIds }
                                             gameHandlers={ props.gameHandlers }
                                             players={ [humanPlayer, computerPlayer] } playerGrid={ playerGrid }
                                             gameOver={ props.gameOver } infoOpen={ props.infoOpen }/>
                        }
                        
                    }) }
                </Grid>
            </div>
        </div>
    )
}

export default GameboardItem;
