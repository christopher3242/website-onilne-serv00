let countdown; // interval ID
let totalSeconds = 0; // total seconds
let remainingSeconds = 0; // remaining seconds during countdown
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const totalTimeDisplay = document.getElementById('totalTimeDisplay');

const inputHours = document.getElementById('inputHours');
const inputMinutes = document.getElementById('inputMinutes');
const inputSeconds = document.getElementById('inputSeconds');

const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const stopButton = document.getElementById('stopButton');
const message = document.getElementById('message');
const alarmSound = document.getElementById('alarmSound');
const exitButton = document.getElementById('exitButton');

let isCountingDown = false;

// Helper function to update total time display
function updateTotalTimeDisplay(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  totalTimeDisplay.textContent = `Total: ${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Start button event
startButton.addEventListener('click', () => {
  const hours = parseInt(inputHours.value) || 0;
  const minutes = parseInt(inputMinutes.value) || 0;
  const seconds = parseInt(inputSeconds.value) || 0;
  totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (totalSeconds > 0 && !isCountingDown) {
    remainingSeconds = totalSeconds;
    startCountdown(remainingSeconds);
    startButton.disabled = true;
    pauseButton.classList.remove('hidden');
    stopButton.classList.remove('hidden');
    message.classList.add('hidden');
    updateTotalTimeDisplay(totalSeconds);
  }
});

// Pause button event
pauseButton.addEventListener('click', () => {
  clearInterval(countdown);
  isCountingDown = false;
  startButton.disabled = false;
  pauseButton.classList.add('hidden');
});

// Stop button event
stopButton.addEventListener('click', () => {
  clearInterval(countdown);
  isCountingDown = false;
  remainingSeconds = 0;
  // Reset display
  hoursDisplay.textContent = '00';
  minutesDisplay.textContent = '00';
  secondsDisplay.textContent = '00';
  totalTimeDisplay.textContent = 'Total: 00:00:00';
  // Clear inputs
  inputHours.value = '';
  inputMinutes.value = '';
  inputSeconds.value = '';
  // Hide message
  message.classList.add('hidden');
  // Reset buttons
  startButton.disabled = false;
  pauseButton.classList.add('hidden');
  stopButton.classList.add('hidden');
  // Stop alarm sound
  alarmSound.pause();
  alarmSound.currentTime = 0;
});

// Exit button event
exitButton.addEventListener('click', () => {
  window.location.href = "../../your%20favorite.html"; // adjust URL as needed
});

// Function to start countdown
function startCountdown(seconds) {
  isCountingDown = true;
  countdown = setInterval(() => {
    // Update display
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    hoursDisplay.textContent = String(hrs).padStart(2, '0');
    minutesDisplay.textContent = String(mins).padStart(2, '0');
    secondsDisplay.textContent = String(secs).padStart(2, '0');

    if (seconds <= 0) {
      clearInterval(countdown);
      message.classList.remove('hidden');
      alarmSound.play();
      // Keep alarm looping as per 'loop' attribute
      pauseButton.classList.add('hidden');
      stopButton.classList.remove('hidden');
    }

    seconds--;
  }, 1000);
}