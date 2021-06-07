import React, { useState, useEffect, useContext } from "react";
import GameboardItem from "./GameboardItem";
import GameEndedMessages from "./GameEndedMessages";

import attackIsValid from "./helpers/attackIsValid";

import { GameContent } from "./Styles/game";
import Player from "../factories/PlayerFactory";
import Gameboard from "../factories/GameboardFactory";

const humanPlayer = new Player('player');
let humanBoard;

const computer = new Player('computer');
const computerBoard = new Gameboard('Enemy');

// Third screen. Before this all of the objects are made
function GameContainer(props) {


    const [gameDescription, setGameDescription] = useState('Welcome to the battleship game');
    const [computersTurn, setComputersTurn] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    humanBoard = props.playersGameBoard;

    humanPlayer.startTurn();
    computerBoard.placeShip({
        name: 'Battleship',
        count: 1,
        length: 4
    }, 'h5', true)

    // Whenever gameDescription changes, after 2 seconds change message to show whose turn is it
    useEffect(()=>{
        const changeGameMessage = setTimeout(()=>{
            setGameDescription(()=>{
                return humanPlayer.turn ? "It's players turn" : "It's enemy's turn";
            })
        }, 2000);
        return ()=>clearTimeout(changeGameMessage);
    }, [gameDescription]);

    useEffect(()=>{
        // Human starts
        if ( computer.turn && humanPlayer.firstShotFired && !gameOver ) {
            // Take 3 seconds before attacking human board
            const computerTurn = setTimeout(()=>{
                computerShootsEnemy();
                computer.turnOver();
                humanPlayer.startTurn();
                setComputersTurn(false);
            }, 2500);
            return ()=>clearTimeout(computerTurn);
        }
    }, [computersTurn])

    function computerShootsEnemy() {
        computer.shootTheEnemy();
        const coordinate = computer.latestShotCoordinate;
        attackIsValid(humanBoard, computer, coordinate, setGameDescription, setGameOver);
    }


    return (
        <>

            <GameContent>
                <div className="game-info">
                    <p>{ gameDescription }</p>
                </div>
                <div className="flex">
                    <GameboardItem gameHandlers={ [setComputersTurn, setGameDescription] } playerGrid={ humanBoard }
                                   gameOver={ [gameOver, setGameOver] } players={ [humanPlayer, computer] }/>
                    <GameboardItem gameHandlers={ [setComputersTurn, setGameDescription] }
                                   playerGrid={ computerBoard }
                                   gameOver={ [gameOver, setGameOver] } players={ [humanPlayer, computer] }/>

                </div>
            </GameContent>
            <GameEndedMessages gameIsOver={ gameOver } computer={ computer }/>
        </>
    )


}

export default GameContainer;
