import React, { useState } from 'react';
import { getGridCellIds, isShipInThisPosition } from "./helpers/gameboardItemHelpers";

import { Cell, GameboardGrid } from "./Styles/game";

function GameboardItem(props) {
    const cellIds = getGridCellIds();
    const humanPlayer = props.humanPlayer;
    const computerPlayer = props.enemyPlayer;
    const playerGrid = props.playerGrid;

    return (
        <div className="flex">
            <GameSpecs playerGrid={ playerGrid } humanPlayer={ humanPlayer }/>
            <div>
                <h2>{ playerGrid.name } waters</h2>
                <GameboardGrid>
                    { cellIds.map((cell)=>{
                        return <GridCell key={ cell } setMessage={ props.setGameMessage }
                                         players={ [humanPlayer, computerPlayer] } playerGrid={ playerGrid }
                                         id={ cell }/>
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
                <p className="row">All shots fired: <strong>{ player.shotsFired }</strong></p>
                <p className="row">Shots hit: <strong>{ player.allHitShots.length }</strong></p>
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
    const [hitMarker, setHitMarker] = useState('');

    const gameboard = props.playerGrid;
    const cellId = props.id;
    const thisIsEnemyCell = gameboard.name === 'Enemy';
    // If ships is in this position, color this cell different color
    const shipPosition = isShipInThisPosition(gameboard.shipsCoordinates, cellId);

    function attackEnemy() {
        const human = props.players[0];
        const computer = props.players[1];
        // loops already fired shots to check if shot is valid (cannot shot twice in the same coordinate)
        const shotIsValid = human.shotIsValid(cellId);

        if ( thisIsEnemyCell && human.turn && shotIsValid ) {
            gameboard.receiveAttack(cellId);
            props.setMessage(()=>gameboard.attackInfo.message);
            human.setShots(gameboard.attackInfo.shotHit, cellId);
            setHitMarker(() => {
                return gameboard.attackInfo.shotHit ? '🔴' : 'X'
            })
            /*human.turnOver();
            computer.startTurn();*/
        } else {
            console.log('it is enemies turn')
        }
    }

    return (
        <Cell onClick={ ()=>attackEnemy() }
              enemy={ thisIsEnemyCell } shipPosition={ shipPosition } id={ cellId }>
            <p>{ hitMarker }</p>
        </Cell>
    )
}


export default GameboardItem;