function checkIfNewMessageIsNeeded(gameDescription, gameOver) {
    const latestMessage = gameDescription[gameDescription.length - 1];
    const secondLatestMsg = gameDescription[gameDescription.length - 2];
    if ( gameOver || latestMessage === "It's players turn" || latestMessage === "It's enemy's turn" || latestMessage === 'Human player starts' ) {
        return false
    } else return !(latestMessage === 'Invalid shot, try again!' && secondLatestMsg === "It's players turn");
}

export default checkIfNewMessageIsNeeded;
