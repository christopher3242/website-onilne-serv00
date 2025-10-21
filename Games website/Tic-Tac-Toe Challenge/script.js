const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const exitButton = document.getElementById('exitButton');

const modeRadios = document.querySelectorAll('input[name="mode"]');

let currentPlayer = 'X';
let boardState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;
let gameMode = '2player'; // default mode

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle mode change
modeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        gameMode = radio.value;
        restartGame();
    });
});

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (boardState[cellIndex] !== "" || !isGameActive || (gameMode === 'cpu' && currentPlayer === 'O')) {
        return;
    }

    makeMove(cell, cellIndex, currentPlayer);

    checkResult();

    // If single player mode and game still active, CPU plays
    if (gameMode === 'cpu' && currentPlayer === 'O' && isGameActive) {
        setTimeout(cpuMove, 500);
    }
}

function makeMove(cell, index, player) {
    boardState[index] = player;
    cell.textContent = player;
}

function checkResult() {
    let roundWon = false;

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageElement.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (!boardState.includes("")) {
        messageElement.textContent = "It's a draw!";
        isGameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function cpuMove() {
    if (!isGameActive) return;

    // Simple CPU: choose a random empty cell
    const emptyCells = Array.from(cells).filter((cell, index) => boardState[index] === "");
    if (emptyCells.length === 0) return;

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const index = Array.from(cells).indexOf(randomCell);
    makeMove(randomCell, index, 'O');

    checkResult();

    // Switch back to player if game continues
    if (isGameActive) {
        currentPlayer = 'X';
    }
}

function restartGame() {
    currentPlayer = 'X';
    boardState = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    messageElement.textContent = "";

    cells.forEach(cell => {
        cell.textContent = "";
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
exitButton.addEventListener('click', () => window.close());