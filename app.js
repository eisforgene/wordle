let tileDisplay = document.querySelector('.tile-container');
let keyboard = document.querySelector('.key-container');
let messageDisplay = document.querySelector('.message-container');
let wordle = 'SUPER';


const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '<<',
];

let guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

// create a div
// give it an id which will be guessRow- + guessRowIndex
// then we append the rowElement to the tileDisplay container
guessRows.forEach((guessRow, guessRowIndex) => { // (item, index, arr) = can be named anything, but better to be specific for referencing
    let rowElement = document.createElement('div');
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    // use a forEach for each rowElement
    // create a div, set an id with text content as guessRow- + guessRowIndex + -tile- + guessIndex
    guessRow.forEach((guess, guessIndex) => {
        let tileElement = document.createElement('div');
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex);
        tileElement.setAttribute('class', 'tile');
        rowElement.append(tileElement);
    })
    tileDisplay.append(rowElement);
})

// for each 'key' in the keys variable we create an element called button
// each button has the text of key
// create an id attribute for each key with the same 'key'
// add an event listener to each element/button with handleClick() callback function with key as the argument;
// append the buttonElement to the keyboard container since it is being selected into the key-container div/class
keys.forEach(key => {
    let buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id', key);
    buttonElement.addEventListener('click', () => handleClick(key));
    keyboard.append(buttonElement);
})

let handleClick = (key) => {
    console.log('clicked', key);
    if (key === '<<') {
        deleteLetter();
        console.log('guessRows', guessRows)
        return
    } if (key == 'ENTER') {
        checkRow();
        console.log('guessRows', guessRows)
        return
    }
    console.log('guessRows', guessRows)
    addLetter(key);
}

// grab the tile we want to put the letter in with document.getElementById
// dynamically generate the id for the tile selected
// add callback function into handle click so it initiates as you select a 'key'
// create the text content for the tile variable with the correlating 'key'
// move to next tile by currentTile++
// same as guessRows[0][0] == ["0",'0','0','0','0']
let addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
    let tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
    tile.textContent = letter;
    guessRows[currentRow][currentTile] = letter
    tile.setAttribute('data', letter);
    currentTile++;
    }
}

// create if statement so deleteLetter() only works if currentTile > 0 
// grab the tile container by dynamically generating it and setting it as a variable named 'tile'
// place an empty string inside by tile.textContent
// guessRows[i][i] = ''; empty string
// reset attribute  ('data', ''); 
let deleteLetter = () => {
    if (currentTile > 0 ) {
        currentTile--
        let tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''; 
        guessRows[currentRow][currentTile] = '';
        tile.setAttribute('data', '');
    }
}

// turn guess into string
// only if there are 5 letters
// if the wordle === guess(word), show magnificient
// callback checkRow() in the event listener function

let checkRow = () => {
    let guess = guessRows[currentRow].join(''); 
    
    if (currentTile > 4) {     
        console.log('guess is ' + guess, 'wordle is ' + wordle)
        flipTile();
        if (wordle == guess) {
            showMessage('Magnificient!');
            isGameOver = true;
            return
        } else {
            if (currentRow >= 5) {
                isGameOver = false;
                showMessage('Game Over');
                return
            } 
            if (currentRow < 5) {
                currentRow++;
                currentTile = 0; 
            }
        }
    }
}

let showMessage = (message) => {
    let messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageDisplay.append(messageElement);
    setTimeout(() => messageDisplay.removeChild(messageElement), 2000)
}

let addColorToKey = (dataLetter, color) => {
    let key = document.getElementById(dataLetter)
    console.log(key);
    key.classList.add(color)
}

//childNodes all children of the row
let flipTile = () => {
    let rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    let guess = [];

    rowTiles.forEach(tile => {
        guess.push({ letter: tile.getAttribute('da ta'), color: 'gray-overlay' })
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter, '');
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '');
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 500 * index)
    })
}