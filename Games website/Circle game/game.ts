// game.ts

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const scoreDiv = document.getElementById('score')!;

let score = 0;

// Sizes (small, 1, 2, 5, 10)
const sizes = [10, 20, 30, 40, 50]; // radii in pixels
let currentSizeIndex = 0; // start with smallest size
let circleRadius = sizes[currentSizeIndex];

let circleX = 0;
let circleY = 0;

// Generate a random color
function getRandomColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Generate a random position for the circle
function placeCircle() {
    circleX = Math.random() * (canvas.width - 2 * circleRadius) + circleRadius;
    circleY = Math.random() * (canvas.height - 2 * circleRadius) + circleRadius;
}

// Draw the circle with a random color
function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
    ctx.fillStyle = getRandomColor();

    // Add shadow properties
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // semi-transparent black shadow
    ctx.shadowBlur = 10; // blur radius
    ctx.shadowOffsetX = 4; // horizontal offset
    ctx.shadowOffsetY = 4; // vertical offset

    ctx.fill();

    // Optional: reset shadow properties if you draw other elements
    // ctx.shadowColor = 'transparent'; // or reset after drawing
};

// Determine score based on size
function getScoreForSize(sizeIndex: number): number {
    switch (sizeIndex) {
        case 0: return 1;
        case 1: return 2;
        case 2: return 5;
        case 3: return 10;
        case 4: return 20;
        default: return 1;
    }
}

// Handle click event
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const dx = clickX - circleX;
    const dy = clickY - circleY;

    if (Math.sqrt(dx * dx + dy * dy) <= circleRadius) {
        // Increment score based on size
        score += getScoreForSize(currentSizeIndex);
        scoreDiv.innerHTML = `Score: ${score}`;

        // Change size after each click
        currentSizeIndex = (currentSizeIndex + 1) % sizes.length;
        circleRadius = sizes[currentSizeIndex];

        placeCircle();
        drawCircle();
    }
});



// Initialize game
placeCircle();
drawCircle();