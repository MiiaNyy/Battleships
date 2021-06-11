import React, { useState, useEffect } from "react";
import GameboardItem from "./GameboardItem";
import GameEndedMessages from "./GameEndedMessages";

import attackIsValid from "../game_helpers/attackIsValid";
import addNewMessageToDescription from "../game_helpers/addNewMessageToDescription";

import { GameContent } from "./Styles/general";
import {Console, Divider} from "./Styles/gameArea"

// Third screen. Before this all of the objects are made
function GameContainer(props) {

    const [gameDescription, setGameDescription] = useState([' ', ' ', ' ', 'Welcome to the battleship game']);
    const [computersTurnAttack, setComputersTurnAttack] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const humanBoard = props.player[1];
    const humanPlayer = props.player[0];
    const computer = props.enemy[0];
    const computerBoard = props.enemy[1];

    // Whenever gameDescription changes, after 2 seconds change message to show whose turn is it
    useEffect(()=>{
        const changeGameMessage = setTimeout(()=>{
            const newMessageIsNeeded = checkIfNewMessageIsNeeded(gameDescription, gameOver);
            if ( newMessageIsNeeded ) {
                const newMessage = humanPlayer.allFiredShots.length <= 0 ? 'Human player starts' : humanPlayer.turn ? "It's players turn" : "It's enemy's turn";
                setGameDescription((prev)=>addNewMessageToDescription(prev, newMessage))
            }
        }, 1800);
        return ()=>clearTimeout(changeGameMessage);
    }, [gameDescription]);

    useEffect(()=>{
        if ( computer.turn && humanPlayer.firstShotFired && !gameOver ) {
            // Take 3 seconds before attacking human board
            const computerTurn = setTimeout(()=>{
                computerShootsEnemy();
                computer.turnOver();
                humanPlayer.startTurn();
                setComputersTurnAttack(false);
            }, 3000);
            return ()=>clearTimeout(computerTurn);
        }
    }, [computersTurnAttack])

    function computerShootsEnemy() {
        computer.shootTheEnemy();
        const coordinate = computer.latestShotCoordinate;
        attackIsValid(humanBoard, computer, coordinate, setGameDescription, setGameOver);
    }

    return (
        <>

            <GameContent>
                <ConsoleMessages gameDescription={ gameDescription }/>
                <div className="flex">
                    <GameboardItem gameHandlers={ [setComputersTurnAttack, setGameDescription] }
                                   playerGrid={ humanBoard }
                                   gameOver={ [gameOver, setGameOver] } players={ [humanPlayer, computer] }/>
                    <Divider/>
                    <GameboardItem gameHandlers={ [setComputersTurnAttack, setGameDescription] }
                                   playerGrid={ computerBoard }
                                   gameOver={ [gameOver, setGameOver] } players={ [humanPlayer, computer] }/>

                </div>
            </GameContent>
            <GameEndedMessages gameIsOver={ gameOver } computer={ computer }/>
        </>
    )
}

function ConsoleMessages(props) {
    return (
        <Console>
            { props.gameDescription.map((item, index)=>{
                const messageClass = index === 3 ? 'latest_msg' : '';
                return item === ' ' ? <br key={ index }/> :
                    <p key={ index } className={ messageClass }>{ item }</p>;
            }) }
        </Console>
    )
}

function checkIfNewMessageIsNeeded(gameDescription, gameOver) {
    const latestMessage = gameDescription[gameDescription.length - 1];
    const secondLatestMsg = gameDescription[gameDescription.length - 2];
    if ( gameOver || latestMessage === "It's players turn" || latestMessage === "It's enemy's turn" || latestMessage === 'Human player starts' ) {
        return false
    } else return !(latestMessage === 'Invalid shot, try again!' && secondLatestMsg === "It's players turn");
}

export default GameContainer;