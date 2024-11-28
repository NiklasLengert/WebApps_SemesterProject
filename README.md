# Adventure Game "Adventure Dime" :P

This is a simple text-based adventure game where the player navigates a grid to collect clues and find a hidden dime to win the game.

## Game Description

The game takes place on a 6x6 grid. The player starts at the bottom-right corner of the grid (position (5, 5)). The objective is to find all three clues scattered randomly on the grid and then find the hidden dime to win the game. Obstacles are also placed randomly on the grid and can block the player's movement.

## Game Setup

- **Grid Size**: The game grid is defined by the constant `GRID_SIZE` and is set to 6.
- **Game World**: The game world is a 2D array (`gameWorld`) initialized with `null` values.
- **Player Position**: The player starts at position `{ x: 5, y: 5 }`.
- **Obstacles**: Obstacles are placed randomly on the grid.
- **Clues**: Three clues are placed randomly on the grid.
- **Dime**: The dime appears randomly on the grid after all clues are collected.
- **Clues Collected**: The number of clues collected by the player, initialized to 0.
- **Maximum Clues**: The maximum number of clues to be collected, set to 3.

## Functions

### `placeItemRandomly(type)`

Places an item of the specified type randomly on the grid, avoiding the player's starting position and already occupied positions.

### `describeCurrentState()`

Displays the current state of the game, including the player's position and any items found on the current tile.

### `canMove(x, y)`

Checks if the player can move to the specified tile, ensuring the move is within bounds and not blocked by an obstacle.

### `movePlayer(direction)`

Moves the player in the specified direction (`up`, `down`, `left`, `right`). If the move is valid, it updates the player's position and describes the current state.

### `triggerObstacles()`

Simulates obstacle behavior after each move, with a 25% chance for each obstacle to trigger and block new paths.

### `gameLoop()`

The main game loop that prompts the player for movement directions and updates the game state accordingly.

## How to Play

1. Run the `game.js` file in a Node.js environment.
2. Follow the prompts to enter movement directions (`up`, `down`, `left`, `right`).
3. Collect all three clues to make the dime appear.
4. Find the dime to win the game.
