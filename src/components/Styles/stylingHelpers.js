
function getGridSize(props, media) {
    const size = props.size;
    switch (size) {
        case (5):
            return `repeat(${ size }, 35px)`
        case(7):
            if ( media === 700 || media === 1000 ) {
                return `repeat(${ size }, 35px)` // larger screens
            } else {
                return `repeat(${ size }, 30px)` // smaller screens
            }
        case(10):
            if ( media === 1000 ) {
                return `repeat(${ size }, 35px)`
            } else if ( media === 700 ) {
                return `repeat(${ size }, 30px)`
            } else {
                return `repeat(${ size }, 25px)`
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

function getGridCellFontSize(gameLevel, screenSize) {
    switch (gameLevel) {
        case 'mediterranean':
            return '1.3rem'
        case 'atlantic':
            if ( screenSize === 700 || screenSize === 1000 ) {
                return '1.3rem' // larger screens
            } else {
                return '1.2rem'// smaller screens
            }
        case 'pacific':
            if ( screenSize === 1000 ) {
                return '1.3rem'
            } else if ( screenSize === 700 ) {
                return '1.1rem'
            } else {
                return '1rem'
            }
    }
}

export {
    getGridCellFontSize,
    getGridSize,
    getGridCellCursor,
    getGridCellBackgroundColor
}