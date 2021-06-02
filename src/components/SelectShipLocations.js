import React, { useState } from 'react';
import { GameboardGrid, Cell, GameContent, Sidebar } from "./Styles/game";
import { getGridCellIds } from "./helpers/gameboardItemHelpers";
import ShipMenu from "./ShipMenu";
import shipTypes from "../game_helpers/shipTypes";
let crt;


document.addEventListener("dragend", function(event) {
    crt.style.display = 'none';
    crt.remove()
});

function SelectShipLocations(props) {
    const cellIds = getGridCellIds();
    const humanPlayer = props.humanPlayer[0];
    const humanBoard = props.humanPlayer[1];

    const computer = props.computerPlayer[0];
    const computerBoard = props.computerPlayer[1];

    const [draggedShip, setDraggedShip] = useState();
    const [allShipsCoordinates, setAllShipsCoordinates] = useState([]);

    function checkIfThisIsShipPosition(cell) {
        for (let i = 0; i < allShipsCoordinates.length; i++) {
            for (let j = 0; j < allShipsCoordinates[i].length; j++) {
                if ( allShipsCoordinates[i][j] === cell ) {
                    console.log('cell and coordinate are the same ' + cell);
                    return true
                }
            }

        }
        return false;
    }

    function drop(ev) {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        console.log(humanBoard.placeShip(draggedShip, ev.target.id, false))
        console.log(humanBoard.latestShipPlaced);

        setAllShipsCoordinates((prev) => {
            return [...prev, humanBoard.latestShipPlaced]
        });
        console.log(allShipsCoordinates);
        document.body.appendChild(crt);
    }


    return (

        <GameContent>
            <div className="flex">
                <div className="flex">
                    <Sidebar>
                        <h3>Select locations to your ships</h3>
                        { shipTypes.map((ship, index)=>{
                            return <ShipContainer key={ index } id={ index } setDraggedShip={ setDraggedShip }
                                                  ship={ ship }/>
                        }) }
                    </Sidebar>

                    <div className="select__grid" onDrop={ (e)=>drop(e) } onDragOver={ (e)=>allowDrop(e) }>
                        { cellIds.map((cell)=>{
                            const position = checkIfThisIsShipPosition(cell);
                            return <Cell shipPosition={ position } key={ cell } id={ cell }/>
                        }) }
                    </div>
                </div>

            </div>
        </GameContent>
    );
}

function allowDrop(ev) {
    ev.preventDefault();
}


function ShipContainer(props) {
    const ship = props.ship;

    const shipCells = [];

    for (let i = 0; i < ship.length; i++) {
        shipCells.push(i);
    }

    function drag(ev, ship) {
        ev.dataTransfer.setData("text", ev.target.id);
        props.setDraggedShip(()=>ship);
        crt = ev.target.cloneNode(true);

        crt.style.position = "absolute";
        crt.style.top = "0px";
        crt.style.left = "-100px";

        const inner = crt.getElementsByClassName("inner")[0];

        inner.style.transform = "rotate(90deg)";

        document.body.appendChild(crt);
        ev.dataTransfer.setDragImage(crt, 50, 50);
    }

    return (
        <div className="ship__container">
            <p>{ ship.name } x { ship.count }</p>
            <div id={ props.id } draggable="true" onDragStart={ (e)=>drag(e, ship) } className="ship">
                <div className="ship inner">
                    { shipCells.map((cell, index)=>{
                        return <div key={ index } id={ index } className="ship__cell"/>
                    }) }
                </div>

            </div>
        </div>
    )
}


export default SelectShipLocations;