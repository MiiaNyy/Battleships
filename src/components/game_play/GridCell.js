import { isShipInThisPosition, isThereSunkShipInThisPosition, isThisPositionHit } from "../component_helpers/gameboardItemHelpers";
import attackIsValid from "../../game_helpers/attackIsValid";
import addNewMessageToConsole from "../../game_helpers/addNewMessageToConsole";
import { CellStyled } from "../styled_components/general";
import React from "react";

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
            setGameDescription((prev) => addNewMessageToConsole(prev, 'Invalid shot, try again!'));
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

export default GridCell;
