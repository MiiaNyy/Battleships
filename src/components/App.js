import React, { useState } from 'react'

import GameContainer from "./GameContainer";
import PositionShips from "./PositionShips";
import SelectGameLevel from "./SelectGameLevel";

import Gameboard from "../factories/GameboardFactory";
import Player from "../factories/PlayerFactory";

import { Header } from "./Styles/general";

let playersGameboard;
//let playersGameboard = new Gameboard('Friendly');

let computerGameboard = new Gameboard('Enemy');
let player = new Player('player');
let computer = new Player('computer');

function App () {
    
    const [gameHasStarted, setGameHasStarted] = useState(false);
    const [levelSelected, setLevelSelected] = useState(false);
    const [gameLevelIs, setGameLevelTo] = useState('');
    /*const [gameHasStarted, setGameHasStarted] = useState(true);
     const [levelSelected, setLevelSelected] = useState(true);
     const [gameLevelIs, setGameLevelTo] = useState('atlantic');*/
    
    /* When player has played game to the end, game gives player choices to play another round with current level or
     move to the next level */
    function resetPlayersAndBoards () {
        computer.resetValues();
        player.resetValues();
        computerGameboard.resetValues();
        playersGameboard.resetValues();
    }
    
    function playNextLevel () {
        const newGameLevel = gameLevelIs === 'mediterranean' ? 'atlantic' : gameLevelIs === 'atlantic' ? 'pacific' : '';
        resetPlayersAndBoards();
        
        setGameHasStarted(() => false);
        setGameLevelTo(() => newGameLevel);
    }
    
    function restartGameWithCurrentLevel () {
        resetPlayersAndBoards();
        setGameHasStarted(() => false);
    }
    
    player.startTurn();
    
    function Content () {
        if ( !levelSelected ) {
            return <SelectGameLevel setLevelSelected={ setLevelSelected } setGameLevelTo={ setGameLevelTo }/>
        } else if ( levelSelected && !gameHasStarted ) {
            return <PositionShips setGameboard={ setPlayersGameBoard }
                                  gameLevel={ gameLevelIs } setGameHasStarted={ setGameHasStarted }/>
        } else if ( levelSelected && gameHasStarted ) {
            return <GameContainer player={ [player, playersGameboard] } playNextLevel={ playNextLevel }
                                  restartLevel={ restartGameWithCurrentLevel }
                                  enemy={ [computer, computerGameboard] } setGameHasStarted={ setGameHasStarted }
                                  gameHasStarted={ gameHasStarted } gameLevel={ gameLevelIs }/>
        }
    }
    
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

function setPlayersGameBoard (obj) {
    playersGameboard = obj;
}

export default App;
