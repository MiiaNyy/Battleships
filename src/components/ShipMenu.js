import React from 'react';
import shipTypes from "../game_helpers/shipTypes";
import { Ship } from "./Styles/shipsStyles";

function ShipMenu(props) {
    return (
        <>
            <h3>Select locations to your ships</h3>
            { shipTypes.map((ship, index)=>{
                return <ShipContainer key={ index } ship={ ship }/>
            }) }


        </>
    );
}

function ShipContainer(props) {
    const ship = props.ship;
    const shipCells = [];

    for (let i = 0; i < ship.length; i++) {
        shipCells.push(i);
    }

    return (
        <div className="ship__container">
            <p>{ ship.name } x { ship.count }</p>
            <div className="ship">
                { shipCells.map((cell)=>{
                    return <div className="ship__cell"/>
                }) }
            </div>
        </div>
    )
}


export default ShipMenu;