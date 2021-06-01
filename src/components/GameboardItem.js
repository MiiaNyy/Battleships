import React from 'react';
import attackIsValid from "./helpers/attackIsValid";
import { getGridCellIds, isShipInThisPosition } from "./helpers/gameboardItemHelpers";

import { Cell, GameboardGrid } from "./Styles/game";

function GameboardItem(props) {
    const cellIds = getGridCellIds();
    const humanPlayer = props.players[0];
    const computerPlayer = props.players[1];
    const playerGrid = props.playerGrid;

    return (
        <div className="flex">
            <GameSpecs playerGrid={ playerGrid } humanPlayer={ humanPlayer }/>
            <div>
                <h2>{ playerGrid.name } waters</h2>
                <GameboardGrid>
                    { cellIds.map((cell)=>{
                        return <GridCell key={ cell } id={ cell } gameHandlers={ props.gameHandlers }
                                         players={ [humanPlayer, computerPlayer] } playerGrid={ playerGrid }
                                         gameOver={ props.gameOver }/>
                        /*return <GridCell key={ cell } setMessage={ props.setGameMessage }
                                         players={ [humanPlayer, computerPlayer] } playerGrid={ playerGrid }
                                         id={ cell } switchTurns={ props.switchTurn }
                                         gameOver={ props.gameOver }/>*/
                    }) }
                </GameboardGrid>
            </div>
        </div>
    )
}

function GameSpecs(props) {
    const player = props.humanPlayer;
    const playerGrid = props.playerGrid;

    if ( playerGrid.name === 'Friendly' ) {
        return (
            <div className="game-specs__container">
                <h3>Specs</h3>
                <p className="row">All shots fired: <strong>{ player.allFiredShots.length }</strong></p>
                <p className="row">Shots hit: <strong>{ player.allHitShots }</strong></p>
                <p className="row">Shots missed: <strong>{ player.allMissedShots.length }</strong></p>
                <p className="row">Shots received: <strong>{ player.shotsReceived }</strong></p>
                <br/>
                <h4>Friendly ships</h4>
                <p className="row">Remaining: <strong>{ (playerGrid.ships.length) - (playerGrid.sunkenShips.length) }</strong>
                </p>
                <p className="row">Sunk: <strong> { playerGrid.sunkenShips.length } </strong></p>
            </div>
        )
    } else {
        return <></>
    }
}

function GridCell(props) {
    const gameboard = props.playerGrid;
    const cellId = props.id;

    const setGameOver = props.gameOver[1];
    const gameIsOver = props.gameOver[0];
    const setGameDescription = props.gameHandlers[1];
    const switchTurns = props.gameHandlers[0];


    const thisIsEnemyCell = gameboard.name === 'Enemy';
    // If ships is in this position, color this cell different color
    const shipPosition = isShipInThisPosition(gameboard.shipsCoordinates, cellId);
    const [hitPosition, hitMarker] = isThisPositionHit(gameboard, cellId);
    const sunkShipPosition = isThereSunkShipInThisPosition(gameboard, cellId);


    function attackEnemy() {
        const human = props.players[0];
        const computer = props.players[1];
        // loops already fired shots to check if shot is valid (cannot shot twice in the same coordinate)
        const shotIsValid = human.shotIsValid(cellId);

        if ( thisIsEnemyCell && human.turn && shotIsValid ) {
            attackIsValid(gameboard, human, cellId, setGameDescription, setGameOver);
            if ( !gameIsOver ) {
                human.turnOver();
                computer.startTurn()
                switchTurns(true);
            }
        } else {
            setGameDescription(()=>'Invalid shot, try again!');
        }
    }

    return (
        <Cell onClick={ ()=>attackEnemy() }
              enemy={ thisIsEnemyCell } hitPosition={ hitPosition } shipPosition={ shipPosition }
              shipSunk={ sunkShipPosition } id={ cellId }>
            <p>{ hitMarker }</p>
        </Cell>
    )
}

function isThereSunkShipInThisPosition(gameboard, coordinate) {
    const sunkenShips = gameboard.sunkenShips;
    for (let i = 0; i < sunkenShips.length; i++) {
        for (let j = 0; j < sunkenShips[i].length; j++) {
            let ship = sunkenShips[i];
            for (let k = 0; k < ship.position.length; k++) {
                if ( ship.position[k] === coordinate ) {
                    return true
                }
            }
        }
    }
    return false
}

function isThisPositionHit(gameboard, coordinate) {
    for (let i = 0; i < gameboard.missedShots.length; i++) {
        if ( gameboard.missedShots[i] === coordinate ) {
            return [true, 'X']
        }
    }
    for (let i = 0; i < gameboard.hitShots.length; i++) {
        if ( gameboard.hitShots[i] === coordinate ) {
            return [true, '🔴']
        }
    }
    return [false, ''];
}


export default GameboardItem;
