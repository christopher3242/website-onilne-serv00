const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
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

// Create pairs
let cardsArray = [...cardValues, ...cardValues]; // 20 cards

// Optional: Fill remaining 5 slots with dummy images or leave empty
// Let's assume no extra dummy cards for now, so total 20 cards in a 5x4 grid

let totalPairs = cardValues.length;
let matchedPairsCount = 0;

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;

function shuffle(array) {
    for (let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCardElement(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    
    const img = document.createElement('img');
    img.src = value;
    img.alt = "Memory Card Image";
    
    card.appendChild(img);
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
}

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

function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        updateScore(1); // Increase score for a match
        matchedPairsCount++;
        resetBoard();

        if (matchedPairsCount === totalPairs) {
            displayWinMessage();
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }
}

function updateScore(points) {
    score += points;
    scoreDisplay.textContent = `Score: ${score}`;
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function setupGame() {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    matchedPairsCount = 0;
    winMessage.style.display = 'none';

    // Shuffle the array
    shuffle(cardsArray);
    gameBoard.innerHTML = '';

    // Create cards
    cardsArray.forEach(createCardElement);
}

// Initialize game
setupGame();

document.getElementById('reset-button').addEventListener('click', setupGame);

function displayWinMessage() {
    winMessage.style.display = 'block';
}