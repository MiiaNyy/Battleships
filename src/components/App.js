import React, { useEffect, useState } from 'react'
import GameContainer from "./GameContainer";
import Player from "../factories/PlayerFactory";
import Gameboard from "../factories/GameboardFactory";

import shipTypes from "../game_helpers/shipTypes";
import SelectShipLocations from "./SelectShipLocations";
let playersGameboard;

function App() {


    /*    const player = new Player('player');
        const computer = new Player('computer');



        const playerGameboard = new Gameboard('Friendly');
        const computerGameboard = new Gameboard('Enemy');*/


    /* player.startTurn();
     computerGameboard.placeShip({
         name: 'Carrier',
         count: 1, // how many this type of ships can be on the board
         length: 5
     }, 'd5', true);*/

    const [gameHasStarted, setGameHasStarted] = useState(false);




    function setPlayersGameBoard(obj) {
        console.log('inside App component, assigning player gameboard to ');
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                console.log(`${key}: ${obj[key]}`);
            }
        }
        playersGameboard = obj;
    }


    if ( !gameHasStarted ) {
        return (
            <div>
                <header>
                    <h1>Battleships</h1>
                    <p>Place your own ships on the map and try to sink your opponents ships to win</p>
                </header>
                <SelectShipLocations setPlayersGameboard={ setPlayersGameBoard }
                                     setGameHasStarted={ setGameHasStarted }/>

            </div>
        )
    } else {
        console.log('playersGameboard inside else is ' + playersGameboard)
        return (
            <div>
                <header>
                    <h1>Battleships</h1>
                    <p>Place your own ships on the map and try to sink your opponents ships to win</p>
                </header>
                <GameContainer playersGameBoard={ playersGameboard } gameHasStarted={ gameHasStarted }/>

            </div>
        )
    }


}


/*<GameContainer {/!*computerPlayer={ [computer, computerGameboard] }
                               humanPlayer={ [player, playerGameboard] }*!/ }
                               gameHasStarted={ gameHasStarted }/>*/
export default App;