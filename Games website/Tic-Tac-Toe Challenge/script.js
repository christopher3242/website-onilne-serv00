const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const exitButton = document.getElementById('exitButton');

const modeRadios = document.querySelectorAll('input[name="mode"]');
const difficultyRadios = document.querySelectorAll('input[name="difficulty"]');
const difficultyContainer = document.getElementById('difficulty-container');

let currentPlayer = 'X';
let boardState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;
let gameMode = '2player'; // default mode
let difficulty = 'easy';

const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

// Show/hide difficulty options based on mode
function updateDifficultyVisibility() {
    if (gameMode === 'cpu') {
        difficultyContainer.style.display = 'block';
    } else {
        difficultyContainer.style.display = 'none';
    }
}

// Mode change handler
modeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        gameMode = radio.value;
        updateDifficultyVisibility();
        restartGame();
    });
});

// Difficulty change handler
difficultyRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        difficulty = radio.value;
    });
});

// Initialize difficulty
updateDifficultyVisibility();

function handleCellClick(event) {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);
    if (boardState[index] !== "" || !isGameActive || (gameMode === 'cpu' && currentPlayer === 'O')) {
        return;
    }
    makeMove(cell, index, currentPlayer);
    if (checkResult()) return;

    if (gameMode === 'cpu' && currentPlayer === 'O' && isGameActive) {
        setTimeout(cpuTurn, 500);
    }
}

function makeMove(cell, index, player) {
    boardState[index] = player;
    cell.textContent = player;
}

function checkResult() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            messageElement.textContent = `Player ${boardState[a]} wins!`;
            isGameActive = false;
            return true;
        }
    }
    if (!boardState.includes("")) {
        messageElement.textContent = "It's a draw!";
        isGameActive = false;
        return true;
    }
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    return false;
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

// CPU move with difficulty selection
function cpuTurn() {
    if (!isGameActive) return;

    let moveIndex;

    if (difficulty === 'easy') {
        moveIndex = getRandomMove();
    } else if (difficulty === 'normal') {
        moveIndex = getNormalMove();
    } else if (difficulty === 'hard') {
        moveIndex = getHardMove();
    }

    if (moveIndex !== null) {
        makeMove(cells[moveIndex], moveIndex, 'O');
        if (!checkResult()) {
            currentPlayer = 'X';
        }
    }
}

function getRandomMove() {
    const emptyIndices = boardState.map((val, idx) => val === "" ? idx : null).filter(idx => idx !== null);
    if (emptyIndices.length === 0) return null;
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
}

// Normal difficulty: Minimax with some randomness
function getNormalMove() {
    const bestMove = minimax(boardState, 'O', false);
    if (bestMove.score >= 0) {
        return bestMove.index;
    } else {
        // fallback to random if no good move
        return getRandomMove();
    }
}

// Hard difficulty: Minimax with perfect play
function getHardMove() {
    const bestMove = minimax(boardState, 'O', true);
    return bestMove.index;
}

// Minimax Algorithm
function minimax(newBoard, player, isHard) {
    const availSpots = newBoard.map((val, idx) => val === "" ? idx : null).filter(idx => idx !== null);

    // Check for terminal states
    const winner = checkWin(newBoard);
    if (winner === 'X') {
        return { score: -10 };
    } else if (winner === 'O') {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }

    const moves = [];

    for (const i of availSpots) {
        const move = {};
        move.index = i;
        newBoard[i] = player;

        const result = minimax(newBoard, player === 'O' ? 'X' : 'O', isHard);
        move.score = result.score;

        newBoard[i] = ""; // reset

        moves.push(move);
    }

    let bestMove;

    if (player === 'O') {
        // Maximize
        let bestScore = -Infinity;
        for (const m of moves) {
            if (m.score > bestScore || (isHard && m.score === bestScore && Math.random() < 0.5)) {
                bestScore = m.score;
                bestMove = m;
            }
        }
    } else {
        // Minimize
        let bestScore = Infinity;
        for (const m of moves) {
            if (m.score < bestScore || (isHard && m.score === bestScore && Math.random() < 0.5)) {
                bestScore = m.score;
                bestMove = m;
            }
        }
    }

    return bestMove;
}

function checkWin(boardArr) {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardArr[a] && boardArr[a] === boardArr[b] && boardArr[a] === boardArr[c]) {
            return boardArr[a];
        }
    }
    return null;
}

restartButton.addEventListener('click', restartGame);
exitButton.addEventListener('click', () => window.close());

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});