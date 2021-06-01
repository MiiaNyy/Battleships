import React from 'react';
import { MessageContainer } from "./Styles/game";


function GameEndedMessages(props) {
    const computer = props.computer;

    const header = computer.turn ? 'You Win!' : 'You lost!';
    const message = computer.turn ? 'Congratulations, you managed to sunk all of the enemy ships!' : 'Enemy has sunk' +
        ' all of your ships. Game is over!';

    if ( props.gameIsOver ) {
        return (
            <MessageContainer>
                <h2>{ header }</h2>
                <p>{ message }</p>
                <button onClick={() => location.reload()}>Play again</button>
            </MessageContainer>
        );
    } else {
        return <></>
    }

}

export default GameEndedMessages;