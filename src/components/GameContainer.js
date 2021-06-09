import React, { useState, useEffect, useContext } from "react";
import GameboardItem from "./GameboardItem";
import GameEndedMessages from "./GameEndedMessages";

import attackIsValid from "./helpers/attackIsValid";
import addNewMessageToDescription from "./helpers/addNewMessageToDescription";

import { GameContent } from "./Styles/game";
import Player from "../factories/PlayerFactory";
import Gameboard from "../factories/GameboardFactory";


// Third screen. Before this all of the objects are made
function GameContainer(props) {


    //const [gameDescription, setGameDescription] = useState('Welcome to the battleship game');
    const [gameDescription, setGameDescription] = useState([' ', ' ', ' ', 'Welcome to the battleship game']);
    const [computersTurn, setComputersTurn] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const humanBoard = props.player[1];
    const humanPlayer = props.player[0];
    const computer = props.enemy[0];
    const computerBoard = props.enemy[1];


    useEffect(()=>{

        setTimeout(()=>{
            humanPlayer.startTurn();
        }, 1500)
    }, [])

    // Whenever gameDescription changes, after 2 seconds change message to show whose turn is it
    useEffect(()=>{
        const changeGameMessage = setTimeout(()=>{
            const latestMessage = gameDescription[gameDescription.length - 1];
            const secondLatestMsg = gameDescription[gameDescription.length - 2];
            if ( gameOver || latestMessage === "It's players turn" || latestMessage === "It's enemy's turn" || latestMessage === 'Human player starts' ) {
                console.log('Not changing messages');
            } else if ( latestMessage === 'Invalid shot, try again!' && secondLatestMsg === "It's players turn" ) {
                console.log('Not changing messages');
            } else {
                const newMessage = humanPlayer.allFiredShots.length <= 0 ? 'Human player starts' : humanPlayer.turn ? "It's players turn" : "It's enemy's turn";
                setGameDescription((prev)=>addNewMessageToDescription(prev, newMessage))
            }

        }, 1800);
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
            }, 3000);
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
                    { gameDescription.map((item, index)=>{
                        const messageClass = index === 3 ? 'latest_msg' : '';
                        return item === ' ' ? <br/> : <p className={ messageClass }>{ item }</p>;
                    }) }
                </div>
                <div className="flex">
                    <GameboardItem gameHandlers={ [setComputersTurn, setGameDescription] } playerGrid={ humanBoard }
                                   gameOver={ [gameOver, setGameOver] } players={ [humanPlayer, computer] }/>
                    <hr className="divider"/>
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