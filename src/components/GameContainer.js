import React, { useState, useEffect, useRef } from "react";
import GameboardItem from "./GameboardItem";
import GameEndedMessages from "./GameEndedMessages";

import attackIsValid from "../game_helpers/attackIsValid";
import addNewMessageToDescription from "../game_helpers/addNewMessageToDescription";

import { GameContent, Flex} from "./Styles/general";
import { Console, Divider } from "./Styles/gameArea"
import { getGridSize } from "../game_helpers/gridSize";
import InfoMessages from "./InfoMessages";
import InfoButton from "./InfoButton";

function GameContainer(props) {
    const [gameDescription, setGameDescription] = useState([' ', ' ', ' ', 'Welcome to the battleship game']);
    const [computersTurnAttack, setComputersTurnAttack] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);

    const currentGameLevel = useRef(props.gameLevel);

    const humanBoard = props.player[1];
    const humanPlayer = props.player[0];
    const computer = props.enemy[0];
    const computerBoard = props.enemy[1];

    useEffect(()=>{
        humanPlayer.setGameLevel = currentGameLevel.current;
        computer.setGameLevel = currentGameLevel.current;
        computerBoard.setGameLevel = currentGameLevel.current;
        computerBoard.placeAllShipsOnBoard();
    }, [])

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
            if ( !infoOpen ) {
                computerShootsEnemy();
                computer.turnOver();
                humanPlayer.startTurn();
                setComputersTurnAttack(false);
            }
        }
    }, [computersTurnAttack, infoOpen])

    function computerShootsEnemy() {
        computer.shootTheEnemy();
        const coordinate = computer.latestShotCoordinate;
        attackIsValid(humanBoard, computer, coordinate, setGameDescription, setGameOver);
    }

    return (
        <>
            <InfoButton setInfoOpen={ setInfoOpen } infoOpen={ infoOpen }/>
            <GameContent gameIsOver={ gameOver } blurOn={ infoOpen }>
                <ConsoleMessages gameDescription={ gameDescription }/>
                <Flex gridSize={ getGridSize(props.gameLevel) }>
                    <GameboardItem gameHandlers={ [setComputersTurnAttack, setGameDescription] } infoOpen={ infoOpen }
                                   playerGrid={ humanBoard } gameLevel={ props.gameLevel }
                                   gameOver={ [gameOver, setGameOver] } players={ [humanPlayer, computer] }/>
                    <Divider/>
                    <GameboardItem gameHandlers={ [setComputersTurnAttack, setGameDescription] } infoOpen={ infoOpen }
                                   playerGrid={ computerBoard } gameLevel={ props.gameLevel }
                                   gameOver={ [gameOver, setGameOver] } players={ [humanPlayer, computer] }/>

                </Flex>
            </GameContent>
            <GameEndedMessages restartLevel={ props.restartLevel } playNextLevel={ props.playNextLevel }
                               gameLevel={ props.gameLevel }
                               gameIsOver={ gameOver } setGameOver={ setGameOver } computer={ computer }/>
            { infoOpen ?
                <InfoMessages setInfoMessageOpen={ setInfoOpen }>
                    <ul>
                        <li>You can shoot the enemy by clicking enemy's board.</li>
                        <li>Try to find all of enemy's ships and sunk them before enemy finds yours.</li>
                        <li>In the console, above game boards, you find latest developments in the game</li>
                        <li>Specs tells you how many shots you have fired to the enemy board, how many shot has hit or
                            missed and how many have you received.
                        </li>
                    </ul>
                </InfoMessages> : <></> }
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