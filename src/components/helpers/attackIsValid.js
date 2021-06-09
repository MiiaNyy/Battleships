import addNewMessageToDescription from "./addNewMessageToDescription";
import blurTheBackground from "./blurTheBackground";

function attackIsValid(gameboard, player, coordinate, setMessage, setGameOver) {
    gameboard.receiveAttack(coordinate);
    setMessage((prev) => addNewMessageToDescription(prev, gameboard.attackInfo.message));
    player.setShots(gameboard.didLatestShotHit, gameboard.infoAboutShipThatGotHit, coordinate);
    setGameOver(() => gameboard.gameOver); // if all of the ships have sunk, game is over
    if ( gameboard.gameOver ) {
        blurTheBackground(true, "blur(2px) grayscale(20%)")
    }
}

export default attackIsValid;