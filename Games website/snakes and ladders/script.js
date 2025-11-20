// Define constants
var boardSize = 10; // 10x10 board
var totalCells = boardSize * boardSize;
// Function to generate random snake and ladder positions
function generateSnakesAndLadders() {
    var snakesPositions = {};
    var laddersPositions = {};
    var snakeCount = 6; // number of snakes
    var ladderCount = 6; // number of ladders
    var usedPositions = new Set();
    // Generate snakes
    for (var i = 0; i < snakeCount; i++) {
        var head = void 0, tail = void 0;
        do {
            head = getRandomInt(21, 99); // snakes start from 21 to 99
            tail = getRandomInt(1, head - 1); // tail below head
        } while (usedPositions.has(head) || usedPositions.has(tail));
        usedPositions.add(head);
        usedPositions.add(tail);
        snakesPositions[head] = tail;
    }
    // Generate ladders
    for (var i = 0; i < ladderCount; i++) {
        var start = void 0, end = void 0;
        do {
            start = getRandomInt(1, 80); // ladders start from 1 to 80
            end = getRandomInt(start + 1, 100); // end above start
        } while (usedPositions.has(start) || usedPositions.has(end));
        usedPositions.add(start);
        usedPositions.add(end);
        laddersPositions[start] = end;
    }
    return { snakes: snakesPositions, ladders: laddersPositions };
}
// Utility to get random int between min and max inclusive
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Initialize game with random snakes and ladders
var _a = generateSnakesAndLadders(), snakes = _a.snakes, ladders = _a.ladders;
// Player positions
var playerPositions = [0, 0]; // Player 1 and Player 2
var currentPlayer = 0; // 0 for Player 1, 1 for Player 2
// Get DOM elements
var pos1Span = document.getElementById('pos1');
var pos2Span = document.getElementById('pos2');
var messagePara = document.getElementById('message');
var rollButton = document.getElementById('rollButton');
var restartButton = document.getElementById('restartButton');
var boardDiv = document.getElementById('board');
// Initialize Board
function createBoard() {
    boardDiv.innerHTML = '';
    for (var row = 0; row < boardSize; row++) {
        var rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        for (var col = 0; col < boardSize; col++) {
            var cellNumber = getCellNumber(row, col);
            var cellDiv = document.createElement('div');
            cellDiv.className = 'cell';
            cellDiv.id = "cell-".concat(cellNumber);
            cellDiv.innerText = cellNumber.toString();
            // Color for snakes and ladders
            if (snakes[cellNumber]) {
                cellDiv.classList.add('snake');
            }
            else if (ladders[cellNumber]) {
                cellDiv.classList.add('ladder');
            }
            rowDiv.appendChild(cellDiv);
        }
        boardDiv.appendChild(rowDiv);
    }
    renderPlayers();
}
// Helper to get cell number based on row and column (snaking pattern)
function getCellNumber(row, col) {
    var base = (boardSize - 1 - row) * boardSize;
    if (row % 2 === 0) {
        return base + col + 1;
    }
    else {
        return base + (boardSize - col);
    }
}
function renderPlayers() {
    // Remove previous player markers
    document.querySelectorAll('.player').forEach(function (p) { return p.remove(); });
    playerPositions.forEach(function (pos, index) {
        if (pos > 0 && pos <= 100) {
            var cell = document.getElementById("cell-".concat(pos));
            if (cell) {
                var playerDiv = document.createElement('div');
                playerDiv.className = 'player';
                // Assign specific class based on player
                if (index === 0) {
                    playerDiv.classList.add('player-p1'); // P1 yellow
                    playerDiv.innerText = 'P1';
                }
                else {
                    playerDiv.classList.add('player-p2'); // P2 blue
                    playerDiv.innerText = 'P2';
                }
                cell.appendChild(playerDiv);
            }
        }
    });
}
// Handle dice roll
function rollDice() {
    var dice = Math.floor(Math.random() * 6) + 1;
    messagePara.innerText = "Player ".concat(currentPlayer + 1, " rolled a ").concat(dice);
    var newPos = playerPositions[currentPlayer] + dice;
    if (newPos > 100) {
        newPos = playerPositions[currentPlayer]; // Can't move beyond 100
    }
    else {
        // Check for snakes or ladders
        if (snakes[newPos]) {
            newPos = snakes[newPos];
            messagePara.innerText += " - Snake! Slide down to ".concat(newPos);
        }
        else if (ladders[newPos]) {
            newPos = ladders[newPos];
            messagePara.innerText += " - Ladder! Climb up to ".concat(newPos);
        }
    }
    playerPositions[currentPlayer] = newPos;
    updatePositions();
    if (newPos === 100) {
        messagePara.innerText = "Player ".concat(currentPlayer + 1, " wins!");
        rollButton.disabled = true;
    }
    else {
        // Switch turns
        currentPlayer = (currentPlayer + 1) % 2;
    }
}
// Update position display
function updatePositions() {
    pos1Span.innerText = playerPositions[0].toString();
    pos2Span.innerText = playerPositions[1].toString();
    renderPlayers();
}
// Restart game
function restartGame() {
    playerPositions = [0, 0];
    currentPlayer = 0;
    messagePara.innerText = '';
    rollButton.disabled = false;
    createBoard();
    updatePositions();
}
// Event Listeners
rollButton.addEventListener('click', rollDice);
restartButton.addEventListener('click', restartGame);
// Initialize game
createBoard();
