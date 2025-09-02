let targetNumber;
let rangeSelector = document.getElementById('range');
let guessInput = document.getElementById('guess');
let submitButton = document.getElementById('submit');
let resetButton = document.getElementById('reset');
let answerButton = document.getElementById('answer');
let messageDisplay = document.getElementById('message');
let answerDisplay = document.getElementById('answerDisplay');

// Function to start a new game
function startGame() {
    let range = parseInt(rangeSelector.value);
    targetNumber = Math.floor(Math.random() * range) + 1;
    messageDisplay.textContent = 'Guess a number between 1 and ' + range;
    guessInput.value = ''; // Clear the guess input
    answerDisplay.style.display = 'none'; // Hide answer display
}

// Event listener for the range selection
rangeSelector.addEventListener('change', startGame);

// Event listener for the submit button
submitButton.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);
    
    if (isNaN(guess)) {
        messageDisplay.textContent = 'Please enter a valid number.';
        return;
    }

    if (guess < 1 || guess > parseInt(rangeSelector.value)) {
        messageDisplay.textContent = 'Your guess is out of range. Try again!';
    } else if (guess > targetNumber) {
        messageDisplay.textContent = 'Too high! Try again.';
    } else if (guess < targetNumber) {
        messageDisplay.textContent = 'Too low! Try again.';
    } else {
        messageDisplay.textContent = 'Congratulations! You guessed the number!';
        setTimeout(() => startGame(), 2000); // Restart game after 2 seconds if guessed correctly
    }
});

// Event listener for the reset button
resetButton.addEventListener('click', startGame);

// Event listener for the answer button
answerButton.addEventListener('click', function() {
    answerDisplay.textContent = 'The answer is: ' + targetNumber;
    answerDisplay.style.display = 'block';
    
    // Hide the answer after 2 seconds
    setTimeout(() => {
        answerDisplay.style.display = 'none';
    }, 2000);
});

// Start the game initially
startGame();