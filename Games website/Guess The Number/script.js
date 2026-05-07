let targetNumber;
let rangeSelector = document.getElementById('range');
let guessInput = document.getElementById('guess');
let submitButton = document.getElementById('submit');
let resetButton = document.getElementById('reset');
let answerButton = document.getElementById('answer');
let messageDisplay = document.getElementById('message');
let answerDisplay = document.getElementById('answerDisplay');
let scoreSpan = document.getElementById('score');

let score = 0;

// Function to start a new game
function startGame() {
    const range = parseInt(rangeSelector.value);
    targetNumber = Math.floor(Math.random() * range) + 1;
    messageDisplay.textContent = 'Guess a number between 1 and ' + range;
    guessInput.value = '';
    answerDisplay.style.display = 'none';
}

// Update score display
function updateScore() {
    document.getElementById('score').textContent = score;
}

// Event listener for range change
rangeSelector.addEventListener('change', startGame);

// Submit guess
function handleGuess() {
    const range = parseInt(rangeSelector.value);
    const guess = parseInt(guessInput.value);

    if (isNaN(guess)) {
        messageDisplay.textContent = 'Please enter a valid number.';
        return;
    }

    if (guess < 1 || guess > range) {
        messageDisplay.textContent = 'Your guess is out of range. Try again!';
        return;
    }

    if (guess > targetNumber) {
        messageDisplay.textContent = 'Too high! Try again.';
    } else if (guess < targetNumber) {
        messageDisplay.textContent = 'Too low! Try again.';
    } else {
        messageDisplay.textContent = 'Congratulations! You guessed the number!';
        score += 10;
        updateScore();
        setTimeout(startGame, 2000);
    }
}

// Event listeners
submitButton.addEventListener('click', handleGuess);
resetButton.addEventListener('click', startGame);
answerButton.addEventListener('click', () => {
    answerDisplay.textContent = 'The answer is: ' + targetNumber;
    answerDisplay.style.display = 'block';
    setTimeout(() => {
        answerDisplay.style.display = 'none';
    }, 2000);
});

// Add Enter key to submit
guessInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleGuess();
    }
});

// Initialize game
startGame();
updateScore();