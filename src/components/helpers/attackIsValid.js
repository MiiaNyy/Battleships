function attackIsValid(gameboard, player, setMessage, coordinate) {
    gameboard.receiveAttack(coordinate);
    setMessage(()=>gameboard.attackInfo.message);
    player.setShots(gameboard.didLatestShotHit, gameboard.latestHitShipName, coordinate);
}

export default attackIsValid;