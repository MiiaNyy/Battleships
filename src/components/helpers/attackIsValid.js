function attackIsValid(gameboard, player, setMessage, coordinate) {
    gameboard.receiveAttack(coordinate);
    setMessage(()=>gameboard.attackInfo.message);
    player.setShots(gameboard.attackInfo.shotHit, coordinate);
}

export default attackIsValid;