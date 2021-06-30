import React from 'react';
import { ButtonWrapper, MessageContainer } from "./Styles/general";

function GameEndedMessages(props) {
    const computer = props.computer;
    const gameLevel = props.gameLevel;

    const header = computer.turn ? 'You Win!' : 'You lost!';
    const message = computer.turn ? 'Congratulations, you managed to sunk all of the enemy ships!' : 'Enemy has sunk' +
        ' all of your ships. Game is over!';

    function playNextLevel() {
        props.playNextLevel();
        props.setGameOver(()=>false);
    }

    function playCurrentLevelAgain() {
        props.restartLevel();
        props.setGameOver(()=>false);
    }

    if ( props.gameIsOver ) {
        document.querySelector('header').style.filter = 'blur(2px) grayscale(20%)';
        document.querySelector('.info-btn').style.filter = 'blur(2px) grayscale(20%)';

        return (
            <MessageContainer className="toggle-in">
                <h2>{ header }</h2>
                <p>{ message }</p>
                <ButtonWrapper>
                    <button onClick={ ()=>location.reload() }><i className="fas fa-home"/> Home</button>
                    <button onClick={ ()=>playCurrentLevelAgain() }>Play again</button>
                    { gameLevel !== 'pacific' ?
                        <button onClick={ ()=>playNextLevel() }>Next <i className="fas fa-arrow-right"/>
                        </button> : <></> }
                </ButtonWrapper>
            </MessageContainer>
        );
    } else {
        return <></>
    }

}


export default GameEndedMessages;