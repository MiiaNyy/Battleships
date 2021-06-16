import React, { useRef, useState } from 'react';
import { MessageContainer } from "./Styles/general";
import useOutsideClick from "../game_helpers/useOutsideClick";


function InfoMessages(props) {
    const [animationOn, setAnimation] = useState(false);
    const classes = animationOn ? 'toggle-off' : 'toggle-in';
    const ref = useRef();

    function closeMessageContainer() {
        setAnimation(()=>true)
        setTimeout(()=>{
            props.setInfoMessageOpen(()=>false);
        }, 500)
    }

    useOutsideClick(ref, ()=>{
        closeMessageContainer();
    });

    return (
        <MessageContainer ref={ ref } info className={ classes }>
            <div className="info-btn__container">
                <i onClick={ ()=>closeMessageContainer() } className="close-info-btn info-btn fas fa-times"/>
            </div>
            <h3>Info</h3>
            <Messages gameHasStarted={ props.gameHasStarted } levelSelected={ props.levelSelected }/>
        </MessageContainer>
    );
}

function Messages(props) {
    if ( !props.levelSelected ) {
        return (
            <ul>
                <li>Clicking the select button, you can select different game levels/ battles you want to play</li>
                <li>Levels differ in the number of ships and the size of the game board</li>
            </ul>
        )
    } else if ( props.levelSelected && !props.gameHasStarted ) {
        return (
            <ul>
                <li>You can shoot the enemy by clicking enemy's board.</li>
                <li>Try to find all of enemy's ships and sunk them before enemy finds yours.</li>
                <li>In the console, above gameboards, you find latest developments in the game</li>
                <li>Specs tells you how many shots you have fired to the enemy board, how many shot has hit or
                    missed
                    and how many have you received.
                </li>
            </ul>
        )
    } else if ( props.levelSelected && props.gameHasStarted ) {
        return (
            <ul>
                <li>You can place the ships on the board by clicking the ship, and dragging it over the
                    gameboard and
                    dropping it to the desired location.
                </li>
                <li>Change ships rotation by clicking 'change rotation' button and start dragging ships on the
                    board
                </li>
                <li>After you have positioned your ships, start button appears and you can start the game.</li>
            </ul>
        )
    }

}

export default InfoMessages;