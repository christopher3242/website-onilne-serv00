document.addEventListener("DOMContentLoaded", function() {
    const gridContainer = document.getElementById('sudoku-grid');
    const generateButton = document.getElementById('generate');
    const solveButton = document.getElementById('solve');
    const answerButton = document.getElementById('answer');
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    document.body.appendChild(messageElement);

    let solution = [];

    // Generate an empty Sudoku grid
    function createEmptyGrid() {
        return Array.from({ length: 9 }, () => Array(9).fill(0));
    }

    // Check if placing a number is valid in the Sudoku context
    function isValidPlacement(grid, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === num || grid[i][col] === num) return false; // Check row and column
        }

        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;

        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (grid[i][j] === num) return false; // Check 3x3 box
            }
        }

        return true;
    }

    // Generate a valid full Sudoku grid
    function fillGrid(grid) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    const nums = Array.from({ length: 9 }, (_, i) => i + 1); // Numbers 1-9
                    shuffle(nums); // Shuffle the numbers

                    for (let num of nums) {
                        if (isValidPlacement(grid, row, col, num)) {
                            grid[row][col] = num; 
                            if (fillGrid(grid)) {
                                return true; // Continue to fill the grid
                            }
                            grid[row][col] = 0; // Backtrack
                        }
                    }
                    return false; // Backtrack here
                }
            }
        }
        return true; // Solved
    }

    // Shuffle an array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Generate a random Sudoku puzzle
    function generateRandomPuzzle() {
        const grid = createEmptyGrid();
        fillGrid(grid); // Fill it with a valid Sudoku solution

        // Copy solution to enable puzzle clearing
        solution = grid.map(row => row.slice());
        clearCells(grid); // Clear specific cells to create a puzzle

        createGrid(grid); // Create the visual grid for user input
    }

    // Clear random cells to generate a puzzle
    function clearCells(grid) {
        const cellsToClear = 40; // Number of cells to clear
        let count = 0;
        while (count < cellsToClear) {
            const i = Math.floor(Math.random() * 9);
            const j = Math.floor(Math.random() * 9);
            if (grid[i][j] !== 0) {
                grid[i][j] = 0; // Clear the cell
                count++;
            }
        }
    }

    // Create the Sudoku grid
    function createGrid(sudoku) {
        gridContainer.innerHTML = ''; // Clear previous grid
        for (let i = 0; i < 81; i++) {
            const cell = document.createElement('input');
            cell.type = 'text';
            cell.maxLength = 1; // Allow only one digit
            cell.className = 'cell';
            cell.value = sudoku[Math.floor(i / 9)][i % 9] !== 0 ? sudoku[Math.floor(i / 9)][i % 9] : '';
            cell.readOnly = false;  // Make the cells editable by the user
            gridContainer.appendChild(cell);
        }
    }

    // Show solution when the answer button is clicked
    answerButton.addEventListener('click', function() {
        if (solution.length > 0) {
            const cells = document.querySelectorAll('.cell');
            solution.forEach((row, i) => {
                row.forEach((num, j) => {
                    cells[i * 9 + j].value = num;
                });
            });
            messageElement.textContent = "Answers displayed. Check your puzzle!";
            
            // Hide the message after 2 seconds
            setTimeout(() => {
                messageElement.textContent = ""; // Clear the message after 2 seconds
            }, 2000);
        }
    });

    // Check if the puzzle is solved correctly
    solveButton.addEventListener('click', function() {
        const cells = document.querySelectorAll('.cell');
        let solved = true;

        cells.forEach((cell, index) => {
            const correctValue = solution[Math.floor(index / 9)][index % 9];
            if (cell.value.trim() === '') {
                solved = false; // If any cell is empty in the user's answer
            } else if (parseInt(cell.value) !== correctValue) {
                solved = false; // If any user's input doesn't match the solution
            }
        });

        // Update message based on whether puzzle is solved or not
        if (solved) {
            messageElement.textContent = "You did it! The puzzle has been solved.";
        } else {
            messageElement.textContent = "Puzzle not solved! Check your inputs.";
        }

        // Hide the message after 2 seconds
        setTimeout(() => {
            messageElement.textContent = ""; // Clear the message after 2 seconds
        }, 2000);
    });

    // Generate Sudoku on button click
    generateButton.addEventListener('click', generateRandomPuzzle);
});