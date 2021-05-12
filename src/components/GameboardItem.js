import React, { useState } from 'react';
import { GameboardCell, GameboardGrid } from "./Styles/game";

function GameboardItem(props) {
    const cellIds = getGridCellIds();
    const player = props.player;
    const playerGrid = player.gameboard;

    return (
        <div className="flex">
            <GameSpecs player={ props.player }/>
            <div>
                <h2>{ playerGrid.name } waters</h2>
                <GameboardGrid>
                    { cellIds.map((cell)=>{
                        return <GridCell key={ cell } playerGrid={ playerGrid } id={ cell }/>
                    }) }
                </GameboardGrid>
            </div>
        </div>

    )
}

function GameSpecs(props) {
    const player = props.player;
    const playerGrid = player.gameboard;

    if ( playerGrid.name === 'Friendly' ) {
        return (
            <div className="game-specs__container">
                <h3>Specs</h3>
                <p className="row">Shots fired: <strong>{ player.shotsFired }</strong></p>
                <p className="row">Shots hit: <strong>{ player.allHitShots.length }</strong></p>
                <p className="row">Shots missed: <strong>{ player.allMissedShots.length }</strong></p>
                <p className="row">Shots received: <strong>{ player.shotsReceived }</strong></p>
                <br/>
                <p className="row">Ships
                    remaining: <strong>{ (playerGrid.ships.length) - (playerGrid.sunkenShips.length) }</strong></p>
                <p className="row">Sunken ships: <strong> { playerGrid.sunkenShips.length } </strong></p>
            </div>
        )
    } else {
        return <></>
    }
}

function GridCell(props) {
    const playerGrid = props.playerGrid;
    const playerShips = playerGrid.shipsCoordinates;
    const enemyCell = playerGrid.name === 'Enemy';
    const shipPosition = isShipInThisPosition(playerShips, props.id);

    return <GameboardCell enemy={ enemyCell } shipPosition={ shipPosition } id={ props.id }/>
}

function isShipInThisPosition(playerShips, cellId) {
    for (let i = 0; i < playerShips.length; i++) {
        for (let j = 0; j < playerShips[i].length; j++) {
            let currentShip = playerShips[i];
            if ( currentShip[j] === cellId ) {
                return true;
            }
        }
    }
    return false;
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


export default GameboardItem;