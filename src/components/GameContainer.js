import React from "react";
import GameboardItem from "./GameboardItem";
import GameDescription from "./GameDescription";

import { GameContent } from "./Styles/game";

// Third screen. Before this all of the objects are made
function GameContainer(props) {


    return (
        <GameContent>
            <GameDescription/>
            <div className="flex">
                <GameboardItem player={ props.player }/>
                <GameboardItem player={ props.enemy }/>
            </div>
        </GameContent>
    )
}

export default GameContainer;
