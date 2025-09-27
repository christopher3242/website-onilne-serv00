var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
var basketX = canvas.width / 2;
var basketWidth = 100;
var basketHeight = 20;
var colors = ['red', 'green', 'blue', 'orange', 'purple'];
var fallingObjects = [];
var score = 0; // Start at 1
var maxScore = 1000;
var gameOver = false;
var restartButton = document.getElementById('restartButton');
restartButton === null || restartButton === void 0 ? void 0 : restartButton.addEventListener('click', function () {
    // Reset game variables
    score = 0;
    fallingObjects.length = 0; // clear existing objects
    basketX = canvas.width / 2;
    gameOver = false;
    // Restart the game loop
    gameLoop();
});
var leftPressed = false;
var rightPressed = false;
// Event listeners for controls
window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')
        leftPressed = true;
    if (e.key === 'ArrowRight')
        rightPressed = true;
});
window.addEventListener('keyup', function (e) {
    if (e.key === 'ArrowLeft')
        leftPressed = false;
    if (e.key === 'ArrowRight')
        rightPressed = false;
});
// Spawn a new ball with random color
function spawnObject() {
    var size = Math.random() * 20 + 10;
    var x = Math.random() * (canvas.width - size);
    var speed = Math.random() * 3 + 2;
    var color = colors[Math.floor(Math.random() * colors.length)];
    fallingObjects.push({ x: x, y: -size, size: size, speed: speed, color: color });
}
// Draw basket
function drawBasket() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(basketX, canvas.height - basketHeight - 10, basketWidth, basketHeight);
}
// Draw falling objects
function drawObjects() {
    for (var _i = 0, fallingObjects_1 = fallingObjects; _i < fallingObjects_1.length; _i++) {
        var obj = fallingObjects_1[_i];
        ctx.fillStyle = obj.color;
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
// Collision detection
function checkCollision(obj) {
    var basketY = canvas.height - basketHeight - 10;
    if (obj.y + obj.size >= basketY &&
        obj.x >= basketX &&
        obj.x <= basketX + basketWidth) {
        return true;
    }
    return false;
}
// Main game loop
function gameLoop() {
    if (gameOver)
        return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Move basket
    if (leftPressed && basketX > 0)
        basketX -= 10;
    if (rightPressed && basketX + basketWidth < canvas.width)
        basketX += 10;
    drawBasket();
    // Update and draw falling objects
    for (var i = fallingObjects.length - 1; i >= 0; i--) {
        var obj = fallingObjects[i];
        obj.y += obj.speed;
        // Check for catch
        if (checkCollision(obj)) {
            score++;
            if (score > maxScore)
                score = maxScore; // Cap at 5
            fallingObjects.splice(i, 1);
            continue;
        }
        // Remove if off screen
        if (obj.y - obj.size > canvas.height) {
            fallingObjects.splice(i, 1);
        }
        else {
            ctx.fillStyle = obj.color;
            ctx.beginPath();
            ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    // Spawn new objects
    if (Math.random() < 0.02) {
        spawnObject();
    }
    // Display score (1-5)
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText("Score: ".concat(score), 10, 30);
    // Optional: Show message when max score reached
    if (score >= maxScore) {
        ctx.fillStyle = 'yellow';
        ctx.font = '30px Arial';
        ctx.fillText('Max Score! You win!', canvas.width / 2 - 100, 50);
        // You can also stop the game here if desired
        // gameOver = true;
    }
    requestAnimationFrame(gameLoop);
}
// Start game
gameLoop();
