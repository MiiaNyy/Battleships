import React from 'react'
import GameboardGrid from "./GameboardGrid";

function App() {
    return (
        <div>
            <header>
                <h1>Battleships</h1>
                <p>Place your own ships on the map and try to sink your opponents ships to win</p>
            </header>
            <div className="game-container">
                <GameboardGrid/>
            </div>
        </div>
    )
}

export default App;