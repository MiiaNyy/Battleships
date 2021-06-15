import React, { useState } from 'react';

import { BtnContainer, Button, ShipInfo, ShipCell, PopUpMessage } from "./Styles/dragAndDrop";
import { Cell, GameboardGrid, GameContent, Sidebar } from "./Styles/general";

import { getGridCellIds } from "./helpers/gameboardItemHelpers";
import isTouchScreen from "../game_helpers/isTouchScreen";
import {getGridSize} from "../game_helpers/gridSize";

import {
    changeShipsCount,
    getNewShipTypesArr,
    createShipCells,
    checkIfDropIsAllowed,
    getClonesXPosition,
    checkIfThisIsShipPosition
} from "./helpers/selectingShipsHelpers";

import Gameboard from "../factories/GameboardFactory";

import blurTheBackground from "../game_helpers/blurTheBackground";

let clickedShip = []; // touch screens uses this, when position ships on board
let draggedItem; // normal mouse screens uses this when ships are draggable
let newCloneNode;
const humanBoard = new Gameboard('Friendly');




function PositionShips(props) {

    humanBoard.setGameLevel = props.gameLevel;

    const gridSize = getGridSize(props.gameLevel);
    const cellIds = getGridCellIds(props.gameLevel);

    const [ships, setShips] = useState(getNewShipTypesArr(props.gameLevel)); // arr of ship obj with ids on the
    // drag/info container
    const [draggedShip, setDraggedShip] = useState(); // current ship obj that is being dragged

    const [coordinatesWithShip, setCoordinatesWithShips] = useState([]); //coordinates that has ship in it

    const [shipsAxelVertical, setShipsAxelVertical] = useState(false);

    const [shipPlacingInvalid, setShipPlacingInvalid] = useState(false);

    const animation = shipPlacingInvalid ? "invalid_position_animation" : "hidden";

    function dropShipOnBoard(e) {
        e.preventDefault();
        const targetShipId = e.dataTransfer.getData("text");
        placeShipOnBoard(draggedShip, e, targetShipId);
    }

    function placeShipOnBoard(currentShip, e, shipId) {
        humanBoard.placeShip(currentShip, e.target.id, shipsAxelVertical);

        if ( humanBoard.placingShipSuccessful ) {
            setShips((allShips)=>changeShipsCount(allShips, shipId));
            setCoordinatesWithShips((prev)=>{
                return [...prev, humanBoard.latestShipPlaced]
            });
        } else {
            setShipPlacingInvalid(true);// Set animation on and remove animation after 2500ms
            blurTheBackground(false, "blur(2px) grayscale(20%)")
            setTimeout(()=>{
                blurTheBackground(false, "none");
            }, 1500)

            setTimeout(()=>{
                setShipPlacingInvalid(false);
            }, 2500)
            // remove drag hover classname from the document
            document.querySelectorAll(".drag-hover").forEach(el=>el.classList.remove('drag-hover'));
        }
    }

    function placeShipOnTouchScreens(e) {
        if ( clickedShip.length > 0 ) {
            const [clickedElement, ship] = clickedShip;
            document.querySelectorAll(".ship-rotation").forEach(el=>el.style.border = '2px solid #a5a5a5');
            placeShipOnBoard(ship, e, ship.id);
            if ( humanBoard.placingShipSuccessful && ship.count <= 1 ) {
                clickedElement.classList.add('invisible');
            }
        }
    }


    return (
        <GameContent positionShips>
            <div className="flex">
                <div className="flex container">
                    <Sidebar>
                        <h3> { isTouchScreen() ? '1. Select ships rotation and ship that you want to place' : 'Drag' +
                            ' and drop to position your ships' }</h3>
                        <BtnContainer axel>
                            <p>Rotation: { shipsAxelVertical ? 'Vertical' : 'Horizontal' } </p>
                            <Button small onClick={ ()=>setShipsAxelVertical((prev)=>!prev) }>
                                Change rotation
                            </Button>
                        </BtnContainer>
                        <div className="wrap">
                            { ships.map((ship)=>{
                                return <ShipContainer key={ ship.id } id={ ship.id } setDraggedShip={ setDraggedShip }
                                                      ship={ ship } setShips={ setShips }
                                                      shipsAxelVertical={ shipsAxelVertical }/>
                            }) }
                        </div>
                    </Sidebar>

                    <div style={{alignSelf: "center"}}>
                        <h2>{ isTouchScreen() ? '2. Click here to place your ship' : 'Drag your ships here' } </h2>
                        <GameboardGrid size={gridSize} secondary>
                            { cellIds.map((cell)=>{
                                const shipPosition = checkIfThisIsShipPosition(cell, coordinatesWithShip);
                                return <Cell shipPosition={ shipPosition } key={ cell } id={ cell } dragAndDrop
                                             onDrop={ (e)=>dropShipOnBoard(e) }
                                             onDragOver={ (e)=>checkIfDropIsAllowed(e, shipPosition) }
                                             onDragEnter={ (e)=>handleDragEnter(e, shipPosition) }
                                             onDragLeave={ (e)=>handleDragLeave(e) }
                                             onClick={ (e)=>placeShipOnTouchScreens(e) }/>
                            }) }
                        </GameboardGrid>
                    </div>

                </div>
            </div>

            <BtnContainer>
                <Button onClick={ ()=>startTheGame(props) } large active={ humanBoard.ships.length > 1 }>
                    Start Game <i className="fas fa-arrow-right"/>
                </Button>
            </BtnContainer>

            <PopUpMessage className={ animation }>
                <p>Invalid position!</p>
                <p>Please try again</p>
            </PopUpMessage>

        </GameContent>

    );
}


