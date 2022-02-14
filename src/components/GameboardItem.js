import React from 'react';

import attackIsValid from "../game_helpers/attackIsValid";

import {
    getGridCellIds,
    isShipInThisPosition,
    isThereSunkShipInThisPosition,
    isThisPositionHit
} from "./helpers/gameboardItemHelpers";

import addNewMessageToDescription from "../game_helpers/addNewMessageToDescription";

import { CellStyled, Grid } from "./Styles/general";
import { getGridSize } from "../game_helpers/gridSize";

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

function GridCell (props) {
    const gameboard = props.playerGrid;
    const cellId = props.id;
    const infoOpen = props.infoOpen;
    
    const human = props.players[0];
    const computer = props.players[1];
    
    // If ships is in this position, color this cell different color
    const shipPosition = isShipInThisPosition(gameboard.shipsCoordinates, cellId);
    const [hitPosition, hitMarker] = isThisPositionHit(gameboard, cellId);
    const sunkShipPosition = isThereSunkShipInThisPosition(gameboard, cellId);
    
    const thisIsEnemyCell = gameboard.name === 'Enemy';
    
    // Human player uses this function to attack enemy
    function attackEnemy () {
        const [gameIsOver, setGameOver] = props.gameOver;
        const [switchTurns, setGameDescription] = props.gameHandlers;
        
        // loops already fired shots to check if shot is valid (cannot shot twice in the same coordinate)
        const shotIsValid = human.shotIsValid(cellId);
        
        if ( thisIsEnemyCell && human.turn && shotIsValid ) {
            attackIsValid(gameboard, human, cellId, setGameDescription, setGameOver);
            if ( !gameIsOver ) {
                human.turnOver();
                computer.startTurn()
                setTimeout(() => {
                    switchTurns(true);
                }, 2000);
            }
        } else if ( thisIsEnemyCell && !shotIsValid ) {
            setGameDescription((prev) => addNewMessageToDescription(prev, 'Invalid shot, try again!'));
        }
    }
    
    return (
        <>
            <CellStyled onClick={ () => !infoOpen ? attackEnemy() : console.log('game paused') }
                        gameLevel={ human.gameLevel } enemy={ thisIsEnemyCell } hitPosition={ hitPosition }
                        hitMarker={ hitMarker } shipPosition={ shipPosition } shipSunk={ sunkShipPosition }
                        id={ cellId } infoOpen={ infoOpen }>
                <p>{ hitMarker }</p>
            </CellStyled>
        </>
    
    )
}


export default GameboardItem;
