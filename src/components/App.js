import React, { useState } from 'react'
import GameContainer from "./GameContainer";

import SelectShipLocations from "./SelectShipLocations";

let playersGameboard;

function App() {
    const [gameHasStarted, setGameHasStarted] = useState(false);

    return (
        <div>
            <header>
                <h1>Battleships</h1>
                <p>Place your own ships on the map and try to sink your opponents ships to win</p>
            </header>
            { !gameHasStarted ?
                <SelectShipLocations setGameboard={ setPlayersGameBoard } setGameHasStarted={ setGameHasStarted }/> :
                <GameContainer playersGameBoard={ playersGameboard } gameHasStarted={ gameHasStarted }/> }
        </div>
    )

}

function setPlayersGameBoard(obj) {
    console.log('inside App component, assigning player gameboard to ');
    for (const key in obj) {
        if ( obj.hasOwnProperty(key) ) {
            console.log(`${ key }: ${ obj[key] }`);
        }
    }
    playersGameboard = obj;
}

export default App;