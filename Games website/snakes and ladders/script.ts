// Define constants
const boardSize = 10; // 10x10 board
const totalCells = boardSize * boardSize;

// Function to generate random snake and ladder positions
function generateSnakesAndLadders() {
  const snakesPositions: Record<number, number> = {};
  const laddersPositions: Record<number, number> = {};

  const snakeCount = 6; // number of snakes
  const ladderCount = 6; // number of ladders

  const usedPositions = new Set<number>();

  // Generate snakes
  for (let i = 0; i < snakeCount; i++) {
    let head, tail;
    do {
      head = getRandomInt(21, 99); // snakes start from 21 to 99
      tail = getRandomInt(1, head - 1); // tail below head
    } while (usedPositions.has(head) || usedPositions.has(tail));
    usedPositions.add(head);
    usedPositions.add(tail);
    snakesPositions[head] = tail;
  }

  // Generate ladders
  for (let i = 0; i < ladderCount; i++) {
    let start, end;
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
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize game with random snakes and ladders
let { snakes, ladders } = generateSnakesAndLadders();

// Player positions
let playerPositions = [0, 0]; // Player 1 and Player 2
let currentPlayer = 0; // 0 for Player 1, 1 for Player 2

// Get DOM elements
const pos1Span = document.getElementById('pos1') as HTMLSpanElement;
const pos2Span = document.getElementById('pos2') as HTMLSpanElement;
const messagePara = document.getElementById('message') as HTMLParagraphElement;
const rollButton = document.getElementById('rollButton') as HTMLButtonElement;
const restartButton = document.getElementById('restartButton') as HTMLButtonElement;
const boardDiv = document.getElementById('board') as HTMLDivElement;

// Initialize Board
function createBoard() {
  boardDiv.innerHTML = '';

  for (let row = 0; row < boardSize; row++) {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row';

    for (let col = 0; col < boardSize; col++) {
      const cellNumber = getCellNumber(row, col);
      const cellDiv = document.createElement('div');
      cellDiv.className = 'cell';
      cellDiv.id = `cell-${cellNumber}`;
      cellDiv.innerText = cellNumber.toString();

      // Color for snakes and ladders
      if (snakes[cellNumber]) {
        cellDiv.classList.add('snake');
      } else if (ladders[cellNumber]) {
        cellDiv.classList.add('ladder');
      }

      rowDiv.appendChild(cellDiv);
    }
    boardDiv.appendChild(rowDiv);
  }
  renderPlayers();
}

// Helper to get cell number based on row and column (snaking pattern)
function getCellNumber(row: number, col: number): number {
  const base = (boardSize - 1 - row) * boardSize;
  if (row % 2 === 0) {
    return base + col + 1;
  } else {
    return base + (boardSize - col);
  }
}

function renderPlayers() {
  // Remove previous player markers
  document.querySelectorAll('.player').forEach(p => p.remove());

  playerPositions.forEach((pos, index) => {
    if (pos > 0 && pos <= 100) {
      const cell = document.getElementById(`cell-${pos}`);
      if (cell) {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player';

        // Assign specific class based on player
        if (index === 0) {
          playerDiv.classList.add('player-p1'); // P1 yellow
          playerDiv.innerText = 'P1';
        } else {
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
  const dice = Math.floor(Math.random() * 6) + 1;
  messagePara.innerText = `Player ${currentPlayer + 1} rolled a ${dice}`;

  let newPos = playerPositions[currentPlayer] + dice;
  if (newPos > 100) {
    newPos = playerPositions[currentPlayer]; // Can't move beyond 100
  } else {
    // Check for snakes or ladders
    if (snakes[newPos]) {
      newPos = snakes[newPos];
      messagePara.innerText += ` - Snake! Slide down to ${newPos}`;
    } else if (ladders[newPos]) {
      newPos = ladders[newPos];
      messagePara.innerText += ` - Ladder! Climb up to ${newPos}`;
    }
  }

  playerPositions[currentPlayer] = newPos;
  updatePositions();

  if (newPos === 100) {
    messagePara.innerText = `Player ${currentPlayer + 1} wins!`;
    rollButton.disabled = true;
  } else {
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