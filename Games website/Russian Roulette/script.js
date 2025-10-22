const triggerButton = document.getElementById('triggerButton');
const resetButton = document.getElementById('resetButton');
const exitButton = document.getElementById('exitButton');
const spinButton = document.getElementById('spinButton');
const selectedChamberInput = document.getElementById('selectedChamber');
const resultDiv = document.getElementById('result');

let bulletPosition = -1; // Indicates that there is no bullet until the cylinder is spun

// Function to spin the cylinder and randomly place the bullet
function spinCylinder() {
    bulletPosition = Math.floor(Math.random() * 6) + 1; // 1 to 6
    const chancePercentage = Math.floor((1 / 6) * 100); // Always 16.67%
    resultDiv.textContent = `The cylinder has been spun! Chance of hitting: ${chancePercentage}% at chamber ${bulletPosition}.`;
    
    // Clear message after 1 second
    setTimeout(() => { resultDiv.textContent = ""; }, 1000);
}

// Pull the trigger to see if you survive
triggerButton.addEventListener('click', () => {
    const selectedChamber = parseInt(selectedChamberInput.value); // Get selected chamber (1-6)

    if (bulletPosition === -1) {
        resultDiv.textContent = "Please spin the cylinder first!";
        return;
    }

    if (isNaN(selectedChamber) || selectedChamber < 1 || selectedChamber > 6) {
        resultDiv.textContent = "Please choose a chamber between 1 and 6.";
        return;
    }

    // Check if the selected chamber matches the bullet position
    if (selectedChamber === bulletPosition) {
        resultDiv.textContent = "BANG! You're out!";
    } else {
        resultDiv.textContent = "Click! You're safe!";
    }

    // Clear message after 1 second
    setTimeout(() => { resultDiv.textContent = ""; }, 1000);
});

// Reset game
resetButton.addEventListener('click', () => {
    bulletPosition = -1;
    resultDiv.textContent = '';
    selectedChamberInput.value = '';
});

// Exit
exitButton.addEventListener('click', () => {
    window.location.href = "../games.html"; // Or use window.close() if appropriate
});

// Spin cylinder
spinButton.addEventListener('click', spinCylinder);