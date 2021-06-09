import React, { useState } from 'react'
import GameContainer from "./GameContainer";

import SelectShipLocations from "./SelectShipLocations";
import Gameboard from "../factories/GameboardFactory";
import Player from "../factories/PlayerFactory";
import { GameContent, Header } from "./Styles/game";
import { Button } from "./Styles/selectingShipsStyles";
import GameEndedMessages from "./GameEndedMessages";

//let playersGameboard = new Gameboard('Friendly');
let playersGameboard;
const computerGameboard = new Gameboard('Enemy');

computerGameboard.placeAllShipsOnBoard();

function App() {
    const [gameHasStarted, setGameHasStarted] = useState(false);

    const player = new Player('player');
    const computer = new Player('computer');


    return (
        <div>
            <Header gameHasStarted={gameHasStarted}>
                <h1>Battleships</h1>
                <p>Place your own ships on the map and try to sink your opponents ships to win</p>
            </Header>
            {/*<GameContainer player={ [player, playersGameboard] } enemy={ [computer, computerGameboard] }
                           gameHasStarted={ gameHasStarted }/>*/}
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