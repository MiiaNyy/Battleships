import React, { useState, useEffect } from "react";
import GameboardItem from "./GameboardItem";

import attackIsValid from "./helpers/attackIsValid";

import { GameContent } from "./Styles/game";

// Third screen. Before this all of the objects are made
function GameContainer(props) {
    const [gameMessage, setGameMessage] = useState('Welcome to the battleship game');
    const [computersTurn, setComputersTurn] = useState(false);

    const humanPlayer = props.humanPlayer[0];
    const humanBoard = props.humanPlayer[1];

    const computer = props.computerPlayer[0];
    const computerBoard = props.computerPlayer[1];

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
        // Human starts
        if ( computer.turn && humanPlayer.allFiredShots.length > 0 ) {
            computerAttack()
        }
    }, [computersTurn])

    function computerAttack() {
        // Take 3 seconds before attacking human board
        const computerTurn = setTimeout(()=>{
            shootEnemy();
            computer.turnOver();
            humanPlayer.startTurn();
            setComputersTurn(false);
        }, 500);
        return ()=>clearTimeout(computerTurn);
    }

    function shootEnemy() {
        computer.shootTheEnemy();
        const coordinate = computer.latestShotCoordinate;
        attackIsValid(humanBoard, computer, setGameMessage, coordinate);
    }

    return (
        <GameContent>
            <div className="game-info">
                <p>{ gameMessage }</p>
            </div>
            <div className="flex">
                <GameboardItem switchTurn={ setComputersTurn } setGameMessage={ setGameMessage }
                               playerGrid={ humanBoard } humanPlayer={ humanPlayer } enemyPlayer={ computer }/>
                <GameboardItem switchTurn={ setComputersTurn } setGameMessage={ setGameMessage }
                               playerGrid={ computerBoard } humanPlayer={ humanPlayer } enemyPlayer={ computer }/>
            </div>
        </GameContent>
    )
}

export default GameContainer;
