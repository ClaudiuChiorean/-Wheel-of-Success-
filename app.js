const keyboard = document.getElementById('qwerty');
const phraseDisplay = document.getElementById('phrase');
const startButton = document.querySelector('.btn__reset');


/*Create a missed variable, initialized to 0, that you’ll use later to keep track of the
number of guesses the player has missed (remember, if the player guesses
  wrong 5 times, they lose the game) */

let missedGuesses = 0;


//Create an array named phrases.
const phrases = [
  "This is a sample phrase",
  "Another example here",
  "A third phrase with spaces",
  "Hello World",
  "Coding is fun"
];




//Attach an event listener to the “Start Game” button to hide the start
startButton.addEventListener('click', () => {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none';
})


// Create a getRandomPhraseAsArray function.
// Purpose: Purpose: This function returns a random phrase from the phrases array as an array of characters.


function getRandomPhraseAsArray(phrasesArray) {
  // Create a variable to store a random number based on the array length
  let randomIndex = Math.floor(Math.random() * phrasesArray.length);

  // Use the randomIndex to select a phrase from the array
  let randomPhrase = phrasesArray[randomIndex];

  // Return the selected phrase as an array of characters
  return randomPhrase.split('');// Split the phrase into an array of characters
}

const randomPhraseArray = getRandomPhraseAsArray(phrases);
console.log(randomPhraseArray);

/* Create an addPhraseToDisplay function that loops through an array of
characters. You will need to write it so that it can take any array of letters and add
it to the display.*/

function addPhraseToDisplay(phraseArray) {
  // Select the UL element where the phrase will be displayed
  const phraseList = document.querySelector('#phrase ul');

  // Loop through the characters in the array
  for (let i = 0; i < phraseArray.length; i++) {
    let li = document.createElement('li');
    li.textContent = phraseArray[i];


    // Check if the character is a letter or a space and add the appropriate class
    if (phraseArray[i] !== ' ') {
      li.className = 'letter';
    } else {
      li.className = 'space';
    }

    // Append the list item to the UL element
    phraseList.appendChild(li);
  }

}



// Create an addPhraseToDisplay function that loops through an array of characters

function checkLetter(button) {
  const phraseLetters = document.querySelectorAll('.letter');
  let match = null;
  for (let i = 0; i < phraseLetters.length; i++) {
   
    if (button.textContent.toLowerCase() === phraseLetters[i].textContent.toLowerCase()) {
      phraseLetters[i].classList.add('show');
      match = button.textContent;
    }
  }
  return match;
}



addPhraseToDisplay(randomPhraseArray);


//removeHeartImage function

function removeHeartImage() {
  let scoreboard = document.getElementById('scoreboard');
  let heartImage = scoreboard.querySelectorAll('img[src="images/liveHeart.png"]');
  if (heartImage.length > 0) {
    let firstHeartImage = heartImage[0];
    firstHeartImage.parentNode.remove();
  }

}

// incrementMissedCounter function

function incrementMissedCounter() {
  missedGuesses += 1;

}

// Add an event listener to the keyboard

qwerty.addEventListener('click', (e) => {
  

 // Check if the click happened on a button element and if it doesn't have the "chosen" class
  if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('chosen')) {
    // Add the "chosen" class to the clicked button
    e.target.classList.add('chosen');

// Call the checkLetter function and store the result in a variable
    const letterFound = checkLetter(e.target);

// Check if the letterFound is null (no match found in the phrase)
    if (!letterFound) {
      const tries = document.querySelectorAll('.tries');
      tries[missedGuesses].firstElementChild.src = 'images/lostHeart.png';
      missedGuesses++;
      checkWin();
    }
  }
  
})

// checkWin function

function checkWin() {
  const letterElements = document.querySelectorAll('.letter');
  const showElements = document.querySelectorAll('.show');

  //Check if the length of the 2 variables are the same. If they are, display the win overlay

  if (letterElements.length === showElements.lenght) {
   // Create the win overlay by adding the “win” class to the start overlay.
      const overlay = document.getElementsByClassName('start');
      overlay.classList.add('win');

     // Change the headline text of the start overlay to show a person won.
      overlay.document.getElementsByClassName('title').textContent = 'Congratulations! You won!';
     //Change the display property of the overlay to “flex”
     overlay.style.display = 'flex';

    // Check if the missed counter is greater than 4. If they are, display the lose overlay
    if (missedGuesses >= 5) {
      overlay.classList.add('lose');
      overlay.document.getElementsByClassName('title').textContent = 'Sorry, you lost. Try again!';
      overlay.style.display = 'flex';
    }

  }

}




