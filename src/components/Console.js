import React from "react";

function Console({gameDescription}) {
    return (
        <div className="console">
            { gameDescription.map((item, index)=>{
                const messageClass = index === 3 ? 'latest_msg' : '';
                return item === ' ' ? <br key={ index }/> :
                    <p key={ index } className={ messageClass }>{ item }</p>;
            }) }
        </div>
    )
}

export default Console;
