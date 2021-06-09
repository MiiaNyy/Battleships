import React, { useState } from 'react'
import GameContainer from "./GameContainer";

import SelectShipLocations from "./SelectShipLocations";
import Gameboard from "../factories/GameboardFactory";
import Player from "../factories/PlayerFactory";
import { GameContent, Header, MessageContainer } from "./Styles/game";
import { Button } from "./Styles/selectingShipsStyles";
import GameEndedMessages from "./GameEndedMessages";

//let playersGameboard = new Gameboard('Friendly');
let playersGameboard;
const computerGameboard = new Gameboard('Enemy');

computerGameboard.placeAllShipsOnBoard();

function App() {
    const [gameHasStarted, setGameHasStarted] = useState(false);
    const [infoMessageOpen, setInfoMessageOpen] = useState(false);

    const player = new Player('player');
    const computer = new Player('computer');


    return (
        <div>
            <Header gameHasStarted={ gameHasStarted }>
                <h1>Battleships</h1>
                <p>Place your own ships on the map and try to sink your opponents ships to win</p>
            </Header>
            <div className="info-btn__container">
                <i onClick={ ()=>setInfoMessageOpen(()=>true) } className="info-btn far fa-question-circle"/>
            </div>
            {/*<GameContainer player={ [player, playersGameboard] } enemy={ [computer, computerGameboard] }
                           gameHasStarted={ gameHasStarted }/>*/ }
            { !gameHasStarted ?
                <SelectShipLocations setGameboard={ setPlayersGameBoard } setGameHasStarted={ setGameHasStarted }/> :
                <GameContainer player={ [player, playersGameboard] } enemy={ [computer, computerGameboard] }
                               gameHasStarted={ gameHasStarted }/> }
            { infoMessageOpen ? <InfoMessage setInfoMessageOpen={ setInfoMessageOpen }/> : <></> }
        </div>
    )
}

function InfoMessage(props) {

    return (
        <MessageContainer info className="toggle-in">
            <div className="info-btn__container">
                <i onClick={ ()=>props.setInfoMessageOpen(()=>false) }
                   className="close-info-btn info-btn fas fa-times"/>
            </div>
            {/*<p>Before you can start the game, place your ships on the gameboard.</p>
            <p>You have 9 ships total. All of those ships are in the sidebar.</p>*/}
            <h3>Info</h3>
            <p>You can place the ships on the board by clicking the ship, and dragging it over the gameboard and dropping it to the desired location. </p>
            <p>After you have positioned your ships, start button appears and you can start the game. </p>
        </MessageContainer>
    );

}

function setPlayersGameBoard(obj) {
    playersGameboard = obj;
}

export default App;