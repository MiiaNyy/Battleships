import React from 'react';
import { GameContent } from "./Styles/general";
import { ButtonSecondary, Container, ColumnHeader, ColumnText } from "./Styles/selectingLevels";


function SelectGameLevel(props) {

    function setLevel(level) {
        props.setGameLevelTo(()=>level);
        props.setLevelSelected(()=>true);
    }

    return (
        <GameContent blurOn={ props.blurOn }>
            <div className="blur">
                <h2 className="subtitle">Select battle you want to play</h2>
                <Container>
                    <div className="col">
                        <div>
                            <ColumnHeader>Mediterranean</ColumnHeader>
                            <ColumnText>
                                <p>5 x 5 gameboard</p>
                                <p>4 ships</p>
                                <ul>
                                    <li>1 x Cruiser</li>
                                    <li>2 x Submarine</li>
                                    <li>1 x Patrol boat</li>
                                </ul>
                            </ColumnText>
                        </div>
                        <div className="col__btn">
                            <ButtonSecondary easy onClick={ ()=>setLevel('mediterranean') }>Select</ButtonSecondary>
                        </div>

                    </div>
                    <div className="col">
                        <div>
                            <ColumnHeader>Atlantic</ColumnHeader>
                            <ColumnText>
                                <p>7 x 7 gameboard</p>
                                <p>5 ships</p>
                                <ul>
                                    <li>1 x Carrier</li>
                                    <li>1 x Cruiser</li>
                                    <li>1 x Submarine</li>
                                    <li>2 x Patrol boat</li>
                                </ul>
                            </ColumnText>
                        </div>
                        <div className="col__btn">
                            <ButtonSecondary medium onClick={ ()=>setLevel('atlantic') }>Select</ButtonSecondary>
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <ColumnHeader>Pacific</ColumnHeader>
                            <ColumnText>
                                <p>10 x 10 gameboard</p>
                                <p>9 ships</p>
                                <ul>
                                    <li>1 x Carrier</li>
                                    <li>1 x Battleship</li>
                                    <li>2 x Cruiser< /li>
                                    <li>2 x Submarine</li>
                                    <li>3 x Patrol boat</li>
                                </ul>
                            </ColumnText>
                        </div>
                        <div className="col__btn">
                            <ButtonSecondary hard onClick={ ()=>setLevel('pacific') }>Select</ButtonSecondary>
                        </div>
                    </div>
                </Container>
            </div>
        </GameContent>
    );
}

export default SelectGameLevel;