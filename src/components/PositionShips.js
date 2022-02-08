import React, { useState } from 'react';

import Gameboard from "../factories/GameboardFactory";

import InfoMessages from "./InfoMessages";
import InfoButton from "./InfoButton";

import { getGridCellIds } from "./helpers/gameboardItemHelpers";
import {
    allTheShipsHasPositioned,
    changeShipsCount,
    checkIfDropIsAllowed,
    checkIfThisIsShipPosition,
    createShipCells,
    getClonesXPosition,
    getNewShipTypesArr
} from "./helpers/positionShipsHelpers";

import isTouchScreen from "../game_helpers/isTouchScreen";
import { getGridSize } from "../game_helpers/gridSize";

import { Button, PopUpMessage, ShipCell, ShipInfo } from "./Styles/dragAndDrop";
import { Cell, Flex, GameboardGrid, GameContent, Sidebar } from "./Styles/general";

let clickedShip = []; // touch screens uses this, when position ships on board
let draggedItem; // normal mouse screens uses this when ships are draggable
let newCloneNode;

const humanBoard = new Gameboard('Friendly');

function PositionShips (props) {
    const [ships, setShips] = useState(getNewShipTypesArr(props.gameLevel)); // arr of ship obj with ids on the
    const [draggedShip, setDraggedShip] = useState(); // current ship obj that is being dragged
    
    const [coordinatesWithShip, setCoordinatesWithShips] = useState([]); //coordinates that has ship in it
    
    const [shipsAxelVertical, setShipsAxelVertical] = useState(false);
    const [shipPlacingInvalid, setShipPlacingInvalid] = useState(false);
    
    const [infoOpen, setInfoOpen] = useState(false);
    
    const gridSize = getGridSize(props.gameLevel);
    const cellIds = getGridCellIds(props.gameLevel);
    
    const animation = shipPlacingInvalid ? "invalid_position_animation" : "hidden";
    
    humanBoard.setGameLevel = props.gameLevel;
    
    function dropShipOnBoard (e) {
        e.preventDefault();
        const targetShipId = e.dataTransfer.getData("text");
        placeShipOnBoard(draggedShip, e, targetShipId);
    }
    
    function placeShipOnBoard (currentShip, e, shipId) {
        humanBoard.placeShip(currentShip, e.target.id, shipsAxelVertical);
        
        if ( humanBoard.placingShipSuccessful ) {
            setShips((allShips) => changeShipsCount(allShips, shipId));
            setCoordinatesWithShips((prev) => {
                return [...prev, humanBoard.latestShipPlaced]
            });
        } else {
            setShipPlacingInvalid(true);// Set animation on and remove animation after 2500ms
            document.querySelector('header').style.filter = "blur(2px) grayscale(20%)"
            setTimeout(() => {
                document.querySelector('header').style.filter = "none"
                setShipPlacingInvalid(false);
            }, 2500)
            // remove drag hover classname from the document
            document.querySelectorAll(".drag-hover").forEach(el => el.classList.remove('drag-hover'));
        }
    }
    
    // Smaller screens, dragging elements doesn't work. Instead use click events
    function placeShipOnTouchScreens (e) {
        if ( clickedShip.length > 0 ) {
            const [clickedElement, ship] = clickedShip;
            document.querySelectorAll(".ship-rotation").forEach(el => el.style.border = '2px solid #a5a5a5');
            placeShipOnBoard(ship, e, ship.id);
            clickedShip = []; // reset clicked ship to null
            if ( humanBoard.placingShipSuccessful && ship.count <= 1 ) {
                clickedElement.classList.add('invisible');
            }
        }
    }
    
    return (
        <>
            <InfoButton setInfoOpen={ setInfoOpen } infoOpen={ infoOpen }/>
            <GameContent blurOn={ infoOpen } positionShips>
                <Flex blurOn={ shipPlacingInvalid }>
                    <div className="place-ships-info">
                        <Sidebar>
                            <h3> { isTouchScreen() ? '1. Select ships rotation and ship that you want to place' : 'Drag' +
                                ' and drop to position your ships' }</h3>
                            <div className="sidebar__container">
                                <div className="sidebar__btn-cont">
                                    <p>Rotation: { shipsAxelVertical ? 'Vertical' : 'Horizontal' } </p>
                                    <Button small onClick={ () => setShipsAxelVertical((prev) => !prev) }>
                                        Change rotation
                                    </Button>
                                </div>
                                <div className="text-center">
                                    { ships.map((ship) => {
                                        return (
                                            <ShipInfo key={ ship.id }>
                                                <p>{ ship.name } x { ship.count }</p>
                                                <ShipClone ship={ ship } size={ gridSize }
                                                           setDraggedShip={ setDraggedShip }
                                                           setShips={ setShips }
                                                           shipsAxelVertical={ shipsAxelVertical }/>
                                            </ShipInfo>
                                        )
                                    }) }
                                </div>
                            </div>
                        
                        </Sidebar>
                        
                        <div>
                            <h2 style={ {fontSize: '1rem'} } className="mb-2">{ isTouchScreen() ? '2. Click here to' +
                                ' place your ship' : 'Drag your ships here' } </h2>
                            <GameboardGrid size={ gridSize }>
                                { cellIds.map((cell) => {
                                    const shipPosition = checkIfThisIsShipPosition(cell, coordinatesWithShip);
                                    return <Cell shipPosition={ shipPosition } key={ cell } id={ cell } dragAndDrop
                                                 onDrop={ (e) => dropShipOnBoard(e) }
                                                 onDragOver={ (e) => checkIfDropIsAllowed(e, shipPosition) }
                                                 onDragEnter={ (e) => handleDragEnter(e, shipPosition) }
                                                 onDragLeave={ (e) => handleDragLeave(e) }
                                                 onClick={ (e) => placeShipOnTouchScreens(e) }/>
                                }) }
                            </GameboardGrid>
                        </div>
                    </div>
                </Flex>
                
                <div style={ {textAlign: 'right'} } className="mt-3 mb-2">
                    <Button onClick={ () => startTheGame(props) } large
                            active={ allTheShipsHasPositioned(props.gameLevel, humanBoard) }>
                        Start Game <i className="fas fa-arrow-right"/>
                    </Button>
                </div>
                
                <PopUpMessage className={ animation }>
                    <p>Invalid position!</p>
                    <p>Please try again</p>
                </PopUpMessage>
            
            </GameContent>
            { infoOpen ?
                <InfoMessages setInfoMessageOpen={ setInfoOpen }>
                    <ul>
                        <li>You can place the ships on the board by clicking the ship, and dragging it over the
                            gameboard and
                            dropping it to the desired location.
                        </li>
                        <li>Change ships rotation by clicking 'change rotation' button and start dragging ships on the
                            board
                        </li>
                        <li>After you have positioned your ships, start button appears and you can start the game.</li>
                    </ul>
                </InfoMessages> : <></> }
        </>
    );
}


