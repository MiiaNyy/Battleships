// allow drop if this is not ship position
function checkIfDropIsAllowed(e, shipPosition) {
    if ( !shipPosition ) {
        e.preventDefault();
    }
}

function handleDragEnter (e, shipPosition) {
    if ( !shipPosition ) { // add hover effect if this is not ship position
        e.target.classList.add('drag-hover');
    }
}

function handleDragLeave (e) {
    e.target.classList.remove('drag-hover'); // remove hover effect
}

function getClonesXPosition(length) {
    switch (length) {
        case 1:
            return 15;
        case 2:
            return 35;
        case 3:
            return 50;
        case 4:
            return 65;
        case 5:
            return 85;
    }
}

export {
    checkIfDropIsAllowed,
    handleDragEnter,
    handleDragLeave,
    getClonesXPosition,
    
}
