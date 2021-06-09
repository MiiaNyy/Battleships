import addNewMessageToDescription from "./addNewMessageToDescription";

function attackIsValid(gameboard, player, coordinate, setMessage, setGameOver) {
    gameboard.receiveAttack(coordinate);
    setMessage((prev) => addNewMessageToDescription(prev, gameboard.attackInfo.message));
    player.setShots(gameboard.didLatestShotHit, gameboard.infoAboutShipThatGotHit, coordinate);
    setGameOver(() => gameboard.gameOver); // if all of the ships have sunk, game is over
    if ( gameboard.gameOver ) {
        document.querySelector('header').style.filter = "blur(2px) grayscale(80%)";
        document.querySelector('.game-info').style.filter = "blur(2px) grayscale(80%)";
        document.querySelector('.flex').style.filter = "blur(2px) grayscale(80%)";
    }
}

export default attackIsValid;