function blurTheBackground(gameHasStarted, filterMode) {
    document.querySelector('header').style.filter = filterMode;
    document.querySelector('.flex').style.filter = filterMode;
    //document.querySelector('.info-btn__container').style.filter = filterMode;
    if ( gameHasStarted ) {
        document.querySelector('.game-info').style.filter = filterMode;
    } else {
        document.querySelector('.container').style.filter = filterMode;
    }
}

export default blurTheBackground;