import addNewMessageToConsole from "./addNewMessageToConsole";

function attackIsValid(gameboard, player, coordinate, setMessage, setGameOver) {
    gameboard.receiveAttack(coordinate);
    setMessage((prev) => addNewMessageToConsole(prev, gameboard.attackInfo.message));
    player.setShots(gameboard.didLatestShotHit, gameboard.infoAboutShipThatGotHit, coordinate);
    setGameOver(() => gameboard.gameOver); // if all of the ships have sunk, game is over

}

export default attackIsValid;
