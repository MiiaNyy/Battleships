import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { GameboardGrid, Cell, GameContent, Sidebar } from "./Styles/game";
import { getGridCellIds } from "./helpers/gameboardItemHelpers";
import ShipMenu from "./ShipMenu";
import shipTypes from "../game_helpers/shipTypes";
import { BtnContainer, Button } from "./Styles/selectingShipsStyles";


let draggedItem;
let newCloneNode;

function SelectShipLocations(props) {
    const cellIds = getGridCellIds();
    const humanPlayer = props.humanPlayer[0];
    const humanBoard = props.humanPlayer[1];

    const computer = props.computerPlayer[0];
    const computerBoard = props.computerPlayer[1];

    const [ships, setShips] = useState(getNewShipTypesArr()); // arr of ship obj with ids
    const [draggedShip, setDraggedShip] = useState(); // current ship obj that is being dragged

    const [allShipsCoordinates, setAllShipsCoordinates] = useState([]);

    const [shipsAxelVertical, setShipsAxelVertical] = useState(false);
    const axel = shipsAxelVertical ? 'vertical' : 'horizontal';

    function drop(e) {
        e.preventDefault();
        humanBoard.placeShip(draggedShip, e.target.id, shipsAxelVertical);
        const targetShipId = e.dataTransfer.getData("text");

        setShips((allShips)=>changeShipsCount(allShips, targetShipId));
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

                        <BtnContainer axel>
                            <h4>Rotation: { axel }</h4>
                            <Button small onClick={ ()=>setShipsAxelVertical((prev)=>!prev) }>
                                Change rotation
                            </Button>
                        </BtnContainer>

                        { ships.map((ship)=>{
                            return <ShipContainer key={ ship.id } id={ ship.id } setDraggedShip={ setDraggedShip }
                                                  ship={ ship } setShips={ setShips }
                                                  shipsAxelVertical={ shipsAxelVertical }/>
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

            <BtnContainer>
                <Button
                    onClick={ ()=> {
                        if (humanBoard.ships.length === 9) {
                            props.setGameHasStarted(true);
                            console.log(humanBoard.ships)
                        }
                    } }
                    large active={ humanBoard.ships.length === 9 }>
                    Start Game
                </Button>
            </BtnContainer>

        </GameContent>
    );
}


function ShipContainer(props) {
    const ship = props.ship;
    const shipCells = [];

    for (let i = 0; i < ship.length; i++) {
        shipCells.push(i);
    }

    function startDrag(e, ship) {
        e.dataTransfer.setData("text", ship.id);
        props.setDraggedShip(()=>ship);
        draggedItem = e.target;

        newCloneNode = e.target.cloneNode(true); // This is "ghost image" of what is dragged
        newCloneNode.style.position = "absolute";
        newCloneNode.style.top = "0px";
        newCloneNode.style.left = "-200px";

        const cloneXPosition = props.shipsAxelVertical ? getClonesXPosition(ship.length) : 15;

        const inner = newCloneNode.getElementsByClassName("inner")[0];
        inner.style.transform = props.shipsAxelVertical ? "rotate(90deg)" : 'none';

        document.body.appendChild(newCloneNode);
        e.dataTransfer.setDragImage(newCloneNode, cloneXPosition, 15);
    }


    return (
        <div className="ship__container">
            <p>{ ship.name } x { ship.count }</p>
            <div id={ props.id } draggable={ ship.count > 0 }
                 onDragEnd={ ()=>stopDrag(ship) }
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

function stopDrag(ship) {
    newCloneNode.style.display = 'none';
    newCloneNode.remove();

    if ( ship.count === 0 ) {
        draggedItem.classList.add('invisible');
    }
}

function changeShipsCount(allShips, id) {
    const shipsIndex = allShips.findIndex((ship)=>ship.id === id);
    const targetShip = allShips.filter((currentShip)=>currentShip.id === id);
    const newArr = allShips.filter((currentShip)=>currentShip.id !== id);

    const newShip = {
        name: targetShip[0].name,
        count: (targetShip[0].count - 1),
        length: targetShip[0].length,
        id: targetShip[0].id
    }
    newArr.splice(shipsIndex, 0, newShip);
    return newArr
}

// make new array from shipTypes and add every ship obj a id
function getNewShipTypesArr() {
    return shipTypes.map((ship)=>Object.assign({}, ship, {id: uuidv4()}));
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