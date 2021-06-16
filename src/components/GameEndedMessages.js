import React from 'react';
import { MessageContainer } from "./Styles/general";


function GameEndedMessages(props) {
    const computer = props.computer;

    const header = computer.turn ? 'You Win!' : 'You lost!';
    const message = computer.turn ? 'Congratulations, you managed to sunk all of the enemy ships!' : 'Enemy has sunk' +
        ' all of your ships. Game is over!';

    if ( props.gameIsOver ) {
        document.querySelector('header').style.filter = 'blur(2px) grayscale(20%)';
        document.querySelector('.info-btn').style.filter = 'blur(2px) grayscale(20%)';

        return (
            <MessageContainer className="toggle-in">
                <h2>{ header }</h2>
                <p>{ message }</p>
                <button onClick={ ()=>location.reload() }>Play again</button>
            </MessageContainer>
        );
    } else {
        return <></>
    }

}

export default GameEndedMessages;