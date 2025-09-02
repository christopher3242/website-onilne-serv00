let deck = [];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let isGameActive = false;

const suits = ['♥', '♦', '♣', '♠'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Create a new deck
function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push(`${value}${suit}`);
        }
    }
    deck = shuffle(deck);
}

// Shuffle the deck
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Deal a card
function dealCard() {
    return deck.pop();
}

// Start a new game
function startGame() {
    createDeck();
    playerHand = [dealCard(), dealCard()];
    dealerHand = [dealCard(), dealCard()];
    playerScore = calculateScore(playerHand);
    dealerScore = calculateScore(dealerHand);
    isGameActive = true;

    document.getElementById('hit').disabled = false;
    document.getElementById('stand').disabled = false;
    updateDisplay();
}

// Calculate score for a hand
function calculateScore(hand) {
    let score = 0;
    let aceCount = 0;
    for (let card of hand) {
        const cardValue = card.slice(0, -1); // Get the value part (remove the suit)
        if (values.includes(cardValue)) {
            if (cardValue === 'A') {
                aceCount++;
                score += 11; // Initially treat Ace as 11
            } else if (['K', 'Q', 'J'].includes(cardValue)) {
                score += 10;
            } else {
                score += parseInt(cardValue);
            }
        }
    }
    // Adjust for Aces
    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }
    return score;
}

// Hit (take another card)
function hit() {
    if (isGameActive) {
        playerHand.push(dealCard());
        playerScore = calculateScore(playerHand);
        updateDisplay();
        if (playerScore > 21) {
            isGameActive = false;
            document.getElementById('hit').disabled = true;
            document.getElementById('stand').disabled = true;
            alert("Bust! You lose.");
        }
    }
}

// Stand (end player's turn)
function stand() {
    if (isGameActive) {
        while (dealerScore < 17) {
            dealerHand.push(dealCard());
            dealerScore = calculateScore(dealerHand);
        }
        isGameActive = false;
        document.getElementById('hit').disabled = true;
        document.getElementById('stand').disabled = true;
        updateDisplay();
        determineWinner();
    }
}

// Determine the winner
function determineWinner() {
    if (dealerScore > 21) {
        alert("Dealer busts! You win!");
    } else if (playerScore > dealerScore) {
        alert("You win!");
    } else if (playerScore < dealerScore) {
        alert("Dealer wins.");
    } else {
        alert("It's a tie!");
    }
}

// Update the display
function updateDisplay() {
    document.getElementById('player-hand').innerText = `Player's Hand: ${playerHand.join(', ')}`;
    document.getElementById('player-score').innerText = `Score: ${playerScore}`;
    document.getElementById('dealer-hand').innerText = `Dealer's Hand: ${dealerHand.join(', ')}`;
    document.getElementById('dealer-score').innerText = `Score: ${dealerScore}`;
}

// Event listeners for the buttons
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('hit').addEventListener('click', hit);
document.getElementById('stand').addEventListener('click', stand);
document.getElementById('exit-game').addEventListener('click', function() {
});