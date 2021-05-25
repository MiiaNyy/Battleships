import React, { useState, useEffect } from "react";
import GameboardItem from "./GameboardItem";
import GameDescription from "./GameDescription";

import { GameContent } from "./Styles/game";

// Third screen. Before this all of the objects are made
function GameContainer(props) {
    const [gameMessage, setGameMessage] = useState('Welcome to the battleship game');
    const [computersTurn, setComputersTurn] = useState(false);


    const humanPlayer = props.humanPlayer[0];
    const enemyPlayer = props.enemyPlayer[0];

    const humanBoard = props.humanPlayer[1];
    const enemyBoard = props.enemyPlayer[1];

    // Whenever gameMessage changes, after 2 seconds change message to show whose turn is it
    useEffect(()=>{
        const changeGameMessage = setTimeout(()=>{
            setGameMessage(()=>{
                return humanPlayer.turn ? "It's players turn" : "It's enemy's turn";
            })
        }, 2000);
        return ()=>clearTimeout(changeGameMessage);
    }, [gameMessage]);

    useEffect(()=>{
        // Human player starts.
        if ( enemyPlayer.turn && humanPlayer.shotsFired > 0 ) {
            const coordinate = enemyPlayer.shootTheEnemy();
            humanBoard.receiveAttack(coordinate);
            enemyPlayer.turnOver();
            humanPlayer.startTurn();
            setComputersTurn(false);
        }
    }, [computersTurn])


    return (
        <GameContent>
            <div className="game-info">
                <p>{ gameMessage }</p>
            </div>
            <div className="flex">
                <GameboardItem switchTurn={ setComputersTurn } setGameMessage={ setGameMessage }
                               playerGrid={ humanBoard } humanPlayer={ humanPlayer } enemyPlayer={ enemyPlayer }/>
                <GameboardItem switchTurn={ setComputersTurn } setGameMessage={ setGameMessage }
                               playerGrid={ enemyBoard } humanPlayer={ humanPlayer } enemyPlayer={ enemyPlayer }/>
            </div>
        </GameContent>
    )
}

export default GameContainer;
