import React, { useState } from 'react';
import { SideBarSpecs } from "./Styles/game";
import blurTheBackground from "./helpers/blurTheBackground";

function GameSpecs(props) {
    const player = props.humanPlayer;
    const playerGrid = props.playerGrid;
    const [specsIsOpen, setSpecsIsOpen] = useState(false);

    if ( playerGrid.name === 'Friendly' ) {
        if ( screen.width <= 1000 && !specsIsOpen ) {
            return <button className="specs-btn" onClick={ ()=>setSpecsIsOpen(()=>true) }>Specs...</button>
        } else {
            return (
                <>

                    <SideBarSpecs>
                        { screen.width <= 1000 ? <i onClick={ ()=>setSpecsIsOpen(()=>false) }
                                                    className="close-info-btn info-btn fas fa-times"/> : <></> }
                        <h3>Specs</h3>
                        <div className="wrap-secondary">
                            <p className="row">All shots fired: <strong>{ player.allFiredShots.length }</strong></p>
                            <p className="row">Shots hit: <strong>{ player.allHitShots }</strong></p>
                            <p className="row">Shots missed: <strong>{ player.allMissedShots.length }</strong></p>
                            <p className="row">Shots received: <strong>{ player.shotsReceived }</strong></p>
                            <br/>
                        </div>

                        <h4>Friendly ships</h4>
                        <div className="wrap-secondary">
                            <p className="row">Remaining: <strong>{ (playerGrid.ships.length) - (playerGrid.sunkenShips.length) }</strong>
                            </p>
                            <p className="row">Sunk: <strong> { playerGrid.sunkenShips.length } </strong></p>
                        </div>

                    </SideBarSpecs>
                </>

            )
        }

    } else {
        return <></>
    }
}

export default GameSpecs;