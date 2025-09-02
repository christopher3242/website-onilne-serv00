const triggerButton = document.getElementById('triggerButton');
const resetButton = document.getElementById('resetButton');
const exitButton = document.getElementById('exitButton');
const spinButton = document.getElementById('spinButton');
const selectedChamberInput = document.getElementById('selectedChamber');
const resultDiv = document.getElementById('result');

let bulletPosition = -1; // Indicates that there is no bullet until the cylinder is spun

// Function to spin the cylinder and randomly place the bullet
function spinCylinder() {
    bulletPosition = Math.floor(Math.random() * 6) + 1; // Generates a number between 1 and 6
    const chancePercentage = Math.floor((bulletPosition / 6) * 100); // Calculate percentage chance

    resultDiv.textContent = `The cylinder has been spun! Chance of hitting: ${chancePercentage}% at chamber ${bulletPosition}.`;
    
    // Clear the message after 1 second
    setTimeout(() => { resultDiv.textContent = ""; }, 1000);
}

// Pull the trigger to see if you survive
triggerButton.addEventListener('click', () => {
    const selectedChamber = parseInt(selectedChamberInput.value); // Get selected chamber (1-6)

    if (bulletPosition === -1) {
        resultDiv.textContent = "Please spin the cylinder first!";
        return;
    }

    if (selectedChamber < 1 || selectedChamber > 6) {
        resultDiv.textContent = "Please choose a chamber between 1 and 6.";
        return;
    }

    // Determine survival based on the selected chamber and bullet position
    if (selectedChamber === bulletPosition) {
        resultDiv.textContent = "BANG! You're out!";
        resultDiv.style.color = "red";
    } else {
        resultDiv.textContent = "Click! You're safe!";
        resultDiv.style.color = "green";
    }

    // Clear result after 1 second
    setTimeout(() => { resultDiv.textContent = ""; }, 1000);
});

// Reset button functionality
resetButton.addEventListener('click', () => {
    bulletPosition = -1; // Reset bullet position
    resultDiv.textContent = '';
    selectedChamberInput.value = ''; // Clear input
});

// Exit button functionality
exitButton.addEventListener('click', () => {
    window.close(); // Close the window (or redirect)
});

// Spin button functionality
spinButton.addEventListener('click', spinCylinder);