import React from 'react'
import GameContainer from "./GameContainer";
import Player from "../factories/PlayerFactory";
import Gameboard from "../factories/GameboardFactory";

import shipTypes from "../game_helpers/shipTypes";


function App() {

    const player = new Player('player', true);
    const computer = new Player('computer', false);

    player.createGameboard = 'Friendly';
    computer.createGameboard = 'Enemy';

    player.gameboard.placeShip(shipTypes[0], 'a4', true);
    player.gameboard.placeShip(shipTypes[1], 'e3', false);
    player.gameboard.placeShip(shipTypes[2], 'h5', true);
    player.gameboard.placeShip(shipTypes[3], 'd6', false);
    player.gameboard.placeShip(shipTypes[4], 'i10', true);

    computer.gameboard.placeShip(shipTypes[0], 'a2', true);
    computer.gameboard.placeShip(shipTypes[1], 'f4', false);
    computer.gameboard.placeShip(shipTypes[2], 'g6', true);
    computer.gameboard.placeShip(shipTypes[3], 'd7', false);
    computer.gameboard.placeShip(shipTypes[4], 'i9', true);


    return (
        <div>
            <header>
                <h1>Battleships</h1>
                <p>Place your own ships on the map and try to sink your opponents ships to win</p>
            </header>
            <GameContainer enemy={ computer } player={ player }/>
        </div>
    )
}

export default App;