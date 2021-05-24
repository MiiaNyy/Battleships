import React from 'react';


function GameDescription(props) {
    const player = props.player;
    const enemy = props.enemy;
    const description= player.turn ? "It's players turn" : "It's enemy's turn";




    return (
        <div className="game-info">
            <p>{ description }</p>
        </div>
    );
}

export default GameDescription;