const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const showAnswerButton = document.getElementById('show-answer');
const scoreDisplay = document.getElementById('score-display');
const winMessage = document.getElementById('win-message');

let cardValues = [
  'image1.png',
  'image2.png',
  'image3.png',
  'image4.png',
  'image5.png',
  'image6.png',
  'image7.png',
  'image8.png',
  'image9.png',
  'image10.png',
];

let cardsArray = [...cardValues, ...cardValues]; // create pairs
let totalPairs = cardValues.length;
let matchedPairsCount = 0;

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;

// Shuffle array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Create card element
function createCardElement(value) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.value = value;

  const img = document.createElement('img');
  img.src = value;
  img.alt = 'Memory Card Image';

  card.appendChild(img);
  card.addEventListener('click', flipCard);
  gameBoard.appendChild(card);
}

// Flip card handler
function flipCard() {
  if (lockBoard || this === firstCard || this.classList.contains('matched')) return;

  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    lockBoard = true;

    checkForMatch();
  }
}

// Check for match
function checkForMatch() {
  if (firstCard.dataset.value === secondCard.dataset.value) {
    // Match found
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    updateScore(1);
    matchedPairsCount++;
    resetBoard();

    if (matchedPairsCount === totalPairs) {
      displayWinMessage();
    }
  } else {
    // Wait 2 seconds before flipping back
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetBoard();
    }, 2000);
  }
}

// Update score
function updateScore(points) {
  score += points;
  scoreDisplay.textContent = `Score: ${score}`;
}

// Reset selection
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Setup game
function setupGame() {
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  matchedPairsCount = 0;
  winMessage.style.display = 'none';

  // Shuffle and create cards
  shuffle(cardsArray);
  gameBoard.innerHTML = '';
  cardsArray.forEach(createCardElement);
}

// Show answer: reveal all cards temporarily
function showAnswer() {
  document.querySelectorAll('.card').forEach(card => {
    if (!card.classList.contains('matched')) {
      card.classList.add('flipped');
    }
  });
  // Hide after 2 seconds
  setTimeout(() => {
    document.querySelectorAll('.card').forEach(card => {
      if (!card.classList.contains('matched')) {
        card.classList.remove('flipped');
      }
    });
  }, 2000);
}

// Display win message
function displayWinMessage() {
  winMessage.style.display = 'block';
}

// Event listeners
resetButton.addEventListener('click', setupGame);
showAnswerButton.addEventListener('click', showAnswer);

// Initialize game
setupGame();