function ShipContainer(props) {
    const ship = props.ship;
    const shipCells = createShipCells(ship);

    function startDrag(e, ship) {
        e.dataTransfer.setData("text", ship.id);
        props.setDraggedShip(()=>ship);
        draggedItem = e.target;

        newCloneNode = e.target.cloneNode(true); // This is "ghost image" of what is dragged
        newCloneNode.style.position = "absolute";
        newCloneNode.style.top = "0px";
        newCloneNode.style.left = "-200px";
        newCloneNode.style.border = "none";

        const cloneXPosition = props.shipsAxelVertical ? getClonesXPosition(ship.length) : 15;

        const inner = newCloneNode.getElementsByClassName("inner")[0];
        inner.style.transform = props.shipsAxelVertical ? "rotate(90deg)" : 'none';

        document.body.appendChild(newCloneNode);
        e.dataTransfer.setDragImage(newCloneNode, cloneXPosition, 15);
    }

    return (
        <ShipInfo>
            <p>{ ship.name } x { ship.count }</p>
            <div id={ props.id } className="ship-rotation" draggable={ ship.count > 0 } onDragEnd={ ()=>stopDrag(ship) }
                 onDragStart={ (e)=>startDrag(e, ship) } onClick={ (e)=>selectShipOnTouchScreens(e, ship) }>
                <div className="ship-rotation inner">
                    { shipCells.map((cell, index)=>{
                        return <ShipCell ship={ ship.name } key={ index } id={ `ship-cell${ index }` }/>
                    }) }
                </div>
            </div>
        </ShipInfo>
    )
}


function selectShipOnTouchScreens(e, ship) {
    if ( isTouchScreen() ) {
        const clickedElement = e.target.parentNode;
        if ( clickedElement.classList[1] === 'inner' ) {
            clickedShip = [clickedElement, ship];
            document.querySelectorAll(".ship-rotation").forEach(el=>el.style.border = '2px solid #a5a5a5');
            clickedElement.style.border = '2px solid yellow';
        }
    } else {
        console.log('normal screen')
    }
}


function stopDrag(ship) {
    newCloneNode.style.display = 'none';
    newCloneNode.remove();

    if ( ship.count === 0 ) {
        draggedItem.classList.add('invisible');
    }
}

function handleDragEnter(e, shipPosition) {
    if ( !shipPosition ) { // add hover effect if this is not ship position
        e.target.classList.add('drag-hover');
    }
}

function handleDragLeave(e) {
    e.target.classList.remove('drag-hover'); // remove hover effect
}

function startTheGame(props) {
    if ( humanBoard.ships.length > 1 ) {
        props.setGameboard(humanBoard);
        props.setGameHasStarted(true);
    }
}

export default PositionShips;
