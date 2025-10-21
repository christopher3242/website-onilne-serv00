const rows = 6;
const columns = 7;
let board = Array.from({ length: rows }, () => Array(columns).fill(null));
let currentPlayer = 'red'; // Human player
let isGameActive = true;

const boardElement = document.getElementById('board');
const restartButton = document.getElementById('restart');
const exitButton = document.getElementById('exit');

// Create the initial board
function createBoard() {
  boardElement.innerHTML = '';
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      boardElement.appendChild(cell);
    }
  }
}

// Handle human move
function handleCellClick(event) {
  const col = parseInt(event.target.dataset.col);
  if (!isGameActive || board[0][col] !== null) return; // Column full or game over

  // Drop piece
  for (let row = rows - 1; row >= 0; row--) {
    if (board[row][col] === null) {
      placePiece(row, col, currentPlayer);
      if (checkWinner(row, col)) {
        alert(`${capitalize(currentPlayer)} wins!`);
        isGameActive = false;
      } else {
        currentPlayer = 'yellow'; // AI turn
        setTimeout(aiMove, 500);
      }
      break;
    }
  }
}

// Place a piece on the board
function placePiece(row, col, player) {
  board[row][col] = player;
  const index = row * columns + col;
  const cell = boardElement.children[index];
  cell.classList.add(player);
}

// AI move
function aiMove() {
  if (!isGameActive) return;

  // Simple AI: random available column
  const availableCols = [];
  for (let c = 0; c < columns; c++) {
    if (board[0][c] === null) availableCols.push(c);
  }
  if (availableCols.length === 0) return; // Draw

  const col = availableCols[Math.floor(Math.random() * availableCols.length)];
  for (let row = rows - 1; row >= 0; row--) {
    if (board[row][col] === null) {
      placePiece(row, col, currentPlayer);
      if (checkWinner(row, col)) {
        alert(`${capitalize(currentPlayer)} wins!`);
        isGameActive = false;
      } else {
        currentPlayer = 'red'; // Human turn
      }
      break;
    }
  }
}

// Check for a winner
function checkWinner(row, col) {
  const player = board[row][col];
  if (!player) return false;

  return (
    checkDirection(row, col, 1, 0, player) || // Horizontal
    checkDirection(row, col, 0, 1, player) || // Vertical
    checkDirection(row, col, 1, 1, player) || // Diagonal /
    checkDirection(row, col, 1, -1, player)   // Diagonal \
  );
}

// Check in a specific direction
function checkDirection(row, col, deltaRow, deltaCol, player) {
  let count = 1;

  // Check forward
  let r = row + deltaRow;
  let c = col + deltaCol;
  while (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === player) {
    count++;
    r += deltaRow;
    c += deltaCol;
  }

  // Check backward
  r = row - deltaRow;
  c = col - deltaCol;
  while (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === player) {
    count++;
    r -= deltaRow;
    c -= deltaCol;
  }

  return count >= 4;
}

// Capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Restart game
restartButton.addEventListener('click', () => {
  board = Array.from({ length: rows }, () => Array(columns).fill(null));
  currentPlayer = 'red';
  isGameActive = true;
  createBoard();
});

// Initialize the game
createBoard();

boardElement.addEventListener('click', (event) => {
  if (event.target.classList.contains('cell') && currentPlayer === 'red') {
    handleCellClick(event);
  }
});