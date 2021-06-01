import React from 'react';
import { GameboardGrid, Cell, GameContent, Sidebar } from "./Styles/game";
import { getGridCellIds } from "./helpers/gameboardItemHelpers";
import ShipMenu from "./ShipMenu";

function SelectShipLocations(props) {
    const cellIds = getGridCellIds();
    const humanPlayer = props.humanPlayer[0];
    const humanBoard = props.humanPlayer[1];

    const computer = props.computerPlayer[0];
    const computerBoard = props.computerPlayer[1];


    return (

        <GameContent>
            <div className="flex">
                <div className="flex">
                    <Sidebar>
                        <ShipMenu/>
                    </Sidebar>

                    <div className="select__grid">
                        { cellIds.map((cell)=>{
                            return <Cell key={ cell } id={ cell }/>
                        }) }
                    </div>
                </div>

            </div>
        </GameContent>


    );
}

export default SelectShipLocations;