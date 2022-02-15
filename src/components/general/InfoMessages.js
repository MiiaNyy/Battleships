import React, { useState } from 'react';
import { MessageContainer } from "../styled_components/general";

function InfoMessages({setInfoMessageOpen, children}) {
    const [animationOn, setAnimation] = useState(false);
    const classes = animationOn ? 'toggle-off' : 'toggle-in';

    function closeMessageContainer() {
        setAnimation(()=>true);
        document.querySelector('header').style.filter = "none"
        setTimeout(()=>{
            setInfoMessageOpen(()=>false);
        }, 500)
    }
    
    return (
        <MessageContainer info className={ classes }>
            <div className="close-info-btn__cont">
                <i onClick={ ()=>closeMessageContainer() } className="close-info-btn info-btn fas fa-times"/>
            </div>
            <h3>Info</h3>
            <div>{ children }</div>
        </MessageContainer>
    );
}


export default InfoMessages;
