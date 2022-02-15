import InfoMessages from "../general/InfoMessages";
import React from "react";

function ShipPositionInfoMessages ({infoOpen, setInfoOpen}) {
    if ( infoOpen ) {
        return (
            <InfoMessages setInfoMessageOpen={ setInfoOpen }>
                <ul>
                    <li>You can place the ships on the board by clicking the ship, and dragging it over the
                        gameboard and
                        dropping it to the desired location.
                    </li>
                    <li>Change ships rotation by clicking 'change rotation' button and start dragging ships on
                        the
                        board
                    </li>
                    <li>After you have positioned your ships, start button appears and you can start the game.
                    </li>
                </ul>
            </InfoMessages>
        )
    } else {
        return <></>
    }
}

export default ShipPositionInfoMessages;
