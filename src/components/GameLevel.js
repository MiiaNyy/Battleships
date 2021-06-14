import React from 'react';
import { GameContent } from "./Styles/general";


function GameLevel(props) {
    return (
        <GameContent>
            <h2>Select battle you want to play</h2>
            <div className="selecting_levels">
                <div className="col">
                    <div>
                        <div className="col__header">
                            <p>Mediterranean Sea</p>
                        </div>
                        <div className="col__item">
                            <p>5 x 5 gameboard</p>
                            <p>4 ships</p>
                            <ul>
                                <li>1 x Cruiser</li>
                                <li>2 x Submarine</li>
                                <li>1 x Patrol boat</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col__btn">
                        <button>Select</button>
                    </div>

                </div>
                <div className="col">
                    <div>
                        <div className="col__header">
                            <p>Pacific Ocean</p>
                        </div>
                        <div className="col__item">
                            <p>7 x 7 gameboard</p>
                            <p>5 ships</p>
                            <ul>
                                <li>1 x Carrier</li>
                                <li>1 x Cruiser</li>
                                <li>1 x Submarine</li>
                                <li>2 x Patrol boat</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col__btn">
                        <button>Select</button>
                    </div>
                </div>
                <div className="col">
                    <div>
                        <div className="col__header">
                            <p>Battle of the Atlantic</p>
                        </div>
                        <div className="col__item">
                            <p>10 x 10 gameboard</p>
                            <p>9 ships</p>
                            <ul>
                                <li>1 x Carrier</li>
                                <li>1 x Battleship</li>
                                <li>2 x Cruiser< /li>
                                <li>2 x Submarine</li>
                                <li>3 x Patrol boat</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col__btn">
                        <button>Select</button>
                    </div>
                </div>

            </div>
            >


        </GameContent>
    );
}

export default GameLevel;