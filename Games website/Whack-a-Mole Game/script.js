const scoreDisplay = document.getElementById('score');
const topScoreDisplay = document.getElementById('topScore');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startButton');
const endBtn = document.getElementById('endButton');

const holes = Array.from(document.querySelectorAll('.hole'));

let lastHole = null;
let gameInterval;
let countdownInterval;
let popTimeout;
let score = 0;
let topScore = localStorage.getItem('whackAMoleTopScore') || 0;
let gameTime = 60; // seconds
let timeRemaining = gameTime;
let gameActive = false;

// Initialize top score display
topScoreDisplay.textContent = `Top Score: ${topScore}`;

// Function to get a random hole that is not same as last
function randomHole() {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole();
  }
  lastHole = hole;
  return hole;
}

// Show mole in a random hole
function showMole() {
  if (!gameActive) return;
  const hole = randomHole();

  const mole = document.createElement('div');
  mole.classList.add('mole');
  mole.textContent = '🐹'; // optional: add emoji or image

  // Add click event
  mole.addEventListener('click', () => {
    if (!mole.isHit) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      mole.isHit = true; // prevent multiple clicks
      mole.remove();
    }
  });

  hole.appendChild(mole);

  // Remove mole after random time
  const stayDuration = Math.random() * 700 + 800; // 800ms to 1500ms
  setTimeout(() => {
    if (mole.parentNode) {
      mole.remove();
    }
    if (gameActive) {
      showMole();
    }
  }, stayDuration);
}

// Start the game
function startGame() {
  if (gameActive) return;
  gameActive = true;
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  timeRemaining = gameTime;
  timerDisplay.textContent = `Time: ${timeRemaining}s`;
  startBtn.disabled = true;
  endBtn.disabled = false;

  // Start showing moles
  showMole();

  // Start countdown
  countdownInterval = setInterval(() => {
    timeRemaining--;
    timerDisplay.textContent = `Time: ${timeRemaining}s`;
    if (timeRemaining <= 0) {
      endGame();
    }
  }, 1000);
}

// End the game
function endGame() {
  if (!gameActive) return;
  gameActive = false;
  clearInterval(countdownInterval);
  // Remove any remaining moles
  document.querySelectorAll('.mole').forEach(m => m.remove());

  // Update top score if needed
  if (score > topScore) {
    topScore = score;
    localStorage.setItem('whackAMoleTopScore', topScore);
    topScoreDisplay.textContent = `Top Score: ${topScore}`;
  }

  alert(`Game Over!\nYour score: ${score}`);

  startBtn.disabled = false;
  endBtn.disabled = true;
}

// Event listeners
startBtn.addEventListener('click', startGame);
endBtn.addEventListener('click', endGame);