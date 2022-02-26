let tileDisplay = document.querySelector('.tile-container');
let keyboard = document.querySelector('.key-container');

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

let handleClick = () => {
    console.log('clicked');
}

// for each 'key' in the keys variable we create an element called button
// each button has the text of key
// create an id attribute for each key with the same 'key'
// add an event listener to each element/button with handleClick();
// append the buttonElement to the keyboard container since it is being selected into the key-container div/class
keys.forEach(key => {
    let buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id', key);
    buttonElement.addEventListener('click', handleClick);
    keyboard.append(buttonElement);
})