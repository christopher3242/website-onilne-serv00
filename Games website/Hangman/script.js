// Variables
let selectedWord = '';
let guessedLetters = [];
let tries = 10; // default tries

// Elements
const wordElement = document.getElementById('word');
const messageElement = document.getElementById('message');
const letterInput = document.getElementById('letterInput');
const guessButton = document.getElementById('guessButton');
const answerButton = document.getElementById('answerButton');
const restartButton = document.getElementById('restartButton');
const wordSelect = document.getElementById('wordSelect');
const startButton = document.getElementById('startButton');
const hangmanElement = document.getElementById('hangman');
const triesLeftElement = document.getElementById('triesLeft');
const answerDisplay = document.getElementById('answerDisplay');
const inputWrapper = document.querySelector('.input-button-wrapper');

// List of words
const words = [
  'javascript', 'hangman', 'coding', 'developer', 'programming',
  'html', 'css', 'skull', 'bozo', 'funny', 'awesome', 'challenge', 'diddy'
];

// Start game
function startGame() {
  selectedWord = wordSelect.value;
  if (!selectedWord) {
    messageElement.innerText = 'Please select a word to start!';
    return;
  }
  // Hide selection UI
  wordSelect.style.display = 'none';
  startButton.style.display = 'none';

  // Show guess input
  inputWrapper.style.display = 'flex';

  // Reset game state
  guessedLetters = [];
  tries = 10;
  updateWordDisplay();
  messageElement.innerText = '';
  restartButton.style.display = 'none';
  answerButton.style.display = 'block';
  answerDisplay.style.display = 'none';

  updateTries();
  updateHangman();
}

// Display guessed word
function updateWordDisplay() {
  const displayWord = selectedWord.split('').map(l => (guessedLetters.includes(l) ? l : '_')).join(' ');
  wordElement.innerText = displayWord;
}

// Guess handler
function guessLetter() {
  const letter = letterInput.value.toLowerCase();
  letterInput.value = '';
  if (!letter || guessedLetters.includes(letter)) return;

  guessedLetters.push(letter);

  if (!selectedWord.includes(letter)) {
    tries--;
    updateTries();
    if (tries === 0) {
      messageElement.innerText = `Game over! The word was "${selectedWord}".`;
      endGame();
    }
  } else {
    if (selectedWord.split('').every(l => guessedLetters.includes(l))) {
      messageElement.innerText = '🎉 Congrats! You guessed the word!';
      endGame();
    }
  }

  updateWordDisplay();
  updateHangman();
}

// Update hangman emoji based on remaining tries
function updateHangman() {
  const stages = [
    '😃', // 10
    '🙂', // 9
    '😐', // 8
    '😕', // 7
    '🙁', // 6
    '☹️', // 5
    '😫', // 4
    '😩', // 3
    '😖', // 2
    '😵', // 1
    '💀'  // 0
  ];
  const index = Math.max(0, tries);
  hangmanElement.innerText = stages[index];
}

// Update tries display
function updateTries() {
  triesLeftElement.innerText = `${tries} 🥳 tries left`;
}

// Show answer
function showAnswer() {
  answerDisplay.innerText = `The word was: "${selectedWord}"`;
  answerDisplay.style.display = 'block';

  setTimeout(() => {
    answerDisplay.style.display = 'none';
  }, 3000);
}

// End game
function endGame() {
  inputWrapper.style.display = 'none';
  answerButton.style.display = 'none';
  restartButton.style.display = 'block';
}

// Restart
restartButton.addEventListener('click', () => {
  // Reset UI
  wordSelect.value = '';
  wordSelect.style.display = 'block';
  startButton.style.display = 'block';

  // Hide game UI
  inputWrapper.style.display = 'none';
  restartButton.style.display = 'none';
  messageElement.innerText = '';
  hangmanElement.innerText = '';
  triesLeftElement.innerText = '';
  answerDisplay.style.display = 'none';
});

// Event listeners
startButton.addEventListener('click', startGame);
guessButton.addEventListener('click', guessLetter);
document.getElementById('letterInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') guessLetter();
});
answerButton.addEventListener('click', showAnswer);