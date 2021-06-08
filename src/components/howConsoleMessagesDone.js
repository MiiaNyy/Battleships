import React, { useState } from "react";
import { Button } from "./Styles/selectingShipsStyles";

function Console() {
    const [messageArr, setMessageArr] = useState(['test0', 'tste', 'gfgf'])
    const [count, setCount] = useState(0);

    return (
        <div className="game-info">
            { messageArr.map((item)=>{
                return <p>{ item }</p>
            }) }
            <Button onClick={ ()=>{
                setCount((prev)=>prev + 1);
                setMessageArr((prev) => {
                    let newArr = [...prev];
                    newArr.shift();
                    newArr.push('testi' + count);
                    return newArr;
                })
            }
            }>Add message</Button>
        </div>
    )
}