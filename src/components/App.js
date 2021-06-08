import React, { useState } from 'react'
import GameContainer from "./GameContainer";

import SelectShipLocations from "./SelectShipLocations";
import Gameboard from "../factories/GameboardFactory";
import Player from "../factories/PlayerFactory";
import { GameContent } from "./Styles/game";
import { Button } from "./Styles/selectingShipsStyles";

let playersGameboard;
const computerGameboard = new Gameboard('Enemy');

computerGameboard.placeAllShipsOnBoard();

function App() {
    const [gameHasStarted, setGameHasStarted] = useState(false);

    const player = new Player('player');
    const computer = new Player('computer');


    return (
        <div>
            <header>
                <h1>Battleships</h1>
                <p>Place your own ships on the map and try to sink your opponents ships to win</p>
            </header>
            { !gameHasStarted ?
                <SelectShipLocations setGameboard={ setPlayersGameBoard } setGameHasStarted={ setGameHasStarted }/> :
                <GameContainer player={ [player, playersGameboard] } enemy={ [computer, computerGameboard] }
                               gameHasStarted={ gameHasStarted }/> }
        </div>
    )

}

function setPlayersGameBoard(obj) {
    playersGameboard = obj;
}

export default App;