// Draggable or clickable item in a sidebar info container
function ShipClone ({ship, size, setDraggedShip, shipsAxelVertical}) {
    const shipCells = createShipCells(ship);
    const touchScreen = isTouchScreen();
    const id = ship.id;
    
    function startDrag (e) {
        e.dataTransfer.setData("text", ship.id);
        setDraggedShip(() => ship);
        draggedItem = e.target;
        
        newCloneNode = e.target.cloneNode(true); // This is "ghost image" of what is dragged
        newCloneNode.style.position = "absolute";
        newCloneNode.style.top = "0px";
        newCloneNode.style.left = "-200px";
        newCloneNode.style.border = "none";
        
        const cloneXPosition = shipsAxelVertical ? getClonesXPosition(ship.length) : 15;
        
        const inner = newCloneNode.getElementsByClassName("inner")[0];
        inner.style.transform = shipsAxelVertical ? "rotate(90deg)" : 'none';
        
        document.body.appendChild(newCloneNode);
        e.dataTransfer.setDragImage(newCloneNode, cloneXPosition, 15);
    }
    
    if ( touchScreen ) {
        return (
            <div id={ id } className="ship-rotation" onClick={ (e) => {
                ship.count > 0 ? selectShipOnTouchScreens(e, ship) : '';
            } }>
                <div className="ship-rotation inner">
                    { shipCells.map((cell, index) => {
                        return <ShipCell size={ size } ship={ ship.name } key={ index }
                                         id={ `ship-cell${ index }` }/>
                    }) }
                </div>
            </div>
        )
    } else {
        return (
            <div id={ id } className="ship-rotation" draggable={ ship.count > 0 }
                 onDragEnd={ () => stopDrag(ship) } onDragStart={ (e) => startDrag(e) }>
                <div className="ship-rotation inner">
                    { shipCells.map((cell, index) => {
                        return <ShipCell size={ size } ship={ ship.name } key={ index }
                                         id={ `ship-cell${ index }` }/>
                    }) }
                </div>
            </div>
        )
        
    }
}


function startTheGame (props) {
    if ( humanBoard.ships.length > 1 ) {
        props.setGameboard(humanBoard);
        props.setGameHasStarted(true);
    }
}

function selectShipOnTouchScreens (e, ship) {
    if ( isTouchScreen() ) {
        const clickedElement = e.target.parentNode;
        if ( clickedElement.classList[1] === 'inner' ) {
            clickedShip = [clickedElement, ship];
            document.querySelectorAll(".ship-rotation").forEach(el => el.style.border = '2px solid #a5a5a5');
            clickedElement.style.border = '2px solid yellow';
        }
    }
    
    
}

/* ---Handle drag event functions */
function stopDrag (ship) {
    newCloneNode.style.display = 'none';
    newCloneNode.remove();
    
    if ( ship.count === 0 ) {
        draggedItem.classList.add('invisible');
    }
}

function handleDragEnter (e, shipPosition) {
    if ( !shipPosition ) { // add hover effect if this is not ship position
        e.target.classList.add('drag-hover');
    }
}

function handleDragLeave (e) {
    e.target.classList.remove('drag-hover'); // remove hover effect
}

export default PositionShips;
