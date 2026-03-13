const choices = ["rock", "paper", "scissors"];
const message = document.getElementById("message");
const computerChoiceText = document.getElementById("computer-choice");
const resetButton = document.getElementById("reset");
const countdownElement = document.getElementById("countdown");
const choiceButtons = document.querySelectorAll(".choice");
const exitButton = document.getElementById("exit");

let countdownInterval = null;

function startCountdown() {
  let count = 3;
  countdownElement.textContent = count;
  choiceButtons.forEach(btn => btn.disabled = true);
  resetButton.style.display = "none";

  countdownInterval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownElement.textContent = count;
    } else {
      clearInterval(countdownInterval);
      countdownElement.textContent = "";
      choiceButtons.forEach(btn => btn.disabled = false);
    }
  }, 1000);
}

startCountdown();

choiceButtons.forEach(button => {
  button.addEventListener("click", () => {
    const userChoice = button.id;
    const computerChoice = getComputerChoice();
    const result = determineWinner(userChoice, computerChoice);
    message.textContent = result.message;
    computerChoiceText.textContent = `Computer chose: ${computerChoice}`;
    resetButton.style.display = "inline-block";
  });
});

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return { message: "It's a tie!" };
  }
  if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    return { message: "You win!" };
  } else {
    return { message: "You lose!" };
  }
}

resetButton.addEventListener("click", () => {
  message.textContent = "";
  computerChoiceText.textContent = "";
  startCountdown();
});

document.getElementById("exit").addEventListener("click", () => {
  window.location.href = "../games.html";
});