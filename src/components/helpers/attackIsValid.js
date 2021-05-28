function attackIsValid(gameboard, player, setMessage, coordinate) {
    gameboard.receiveAttack(coordinate);
    setMessage(()=>gameboard.attackInfo.message);
    player.setShots(gameboard.didLatestShotHit, coordinate);
}

export default attackIsValid;