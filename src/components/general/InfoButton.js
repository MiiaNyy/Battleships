import React from 'react';

function InfoButton({ setInfoOpen}) {
    return (
        <div className="info-btn__container">
            <i className="info-btn far fa-question-circle" onClick={ ()=>{
                setInfoOpen(()=>true);
                document.querySelector('header').style.filter = "blur(2px) grayscale(20%)"
            } }/>
        </div>
    );
}

export default InfoButton;
