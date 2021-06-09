import React from 'react';
import { Sidebar } from "./Styles/game";

function GameSpecs(props) {
    const player = props.humanPlayer;
    const playerGrid = props.playerGrid;

    if ( playerGrid.name === 'Friendly' ) {
        return (
            <Sidebar>
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
            </Sidebar>
        )
    } else {
        return <></>
    }
}

export default GameSpecs;