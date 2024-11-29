// Define the grid dimensions
const GRID_SIZE = 6;

// Initialize the game world
let gameWorld = [];
for (let i = 0; i < GRID_SIZE; i++) {
    gameWorld[i] = new Array(GRID_SIZE).fill(null);
}

// Define player starting position
let playerPosition = { x: 5, y: 5 };

// Define obstacles, clues, and the dime
let obstacles = [];
let clues = [];
let dime = null;
let cluesCollected = 0;
const MAX_CLUES = 3;

// Place items randomly in the grid
function placeItemRandomly(type) {
    let x;
    let y;
    do {
        x = Math.floor(Math.random() * GRID_SIZE);
        y = Math.floor(Math.random() * GRID_SIZE);
    } while (gameWorld[y][x] !== null || (x === 5 && y === 5)); // Avoid placing on player position

    gameWorld[y][x] = type;
    return { x, y };
}

// Create the obstacles and clues in random positions
for (let i = 0; i < 3; i++) {
    obstacles.push(placeItemRandomly("obstacle"));
    clues.push(placeItemRandomly("clue"));
}

// Function to display the game state in the console
function describeCurrentState() {
    console.log(`You are currently at (${playerPosition.x + 1}, ${playerPosition.y + 1}).`);

    let tileContent = gameWorld[playerPosition.y][playerPosition.x];
    if (tileContent === "clue") {
        console.log("You found a clue!");
        cluesCollected++;
        gameWorld[playerPosition.y][playerPosition.x] = null; // Remove clue from the tile

        if (cluesCollected === MAX_CLUES) {
            dime = placeItemRandomly("dime"); // Spawn the dime when all clues are collected
            console.log("A mysterious dime has appeared somewhere in the world!");
        }
    } else if (tileContent === "dime") {
        console.log("You found the dime and won the game! Congratulations!");
        return true; // Game over
    }

    return false; // Continue game
}

// Function to check if the player can move to a specific tile
function canMove(x, y) {
    // All out of bounds scenarios
    if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return false;

    // Blocked by obstacle
    for (let i = 0; i < obstacles.length; i++) {
        if (obstacles[i].x === x && obstacles[i].y === y) {
            return false;
        }
    }
    return true;
}

// Function to move the player in the specified direction
function movePlayer(direction) {
    let { x, y } = playerPosition;
    switch (direction) {
        case 'up': y -= 1; break;
        case 'down': y += 1; break;
        case 'left': x -= 1; break;
        case 'right': x += 1; break;
        default: console.log("Invalid direction! Use 'up', 'down', 'left', or 'right'."); return;
    }

    // Check if the player can move to the new position
    if (canMove(x, y)) {
        playerPosition = { x, y };
        return describeCurrentState();
    } else {
        console.log("You can't move that way; something is blocking you.");
    }
    return false;
}

// Simulate obstacle behavior after each move
function triggerObstacles() {
    obstacles.forEach(obstacle => {
        if (Math.random() < 0.25) { // 25% chance for each obstacle to "trigger"
            console.log("An obstacle has shifted, blocking new paths!");
            // Further customization required
        }
    });
}

// Get the information according to position
function getDialog(){
    
}

// Game loop
function gameLoop() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
 
    function askForMove() {
        readline.question("Enter direction (up, down, left, right): ", (direction) => {
            const gameEnded = movePlayer(direction);
            if (!gameEnded) {
                triggerObstacles();
                askForMove();
            } else {
                readline.close();
            }
        });
    }

    console.log("Welcome to the adventure! Find all three clues and collect the dime to win!");
    askForMove();
}

gameLoop();