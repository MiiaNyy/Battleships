import React, { useEffect, useState, useRef } from 'react'

import GameContainer from "./GameContainer";
import PositionShips from "./PositionShips";
import SelectGameLevel from "./SelectGameLevel";
import InfoMessages from "./InfoMessages";

import useOutsideClick from "../game_helpers/useOutsideClick";

import Gameboard from "../factories/GameboardFactory";
import Player from "../factories/PlayerFactory";

import { Header, MessageContainer, InfoBtnContainer } from "./Styles/general";

//let playersGameboard = new Gameboard('Friendly');
let playersGameboard;
const computerGameboard = new Gameboard('Enemy');
const player = new Player('player');
const computer = new Player('computer');

function App() {
    const [gameHasStarted, setGameHasStarted] = useState(false);

    const [levelSelected, setLevelSelected] = useState(false);
    const [gameLevelIs, setGameLevelTo] = useState('');


    player.startTurn();

    function Content() {
        if ( !levelSelected ) {
            return <SelectGameLevel setLevelSelected={ setLevelSelected } setGameLevelTo={ setGameLevelTo }/>
        } else if ( levelSelected && !gameHasStarted ) {
            return <PositionShips setGameboard={ setPlayersGameBoard }
                                  gameLevel={ gameLevelIs } setGameHasStarted={ setGameHasStarted }/>
        } else if ( levelSelected && gameHasStarted ) {
            return <GameContainer player={ [player, playersGameboard] }
                                  enemy={ [computer, computerGameboard] } setGameHasStarted={ setGameHasStarted }
                                  gameHasStarted={ gameHasStarted } gameLevel={ gameLevelIs }/>
        }
    }

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
                <Content/>
            </div>
        )
    }
}

function setPlayersGameBoard(obj) {
    playersGameboard = obj;



}

export default App;