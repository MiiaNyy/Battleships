import React, { useState } from 'react';
import { GameboardGrid, Cell, GameContent, Sidebar } from "./Styles/game";
import { getGridCellIds } from "./helpers/gameboardItemHelpers";
import ShipMenu from "./ShipMenu";
import shipTypes from "../game_helpers/shipTypes";


let newCloneNode;
let draggedItem;


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
                            <h4>Rotation: { axel }</h4>
                            <button onClick={ ()=>setShipsAxelVertical((prev)=>!prev) } className="btn_secondary">
                                Change rotation
                            </button>
                        </div>

                        { shipTypes.map((ship, index)=>{
                            return <ShipContainer key={ index } id={ index } setDraggedShip={ setDraggedShip }
                                                  ship={ ship } shipsAxelVertical={ shipsAxelVertical }/>
                        }) }

                    </Sidebar>

                    <div className="select__grid">
                        { cellIds.map((cell)=>{
                            const shipPosition = checkIfThisIsShipPosition(cell, allShipsCoordinates);
                            return <Cell shipPosition={ shipPosition } key={ cell } id={ cell }
                                         onDrop={ (e)=>drop(e) }
                                         onDragOver={ (e)=>checkIfDropIsAllowed(e, shipPosition) }
                                         onDragEnter={ (e)=>handleDragEnter(e, shipPosition) }
                                         onDragLeave={ (e)=>handleDragLeave(e) }/>
                        }) }
                    </div>
                </div>

            </div>
        </GameContent>
    );
}

function ShipContainer(props) {
    const ship = props.ship;
    const [shipCount, setShipCount] = useState(ship.count);


    const shipCells = [];

    for (let i = 0; i < ship.length; i++) {
        shipCells.push(i);
    }

    function startDrag(e, ship) {
        e.dataTransfer.setData("text", e.target.id);
        props.setDraggedShip(()=>ship);

        draggedItem = e.target;

        if ( shipCount > 0 ) {
            setShipCount(()=>shipCount - 1);
        }

        newCloneNode = e.target.cloneNode(true);

        newCloneNode.style.position = "absolute";
        newCloneNode.style.top = "0px";
        newCloneNode.style.left = "-100px";

        const cloneXPosition = props.shipsAxelVertical ? getClonesXPosition(ship.length) : 15;
        const inner = newCloneNode.getElementsByClassName("inner")[0]; // This is "ghost image" of what is dragged
        inner.style.transform = props.shipsAxelVertical ? "rotate(90deg)" : 'none';

        document.body.appendChild(newCloneNode);
        e.dataTransfer.setDragImage(newCloneNode, cloneXPosition, 15);
    }

    function stopDrag() {
        newCloneNode.style.display = 'none';
        newCloneNode.remove();

        if ( shipCount === 0 ) {
            draggedItem.classList.add('invisible');
        }
    }

    return (
        <div className="ship__container">
            <p>{ ship.name } x { shipCount }</p>
            <div id={ props.id } draggable={ shipCount > 0 } onDragEnd={ ()=>stopDrag() }
                 onDragStart={ (e)=>startDrag(e, ship) }
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

function checkIfDropIsAllowed(e, shipPosition) {
    if ( !shipPosition ) { // if this is not ship position, allow drop
        e.preventDefault();
    }
}

function handleDragEnter(e, shipPosition) {
    if ( !shipPosition ) { // if this is not ship position, add hover effect
        e.target.classList.add('drag-hover');
    }
}

function handleDragLeave(e) {
    e.target.classList.remove('drag-hover');
}


function getClonesXPosition(length) {
    switch (length) {
        case 1:
            return 15;
        case 2:
            return 35;
        case 3:
            return 50;
        case 4:
            return 65;
        case 5:
            return 85;
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