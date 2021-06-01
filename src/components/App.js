import React from 'react'
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

    player.startTurn()



    return (
        <div>
            <header>
                <h1>Battleships</h1>
                <p>Place your own ships on the map and try to sink your opponents ships to win</p>
            </header>
            <SelectShipLocations computerPlayer={ [computer, computerGameboard] } humanPlayer={ [player, playerGameboard] }/>
            {/*<GameContainer computerPlayer={ [computer, computerGameboard] } humanPlayer={ [player, playerGameboard] }/>*/}

        </div>
    )
}

export default App;