import React, { useState, useEffect } from "react";
import GameboardItem from "./GameboardItem";
import GameEndedMessages from "./GameEndedMessages";

import attackIsValid from "../game_helpers/attackIsValid";
import addNewMessageToDescription from "../game_helpers/addNewMessageToDescription";

import { GameContent, Flex } from "./Styles/general";
import { Console, Divider } from "./Styles/gameArea"
import { getGridSize } from "../game_helpers/gridSize";

const testi = [' ', ' ', ' ', 'Welcome to the battleship game'];

// Third screen. Before this all of the objects are made
function GameContainer(props) {

    const [gameDescription, setGameDescription] = useState(testi);
    const [computersTurnAttack, setComputersTurnAttack] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const humanBoard = props.player[1];
    const humanPlayer = props.player[0];
    const computer = props.enemy[0];
    const computerBoard = props.enemy[1];

    // Whenever gameDescription changes, after 2 seconds change message to show whose turn is it
    useEffect(()=>{
        if ( !props.blurOn  ) {
            const changeGameMessage = setTimeout(()=>{
                const newMessageIsNeeded = checkIfNewMessageIsNeeded(gameDescription, gameOver);
                if ( newMessageIsNeeded ) {
                    const newMessage = humanPlayer.allFiredShots.length <= 0 ? 'Human player starts' : humanPlayer.turn ? "It's players turn" : "It's enemy's turn";
                    setGameDescription((prev)=>addNewMessageToDescription(prev, newMessage))
                }
            }, 1800);
            return ()=>clearTimeout(changeGameMessage);
        }

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

            <GameContent gameIsOver={ gameOver } blurOn={ props.blurOn }>
                <ConsoleMessages gameDescription={ gameDescription }/>
                <Flex gridSize={ getGridSize(props.gameLevel) }>
                    <GameboardItem gameHandlers={ [setComputersTurnAttack, setGameDescription] }
                                   playerGrid={ humanBoard } gameLevel={ props.gameLevel }
                                   gameOver={ [gameOver, setGameOver] } players={ [humanPlayer, computer] }/>
                    <Divider/>
                    <GameboardItem gameHandlers={ [setComputersTurnAttack, setGameDescription] }
                                   playerGrid={ computerBoard } gameLevel={ props.gameLevel }
                                   gameOver={ [gameOver, setGameOver] } players={ [humanPlayer, computer] }/>

                </Flex>
            </GameContent>
            <GameEndedMessages gameIsOver={ gameOver } computer={ computer }/>
        </>
    )
}

function ConsoleMessages(props) {
    console.log('console re render')
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