import React from 'react'
import GameContainer from "./GameContainer";
import Player from "../factories/PlayerFactory";
import Gameboard from "../factories/GameboardFactory";

import shipTypes from "../game_helpers/shipTypes";


function App() {

    const player = new Player('player', true);
    const computer = new Player('computer', false);

    const playerGameboard = new Gameboard('Friendly');
    const computerGameboard = new Gameboard('Enemy');

    playerGameboard.placeShip(shipTypes[0], 'a4', true);
    playerGameboard.placeShip(shipTypes[1], 'e3', false);
    playerGameboard.placeShip(shipTypes[2], 'h5', true);
    playerGameboard.placeShip(shipTypes[3], 'd6', false);
    playerGameboard.placeShip(shipTypes[4], 'i10', true);

    computerGameboard.placeShip(shipTypes[0], 'a2', true);
    computerGameboard.placeShip(shipTypes[1], 'f4', false);
    computerGameboard.placeShip(shipTypes[2], 'g6', true);
    computerGameboard.placeShip(shipTypes[3], 'd7', false);
    computerGameboard.placeShip(shipTypes[4], 'i9', true);


    return (
        <div>
            <header>
                <h1>Battleships</h1>
                <p>Place your own ships on the map and try to sink your opponents ships to win</p>
            </header>
            <GameContainer computerPlayer={ [computer, computerGameboard] } humanPlayer={ [player, playerGameboard] }/>
        </div>
    )
}

export default App;