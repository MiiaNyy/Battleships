import React, { useRef, useState } from 'react';
import { MessageContainer } from "../styled_components/general";
import useOutsideClick from "../../game_helpers/useOutsideClick";


function InfoMessages({setInfoMessageOpen, children}) {
    const [animationOn, setAnimation] = useState(false);
    const classes = animationOn ? 'toggle-off' : 'toggle-in';
    const ref = useRef();

    function closeMessageContainer() {
        setAnimation(()=>true);
        document.querySelector('header').style.filter = "none"
        setTimeout(()=>{
            setInfoMessageOpen(()=>false);
        }, 500)
    }

    useOutsideClick(ref, ()=>{
        closeMessageContainer();
    });

    return (
        <MessageContainer ref={ ref } info className={ classes }>
            <div className="close-info-btn__cont">
                <i onClick={ ()=>closeMessageContainer() } className="close-info-btn info-btn fas fa-times"/>
            </div>
            <h3>Info</h3>
            <div>{ children }</div>
        </MessageContainer>
    );
}


export default InfoMessages;
