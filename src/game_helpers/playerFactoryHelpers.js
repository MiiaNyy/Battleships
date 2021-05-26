function getFirstCharacterFromHint(hint, allShotsHit) {
    let character;
    // If there is more than one hit, compare last and second to last hits for a another hint
    if ( allShotsHit.length >= 2 ) {
        console.log('comparing last hits')
        character = compareLastHitsForHint(allShotsHit);
    }
    // If comparing last hits was unsuccessful, or less than 2 items in hit list, return first character at random
    if ( !character || allShotsHit.length < 2 ) {
        // second argument could be double digit, that's why cannot use .split when changing string to arr
        let hintToArr = [hint.charAt(0), hint.substring(1)];
        character = hintToArr[Math.floor(Math.random() * 2)];
    }
    console.log('character is ' + character)
    return character;
}

function compareLastHitsForHint(allShotsThatHit) {
    // Take second to last and last item from allShotsThatHit and change them to array
    const nextToLastShotHit = allShotsThatHit.slice(-2)[0];
    const lastShotHit = allShotsThatHit.slice(-1)[0];
    for (let i = 0; i < lastShotHit.length; i++) {
        if ( lastShotHit[i] === nextToLastShotHit[i] ) {
            console.log('comparing last hits successful. hint is ' + lastShotHit[i])
            return lastShotHit[i];
        }
    }
}

function getRowCoordinate(hint) {
    // Remove first character (alphabet) and change rest to numbers
    let rowNumber = Number(hint.substring(1));
    // We want number one bigger or one smaller than row number at hint.
    if ( (Math.floor(Math.random() * 2)) !== 0 ) {
        rowNumber--;
        if ( rowNumber <= 0 ) {
            rowNumber = 2;
        }
    } else {
        rowNumber++;
        if ( rowNumber > 10 ) {
            rowNumber = 9;
        }
    }
    return rowNumber;
}

function getColumnCoordinate(hint) {
    const gridColumns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const columnIndex = gridColumns.indexOf(hint[0]);
    let randomNum = Math.floor(Math.random() * 2);
    let index;
    // We need to get one index smaller/bigger index from columns than in hint at random.
    // if random number is not 0 index is greater, if more than 0, index is smaller than column index
    if ( randomNum !== 0 ) {
        index = columnIndex + 1;
        // Fail safe, if index is bigger than length give smaller index
        if ( index >= gridColumns.length ) {
            index = columnIndex - 1;
        }
    } else {
        index = columnIndex - 1;
        if ( index < 0 ) {
            index = columnIndex + 1
        }
    }
    console.log('index is ' + index)
    return gridColumns[index];
}


function isNumeric(num) {
    return !isNaN(num)
}

export {
    getFirstCharacterFromHint,
    getRowCoordinate,
    getColumnCoordinate,
    isNumeric
}