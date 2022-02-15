import React, { useEffect, useRef, useState } from "react";
import GameboardItem from "./GameboardItem";
import GameEndedMessages from "./GameEndedMessages";

import attackIsValid from "../../game_helpers/attackIsValid";
import addNewMessageToDescription from "../../game_helpers/addNewMessageToDescription";
import checkIfNewMessageIsNeeded from "../component_helpers/checkIfNewMessageIsNeeded";

import { Main } from "../styled_components/general";

import InfoMessages from "../general/InfoMessages";
import InfoButton from "../general/InfoButton";
import Console from "./Console";

function GameContainer (props) {
    const gameLevel = props.gameLevel;
    
    const humanBoard = props.player[1];
    const humanPlayer = props.player[0];
    const computer = props.enemy[0];
    const computerBoard = props.enemy[1];
    
    // Info that shows in the console
    const [gameDescription, setGameDescription] = useState([' ', ' ', ' ', 'Welcome to the battleship game']);
    const [computersTurnAttack, setComputersTurnAttack] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    
    const currentGameLevel = useRef(gameLevel);
    
    useEffect(() => {
        humanPlayer.setGameLevel = currentGameLevel.current;
        computer.setGameLevel = currentGameLevel.current;
        computerBoard.setGameLevel = currentGameLevel.current;
        computerBoard.placeAllShipsOnBoard();
    }, [])
    
    // Whenever gameDescription changes, after 2 seconds change message to show whose turn is it
    useEffect(() => {
        const changeGameMessage = setTimeout(() => {
            const newMessageIsNeeded = checkIfNewMessageIsNeeded(gameDescription, gameOver);
            if ( newMessageIsNeeded ) {
                const newMessage = humanPlayer.allFiredShots.length <= 0 ? 'Human player starts' : humanPlayer.turn ? "It's players turn" : "It's enemy's turn";
                setGameDescription((prev) => addNewMessageToDescription(prev, newMessage))
            }
        }, 1500);
        return () => clearTimeout(changeGameMessage);
    }, [gameDescription]);
    
    
    useEffect(() => {
        if ( computer.turn && humanPlayer.firstShotFired && !gameOver ) {
            if ( !infoOpen ) {
                computerShootsEnemy();
                computer.turnOver();
                humanPlayer.startTurn();
                setComputersTurnAttack(false);
            }
        }
    }, [computersTurnAttack, infoOpen])
    
    function computerShootsEnemy () {
        computer.shootTheEnemy();
        const coordinate = computer.latestShotCoordinate;
        attackIsValid(humanBoard, computer, coordinate, setGameDescription, setGameOver);
    }
    
    function playNextLevel () {
        props.playNextLevel();
        setGameOver(() => false);
    }
    
    function playCurrentLevelAgain () {
        props.restartLevel();
        setGameOver(() => false);
    }
    
    return (
        <>
            <Main gameIsOver={ gameOver } blurOn={ infoOpen }>
                <Console gameDescription={ gameDescription }/>
                <div className="gameboard-container">
                    <GameboardItem gameHandlers={ [setComputersTurnAttack, setGameDescription] } infoOpen={ infoOpen }
                                   playerGrid={ computerBoard } gameLevel={ gameLevel }
                                   gameOver={ [gameOver, setGameOver] } players={ [humanPlayer, computer] }/>
                    <hr className="divider"/>
                    <GameboardItem gameHandlers={ [setComputersTurnAttack, setGameDescription] } infoOpen={ infoOpen }
                                   playerGrid={ humanBoard } gameLevel={ gameLevel }
                                   gameOver={ [gameOver, setGameOver] } players={ [humanPlayer, computer] }/>
                </div>
            </Main>
            <GameEndedMessages playCurrentLevelAgain={ playCurrentLevelAgain } playNextLevel={ playNextLevel }
                               gameLevel={ gameLevel } gameIsOver={ gameOver } computer={ computer }/>
            <InfoButton setInfoOpen={ setInfoOpen }/>
            
            { infoOpen ?
                <InfoMessages setInfoMessageOpen={ setInfoOpen }>
                    <ul>
                        <li>You can shoot the enemy by clicking enemy's board.</li>
                        <li>Try to find all of enemy's ships and sunk them before enemy finds yours.</li>
                        <li>In the console, above game boards, you find latest developments in the game</li>
                    </ul>
                </InfoMessages> : <></> }
        </>
    )
}

export default GameContainer;
