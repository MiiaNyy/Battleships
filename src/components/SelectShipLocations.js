import React, { useState } from 'react';
import { GameboardGrid, Cell, GameContent, Sidebar } from "./Styles/game";
import { getGridCellIds } from "./helpers/gameboardItemHelpers";
import ShipMenu from "./ShipMenu";
import shipTypes from "../game_helpers/shipTypes";


let newCloneNode;


function SelectShipLocations(props) {
    const cellIds = getGridCellIds();
    const humanPlayer = props.humanPlayer[0];
    const humanBoard = props.humanPlayer[1];

    const computer = props.computerPlayer[0];
    const computerBoard = props.computerPlayer[1];

    const [draggedShip, setDraggedShip] = useState();
    const [allShipsCoordinates, setAllShipsCoordinates] = useState([]);

    const [shipsAxelVertical, setShipsAxelVertical] = useState(false);
    const axel = shipsAxelVertical ? 'vertical' : 'horizontal';


    function drop(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData("text");
        humanBoard.placeShip(draggedShip, e.target.id, shipsAxelVertical);
        setAllShipsCoordinates((prev)=>{
            return [...prev, humanBoard.latestShipPlaced]
        });

    }


    return (

        <GameContent>
            <div className="flex">
                <div className="flex">
                    <Sidebar>
                        <h3>Select locations to your ships</h3>

                        <div className="btn-container">
                            <h4>Ships are in { axel } position</h4>
                            <button onClick={ ()=>setShipsAxelVertical((prev)=>!prev) } className="btn_secondary">Change
                                axel
                            </button>
                        </div>


                        { shipTypes.map((ship, index)=>{
                            return <ShipContainer key={ index } id={ index } setDraggedShip={ setDraggedShip }
                                                  ship={ ship } shipsAxelVertical={ shipsAxelVertical }/>
                        }) }

                    </Sidebar>

                    <div className="select__grid" onDrop={ (e)=>drop(e) } onDragOver={ (e)=>allowDrop(e) }>
                        { cellIds.map((cell)=>{
                            return <Cell shipPosition={ checkIfThisIsShipPosition(cell, allShipsCoordinates) }
                                         key={ cell } id={ cell }/>
                        }) }
                    </div>
                </div>

            </div>
        </GameContent>
    );
}


function ShipContainer(props) {
    const ship = props.ship;

    const shipCells = [];

    for (let i = 0; i < ship.length; i++) {
        shipCells.push(i);
    }

    function startDrag(ev, ship) {
        ev.dataTransfer.setData("text", ev.target.id);
        props.setDraggedShip(()=>ship);

        newCloneNode = ev.target.cloneNode(true);

        newCloneNode.style.position = "absolute";
        newCloneNode.style.top = "0px";
        newCloneNode.style.left = "-100px";

        const inner = newCloneNode.getElementsByClassName("inner")[0];
        let cloneXPosition = 0;

        if ( props.shipsAxelVertical ) {
            cloneXPosition = getClonesXPosition(ship.length);
            inner.style.transform = "rotate(90deg)";
        }

        document.body.appendChild(newCloneNode);
        ev.dataTransfer.setDragImage(newCloneNode, cloneXPosition, 0);
    }

    return (
        <div className="ship__container">
            <p>{ ship.name } x { ship.count }</p>
            <div id={ props.id } draggable="true" onDragEnd={ ()=>stopDrag() } onDragStart={ (e)=>startDrag(e, ship) }
                 className="ship">
                <div className="ship inner">
                    { shipCells.map((cell, index)=>{
                        return <div key={ index } id={ index } className="ship__cell"/>
                    }) }
                </div>

            </div>
        </div>
    )
}

function allowDrop(e) {
    e.preventDefault();
}

function stopDrag() {
    newCloneNode.style.display = 'none';
    newCloneNode.remove();
}

function getClonesXPosition(length) {
    switch (length) {
        case 1:
            return 0;
        case 2:
            return 20;
        case 3:
            return 35;
        case 4:
            return 50;
        case 5:
            return 70;
    }
}

function checkIfThisIsShipPosition(cell, shipsCoordinates) {
    for (let i = 0; i < shipsCoordinates.length; i++) {
        for (let j = 0; j < shipsCoordinates[i].length; j++) {
            if ( shipsCoordinates[i][j] === cell ) {
                return true
            }
        }
    }
    return false;
}

export default SelectShipLocations;