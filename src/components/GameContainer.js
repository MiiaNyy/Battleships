import React, { useState, useEffect } from "react";
import GameboardItem from "./GameboardItem";

import attackIsValid from "./helpers/attackIsValid";

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
        }, 500);
        return ()=>clearTimeout(changeGameMessage);
    }, [gameMessage]);

    useEffect(()=>{
        // Human player starts.
        if ( enemyPlayer.turn && humanPlayer.shotsFired > 0 ) {
            // Take 3 seconds before attacking human board
            computerAttack()
        }
    }, [computersTurn])

    function computerAttack() {
        const computerTurn = setTimeout(()=>{
            shootEnemy();
            enemyPlayer.turnOver();
            humanPlayer.startTurn();
            setComputersTurn(false);

        }, 500);
        return ()=>clearTimeout(computerTurn);
    }

    function shootEnemy() {
        enemyPlayer.shootTheEnemy();
        const coordinate = enemyPlayer.shotCoordinate;
        attackIsValid(humanBoard, enemyPlayer, setGameMessage, coordinate);
        console.log('enemy player all shots fired ' + enemyPlayer.allFiredShots)
        console.log('enemy player all shots hit ' + enemyPlayer.allHitShots);
        console.log('shooting at ' + coordinate);
    }

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
