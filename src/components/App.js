import React, { useState } from 'react'
import GameContainer from "./GameContainer";

import SelectShipLocations from "./SelectShipLocations";
import blurTheBackground from "../game_helpers/blurTheBackground";

import Gameboard from "../factories/GameboardFactory";
import Player from "../factories/PlayerFactory";

import { Header, MessageContainer, InfoBtnContainer } from "./Styles/general";

//let playersGameboard = new Gameboard('Friendly');
let playersGameboard;
const computerGameboard = new Gameboard('Enemy');

computerGameboard.placeAllShipsOnBoard();

function App() {
    const [gameHasStarted, setGameHasStarted] = useState(false);
    const [infoMessageOpen, setInfoMessageOpen] = useState(false);

    const player = new Player('player');
    const computer = new Player('computer');
    player.startTurn();

    if ( screen.width < 450 ) {
        return (
            <MessageContainer info>
                <h3>Info</h3>
                <p> Unfortunately, this app doesn't work on small screens.</p>
                <p>Please rotate your device to horizontal view and refresh the page.</p>
            </MessageContainer>
        )
    } else {
        return (
            <div>
                <Header gameHasStarted={ gameHasStarted }>
                    <h1>Battleships</h1>
                    <p>Place your own ships on the map and try to sink your opponents ships to win</p>
                </Header>
                <InfoBtnContainer blurOn={ infoMessageOpen }>
                    <i className="info-btn far fa-question-circle" onClick={ ()=>{
                        blurTheBackground(gameHasStarted, "blur(2px) grayscale(20%)")
                        setInfoMessageOpen(()=>true)
                    } }/>
                </InfoBtnContainer>
                {/*<GameContainer player={ [player, playersGameboard] } enemy={ [computer, computerGameboard] }
                           gameHasStarted={ gameHasStarted }/>*/ }
                { !gameHasStarted ?
                    <SelectShipLocations setGameboard={ setPlayersGameBoard }
                                         setGameHasStarted={ setGameHasStarted }/> :
                    <GameContainer player={ [player, playersGameboard] } enemy={ [computer, computerGameboard] }
                                   gameHasStarted={ gameHasStarted }/> }
                { infoMessageOpen ?
                    <InfoMessage gameHasStarted={ gameHasStarted } setInfoMessageOpen={ setInfoMessageOpen }/> : <></> }
            </div>
        )
    }

}

function InfoMessage(props) {

    function Messages() {
        if ( props.gameHasStarted ) {
            return (
                <>
                    <ul>
                        <li>You can shoot the enemy by clicking enemy's board.</li>
                        <li>Try to find all of enemy's ships and sunk them before enemy finds yours.</li>
                        <li>In the console, above gameboards, you find latest developments in the game</li>
                        <li>Specs tells you how many shots you have fired to the enemy board, how many shot has hit or
                            missed
                            and how many have you received.
                        </li>
                    </ul>

                </>
            )

        } else {
            return (
                <>
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

                </>

            )
        }
    }

    const [animationOn, setAnimation] = useState(false);
    const classes = animationOn ? 'toggle-off' : 'toggle-in';

    return (
        <MessageContainer info className={ classes }>
            <div className="info-btn__container">
                <i onClick={ ()=>{
                    blurTheBackground(props.gameHasStarted, "none");
                    setAnimation(()=>true)
                    setTimeout(()=>{
                        props.setInfoMessageOpen(()=>false);
                    }, 500)
                } } className="close-info-btn info-btn fas fa-times"/>
            </div>
            <h3>Info</h3>
            <Messages/>
        </MessageContainer>
    );

}

function setPlayersGameBoard(obj) {
    playersGameboard = obj;
}


export default App;