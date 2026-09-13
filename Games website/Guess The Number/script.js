// JavaScript code

const rangeSelect = document.getElementById('range');
const difficultySelect = document.getElementById('difficulty');
const guessInput = document.getElementById('guess');
const submitBtn = document.getElementById('submit');
const resetBtn = document.getElementById('reset');
const showAnswerBtn = document.getElementById('showAnswer');
const messageDiv = document.getElementById('message');
const answerDiv = document.getElementById('answerDisplay');
const scoreSpan = document.getElementById('score');
const highScoreSpan = document.getElementById('highScore');
const comboSpan = document.getElementById('combo');
const timeLeftSpan = document.getElementById('timeLeft');
const timerDiv = document.querySelector('.timer');

let targetNumber = 0;
let maxRange = parseInt(rangeSelect.value);
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let combo = 0;
let countdown = null;
let timeRemaining = 60;
let gameActive = true;

// Initialize game
function initGame() {
    maxRange = parseInt(rangeSelect.value);
    targetNumber = Math.floor(Math.random() * maxRange) + 1;
    messageDiv.textContent = `Guess a number between 1 and ${maxRange}`;
    guessInput.value = '';
    answerDiv.style.display = 'none';
    answerDiv.textContent = '';
    resetTimer();
    startTimer();
    gameActive = true;
    removePulseAnimation();
}

function updateScores() {
    scoreSpan.textContent = score;
    highScoreSpan.textContent = highScore;
    comboSpan.textContent = combo;
}

function resetTimer() {
    clearInterval(countdown);
    switch (difficultySelect.value) {
        case 'easy':
            timeRemaining = 60;
            break;
        case 'medium':
            timeRemaining = 30;
            break;
        case 'hard':
            timeRemaining = 15;
            break;
        default:
            timeRemaining = 60;
    }
    timeLeftSpan.textContent = timeRemaining;
}

function startTimer() {
    countdown = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            timeLeftSpan.textContent = timeRemaining;
            if (timeRemaining <= 5) {
                addPulseAnimation();
            }
        } else {
            clearInterval(countdown);
            gameActive = false;
            showMessage('⏰ Time\'s up! You lost this round.');
            // Reset combo on timeout
            combo = 0;
            updateScores();
        }
    }, 1000);
}

function addPulseAnimation() {
    timerDiv.classList.add('animate-pulse');
}
function removePulseAnimation() {
    timerDiv.classList.remove('animate-pulse');
}

function handleGuess() {
    if (!gameActive) {
        showMessage('Game over! Reset to play again.');
        return;
    }
    const guess = parseInt(guessInput.value);
    if (isNaN(guess)) {
        showMessage('Please enter a valid number.');
        return;
    }
    if (guess < 1 || guess > maxRange) {
        showMessage(`Guess out of range! Enter between 1 and ${maxRange}.`);
        return;
    }

    if (guess === targetNumber) {
        showMessage('🎉 Correct! You guessed the number!');
        // Increase combo
        combo += 1;
        // Increase score exponentially based on combo
        score += 10 * combo;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
        }
        updateScores();
        clearInterval(countdown);
        gameActive = false;
        removePulseAnimation();
        setTimeout(initGame, 2000);
    } else {
        showMessage('Too high! Try again.');
        // Reset combo on wrong guess
        combo = 0;
        updateScores();
    }
}

function showMessage(msg) {
    messageDiv.textContent = msg;
}

function revealAnswer() {
    answerDiv.textContent = 'The answer is: ' + targetNumber;
    answerDiv.style.display = 'block';
    setTimeout(() => {
        answerDiv.style.display = 'none';
    }, 3000);
}

rangeSelect.addEventListener('change', () => {
    clearInterval(countdown);
    initGame();
});
difficultySelect.addEventListener('change', () => {
    clearInterval(countdown);
    if (gameActive) startTimer();
});
submitBtn.addEventListener('click', handleGuess);
resetBtn.addEventListener('click', () => {
    clearInterval(countdown);
    initGame();
});
showAnswerBtn.addEventListener('click', revealAnswer);
guessInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleGuess();
    }
});

// Start game on load
window.onload = () => {
    initGame();
    updateScores();
};