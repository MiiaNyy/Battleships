
// Gets right grid size depending on game level and screen size
function getGridSize(props, media) {
    const size = props.size;
    switch (size) {
        case (5): // Mediterranean grid
            return `repeat(${ size }, 35px)`
        case(7): // Atlantic
            if ( !media ) {
                return `repeat(${ size }, 30px)` // smaller screens
            } else {
                return `repeat(${ size }, 35px)` // min-width 400px >
            }
        case(10): // Pacific
            if ( media === 800 ) {
                return `repeat(${ size }, 35px)` // min-width 800px
            } else if ( media === 400 ) {
                return `repeat(${ size }, 30px)` // min-width 400px
            } else {
                return `repeat(${ size }, 25px)` // smaller screens
            }
    }
}

function getGridCellFontSize(gameLevel, screenSize) {
    switch (gameLevel) {
        case 'mediterranean':
            return '1.3rem'
        case 'atlantic':
            if ( !screenSize ) {
                return '1.2rem'// smaller screens
            } else {
                return '1.3rem' // larger screens
            }
        case 'pacific':
            if ( screenSize === 800 ) {
                return '1.3rem'
            } else if ( screenSize === 400 ) {
                return '1.2rem'
            } else {
                return '1rem'
            }
    }
}

function getGridCellCursor(props) {
    if ( props.infoOpen ) {
        return 'default'
    }
    if ( (props.hitPosition && props.enemy) || (props.shipSunk && props.enemy) ) {
        return "not-allowed"
    } else if ( props.enemy ) {
        return "crosshair"
    } else if ( props.dragAndDrop ) {
        return 'default';
    } else {
        return "not-allowed"
    }
}

function getGridCellBackgroundColor(props) {
    if ( props.shipSunk ) {
        return '#ff4b4b';
    } else if ( props.hitPosition && props.hitMarker === '💥' ) {
        return "#6d737d";
    } else if ( !props.enemy && props.shipPosition) {
        return "#929293";
    } else {
        return "#cad9e5";
    }
}


export {
    getGridCellFontSize,
    getGridSize,
    getGridCellCursor,
    getGridCellBackgroundColor,
}
