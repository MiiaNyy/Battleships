import React, { useState } from 'react'
import GameContainer from "./GameContainer";
import Player from "../factories/PlayerFactory";
import Gameboard from "../factories/GameboardFactory";

import shipTypes from "../game_helpers/shipTypes";
import SelectShipLocations from "./SelectShipLocations";


function App() {

    const player = new Player('player');
    const computer = new Player('computer');

    const playerGameboard = new Gameboard('Friendly');
    const computerGameboard = new Gameboard('Enemy');

    const [gameHasStarted, setGameHasStarted] = useState(false);

    player.startTurn();
    computerGameboard.placeShip({
        name: 'Carrier',
        count: 1, // how many this type of ships can be on the board
        length: 5
    }, 'd5', true);

    if ( gameHasStarted ) {
        return (
            <div>
                <header>
                    <h1>Battleships</h1>
                    <p>Place your own ships on the map and try to sink your opponents ships to win</p>
                </header>
                <GameContainer computerPlayer={ [computer, computerGameboard] }
                               humanPlayer={ [player, playerGameboard] }/>

            </div>
        )
    } else {
        return (
            <div>
                <header>
                    <h1>Battleships</h1>
                    <p>Place your own ships on the map and try to sink your opponents ships to win</p>
                </header>
                <SelectShipLocations setGameHasStarted={ setGameHasStarted }
                                     computerPlayer={ [computer, computerGameboard] }
                                     humanPlayer={ [player, playerGameboard] }/>
            </div>
        )
    }

}

export default App;