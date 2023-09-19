// Get HTML elements
const keyboard = document.getElementById('qwerty');
const phraseDisplay = document.getElementById('phrase');
let missedGuesses = 0;


// Hide start button
const startButton = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');



// Array of phrases
const phrases = [
    "This is a sample phrase",
    "Another example here",
    "A third phrase with spaces",
    "Hello World",
    "Coding is fun"
];


// Event listener for the "Start Game" button
startButton.addEventListener('click', () => {
    overlay.style.display = 'none'; // Hide the start overlay
    addPhraseToDisplay(phraseArray);
});


// Function to get a random phrase as an array of characters
const getRandomPhraseAsArray = arr => {
    let randomIndex = Math.floor(Math.random() * arr.length);
    let randomPhrase = arr[randomIndex];
    return randomPhrase.split(''); // Return the selected phrase as an array of characters
};                                 //Split the phrase into an array of characters



//Function to set up the game display
const addPhraseToDisplay = arr => {
    const ul = phrase.querySelector('ul');
    ul.innerHTML = '';


    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        li.textContent = arr[i];

        if (arr[i] !== ' ') {
            li.classList.add('letter'); // Add 'letter' class to letters
        } else {
            li.classList.add('space'); // Add 'space' class to spaces
        }

        ul.appendChild(li);
    }
}

// Get a random phrase and start the game
const phraseArray = getRandomPhraseAsArray(phrases);
console.log(phraseArray);



//Function to check if a letter is in the phrase

const checkLetter = button => {
    const phraseLetters = document.querySelectorAll('.letter') // Store all of the li elements -created in addPhraseToDisplay
    let match = null;

    for (let i = 0; i < phraseLetters.length; i++) {
        if (phraseLetters[i].textContent.toLowerCase() === button.textContent.toLowerCase()) {
            phraseLetters[i].classList.add('show');
            match = button.textContent;
        }
    }

    return match;

}

//Event listener for keyboard clicks

keyboard.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('chosen')) {
        e.target.classList.add('chosen'); // Mark the chosen letter
        e.target.disabled = true; // Disable the clicked button

        const letterGuessed = checkLetter(e.target);

        if (!letterGuessed) {
            const tries = document.querySelectorAll('.tries');
            const lostHeart = document.createElement('img');
            lostHeart.src = 'images/lostHeart.png';
            tries[missedGuesses].innerHTML = '';
            tries[missedGuesses].appendChild(lostHeart);
            missedGuesses++; // Increase missed count and display a lost heart
        }
        checkWin();// Check if the game is won or lost
    }

})

// check if the game has been won or lost
const checkWin = () => {
    const letterElements = document.querySelectorAll('.letter');
    const showElements = document.querySelectorAll('.show');

    if (letterElements.length === showElements.length) {

        overlay.className = 'win';
        overlay.style.display = 'flex';
        overlay.querySelector('.title').textContent = 'Congratulations! You won!';
        startButton.textContent = 'Play Again';


    } else if (missedGuesses <= 5) {
        overlay.className = 'lose';
        overlay.style.display = 'flex';
        overlay.querySelector('.title').textContent = 'Sorry, You Lose. Try Again!';
        startButton.textContent = 'Try Again';
    }
}
















