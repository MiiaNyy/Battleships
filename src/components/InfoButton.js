import React from 'react';
import { InfoBtnContainer } from "./Styles/general";


function InfoButton({infoOpen, setInfoOpen}) {
    return (
        <InfoBtnContainer blurOn={ infoOpen }>
            <i className="info-btn far fa-question-circle" onClick={ ()=>{
                setInfoOpen(()=>true);
                document.querySelector('header').style.filter = "blur(2px) grayscale(20%)"
            } }/>
        </InfoBtnContainer>
    );
}

export default InfoButton;