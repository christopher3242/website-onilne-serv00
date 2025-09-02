let selectedWord = '';
let guessedLetters = [];
let tries = 6;

const wordElement = document.getElementById('word');
const messageElement = document.getElementById('message');
const letterInput = document.getElementById('letterInput');
const guessButton = document.getElementById('guessButton');
const answerButton = document.getElementById('answerButton');
const restartButton = document.getElementById('restartButton');
const exitButton = document.getElementById('exitButton');
const wordSelect = document.getElementById('wordSelect');
const startButton = document.getElementById('startButton');
const hangmanElement = document.getElementById('hangman');
const triesLeftElement = document.getElementById('triesLeft');
const answerDisplay = document.getElementById('answerDisplay');
const inputButtonWrapper = document.querySelector('.input-button-wrapper');

function startGame() {
    selectedWord = wordSelect.value; 
    if (!selectedWord) {
        messageElement.innerText = 'Please select a word to start the game.';
        return;
    }

    // Hide the dropdown and start button
    wordSelect.style.display = 'none';
    startButton.style.display = 'none';

    // Show the input fields for guessing
    inputButtonWrapper.style.display = 'block';  // Show the guess input elements

    guessedLetters = [];
    tries = 6;
    updateWordDisplay();
    messageElement.innerText = '';
    restartButton.style.display = 'none';
    answerButton.style.display = 'block';
    triesLeftElement.innerText = `${tries} tries left`;
    answerDisplay.style.display = 'none';
    updateHangman();
}

function updateWordDisplay() {
    const wordDisplay = selectedWord.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
    wordElement.innerText = wordDisplay;
}

function guessLetter() {
    const letter = letterInput.value.toLowerCase();
    letterInput.value = '';
    
    if (letter && !guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        if (!selectedWord.includes(letter)) {
            tries--;
            if (tries === 0) {
                messageElement.innerText = `Game over! The word was "${selectedWord}".`;
                restartButton.style.display = 'block';
                answerButton.style.display = 'none';
                inputButtonWrapper.style.display = 'none'; // Hide inputs when game over
            }
        }
    }

    updateWordDisplay();
    updateHangman();
}

function updateHangman() {
    const stageImages = [
        '😊',  // Initial state
        '😨',  // After 1 wrong guess
        '😩',  // After 2 wrong guesses
        '😖',  // After 3 wrong guesses
        '😫',  // After 4 wrong guesses
        '😱',  // After 5 wrong guesses
        '💀'   // After 6 wrong guesses: game over
    ];

    hangmanElement.innerText = stageImages[6 - tries]; // Display the hangman stage based on tries
    triesLeftElement.innerText = `${tries} tries left`;

    // Check if the player has won
    if (selectedWord.split('').every(letter => guessedLetters.includes(letter))) {
        messageElement.innerText = 'Congratulations! You guessed the word!';
        restartButton.style.display = 'block';
        answerButton.style.display = 'none';
        inputButtonWrapper.style.display = 'none'; // Hide inputs when game is won
    }
}

function showAnswer() {
    answerDisplay.innerText = `The word was: "${selectedWord}"`;
    answerDisplay.style.display = 'block';
    
    setTimeout(() => {
        answerDisplay.style.display = 'none';
    }, 2000); 
}

guessButton.addEventListener('click', guessLetter);
answerButton.addEventListener('click', showAnswer);
restartButton.addEventListener('click', () => {
    // Reset the game state
    wordSelect.value = '';  // Reset the selection
    wordSelect.style.display = 'block';  // Show the dropdown again
    startButton.style.display = 'block';  // Show the start button again
    inputButtonWrapper.style.display = 'none'; // Hide inputs again
    restartButton.style.display = 'none';  // Hide the restart button
    hangmanElement.innerText = '';  // Clear hangman display
    messageElement.innerText = '';  // Clear message
    answerDisplay.style.display = 'none';  // Hide answer display
});
startButton.addEventListener('click', startGame);

window.onload = function() {
    // Optional auto-start functionality can be added if needed.
};