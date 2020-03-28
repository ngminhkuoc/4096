import { NEW_GAME, MOVE, KEEP_PLAYING, LOAD_GAME } from '../constants/action-types';
import { SIZE, KEYCODE, MAX_SCORE } from '../constants/app-constants';
import * as LocalStorageManager from './local-storage';

const startTiles = 2;

const initialState = {
    grid: null,
    score: 0,
    bestScore: 0,
    over: false,
    won: false,
    keepPlaying: false,
};

export default function games(state = initialState, action) {
    switch (action.type) {
        case LOAD_GAME:
            return loadGame(state);
        case NEW_GAME:
            return newGame(state);
        case MOVE:
            return move(serializeState(state), action.payload.keyCode);
        case KEEP_PLAYING:
            var newState = { ...state, keepPlaying: true, won: false };
            actuate(newState);
            return newState;
        default:
            return state;
    }
}

const loadGame = (state) => {
    var previousState = LocalStorageManager.getGameState();
    if (previousState) {
        return previousState;
    }
    else {
        return newGame(state);
    }
}

const newGame = (state) => {
    LocalStorageManager.clearGameState();
    let grid = createGrid(SIZE);
    addStartTiles(grid);

    var newState = { ...state, grid: grid, over: false, won: false, score: 0, keepPlaying: false };
    actuate(newState);
    return newState;
}

const actuate = (state) => {
    if (LocalStorageManager.getBestScore() < state.score) {
        LocalStorageManager.setBestScore(state.score);
    }

    if (state.over) {
        LocalStorageManager.clearGameState();
    } else {
        LocalStorageManager.setGameState(serializeState(state));
    }
};

const serializeState = (state) => {
    return {
        grid: state.grid ? serializeGrid(state.grid) : null,
        score: state.score,
        bestScore: state.bestScore,
        over: state.over,
        won: state.won,
        keepPlaying: state.keepPlaying
    }
}

const isGameTerminated = (state) => {
    return state.over || (state.won && !state.keepPlaying);
};

const getVector = function (direction) {
    switch (direction) {
        case KEYCODE.LEFT:
            return { x: -1, y: 0 };
        case KEYCODE.UP:
            return { x: 0, y: -1 };
        case KEYCODE.RIGHT:
            return { x: 1, y: 0 };
        case KEYCODE.DOWN:
            return { x: 0, y: 1 };
        default:
            return null;
    }
};

const buildTraversals = function (vector) {
    var traversals = { x: [], y: [] };

    for (var pos = 0; pos < SIZE; pos++) {
        traversals.x.push(pos);
        traversals.y.push(pos);
    }

    // Always traverse from the farthest cell in the chosen direction
    if (vector.x === 1) traversals.x = traversals.x.reverse();
    if (vector.y === 1) traversals.y = traversals.y.reverse();

    return traversals;
};

const prepareTiles = function (grid) {
    eachCell(grid, function (x, y, tile) {
        if (tile) {
            tile.mergedFrom = null;
            savePosition(tile);
        }
    });
};

const findFarthestPosition = function (grid, cell, vector) {
    var previous;

    // Progress towards the vector direction until an obstacle is found
    do {
        previous = cell;
        cell = { x: previous.x + vector.x, y: previous.y + vector.y };
    } while (withinBounds(grid, cell) && cellAvailable(grid, cell));

    return {
        farthest: previous,
        next: cell // Used to check if a merge is required
    };
};

const positionsEqual = function (first, second) {
    return first.x === second.x && first.y === second.y;
};

const move = (state, direction) => {
    // 0: up, 1: right, 2: down, 3: left

    if (!state.grid || isGameTerminated(state)) return state; // Don't do anything if the game's over

    var cell, tile;
    let grid = state.grid;

    var vector = getVector(direction);
    var traversals = buildTraversals(vector);
    var moved = false;

    // Save the current tile positions and remove merger information
    prepareTiles(grid);

    // Traverse the grid in the right direction and move tiles
    traversals.x.forEach(function (x) {
        traversals.y.forEach(function (y) {
            cell = { x: x, y: y };
            tile = cellContent(grid, cell);

            if (tile) {
                var positions = findFarthestPosition(grid, cell, vector);
                var next = cellContent(grid, positions.next);

                // Only one merger per row traversal?
                if (next && next.value === tile.value && !next.mergedFrom) {
                    var merged = createTile(positions.next, tile.value * 2);
                    merged.mergedFrom = [tile, next];

                    insertTile(grid, merged);
                    removeTile(grid, tile);

                    // Converge the two tiles' positions
                    updatePosition(tile, positions.next);

                    // Update the score
                    state.score += merged.value;
                    state.bestScore = state.bestScore < state.score ? state.score : state.bestScore;

                    // The mighty 4096 tile
                    if (!state.keepPlaying && merged.value === MAX_SCORE) state.won = true;
                } else {
                    moveTile(grid, tile, positions.farthest);
                }

                if (!positionsEqual(cell, tile)) {
                    moved = true; // The tile moved from its original cell!
                }
            }
        });
    });

    if (moved) {
        addRandomTile(grid);

        if (!movesAvailable(grid)) {
            state.over = true; // Game over!
        }

        actuate(state);
    }
    return state;
};
const movesAvailable = function (grid) {
    return cellsAvailable(grid) || tileMatchesAvailable(grid);
};

const tileMatchesAvailable = function (grid) {
    var tile;
    for (var x = 0; x < SIZE; x++) {
        for (var y = 0; y < SIZE; y++) {
            tile = cellContent(grid, { x: x, y: y });

            if (tile) {
                for (var direction = KEYCODE.LEFT; direction <= KEYCODE.DOWN; direction++) {
                    var vector = getVector(direction);
                    var cell = { x: x + vector.x, y: y + vector.y };

                    var other = cellContent(grid, cell);

                    if (other && other.value === tile.value) {
                        return true; // These two tiles can be merged
                    }
                }
            }
        }
    }

    return false;
};

const addStartTiles = (grid) => {
    for (var i = 0; i < startTiles; i++) {
        addRandomTile(grid);
    }
}

const addRandomTile = (grid) => {
    if (cellsAvailable(grid)) {
        var value = Math.random() < 0.9 ? 2 : 4;
        var tile = createTile(randomAvailableCell(grid), value);

        insertTile(grid, tile);
    }
};

const moveTile = (grid, tile, position) => {
    grid.cells[tile.x][tile.y] = null;
    grid.cells[position.x][position.y] = tile;
    updatePosition(tile, position);
};

/* Grid */
const createGrid = function (size) {
    return {
        size: size,
        cells: empty(size)
    };
}

// Build a grid of the specified size
const empty = function (size) {
    var cells = [];

    for (var x = 0; x < size; x++) {
        var row = cells[x] = [];

        for (var y = 0; y < size; y++) {
            row.push(null);
        }
    }

    return cells;
};

// Find the first available random position
const randomAvailableCell = function (grid) {
    var cells = availableCells(grid);

    if (cells.length) {
        return cells[Math.floor(Math.random() * cells.length)];
    }
};

const availableCells = function (grid) {
    var cells = [];

    eachCell(grid, function (x, y, tile) {
        if (!tile) {
            cells.push({ x: x, y: y });
        }
    });

    return cells;
};

// Call callback for every cell
const eachCell = function (grid, callback) {
    for (var x = 0; x < grid.size; x++) {
        for (var y = 0; y < grid.size; y++) {
            callback(x, y, grid.cells[x][y]);
        }
    }
};

// Check if there are any cells available
const cellsAvailable = function (grid) {
    return !!availableCells(grid).length;
};

// Check if the specified cell is taken
const cellAvailable = function (grid, cell) {
    return !cellOccupied(grid, cell);
};

const cellOccupied = function (grid, cell) {
    return !!cellContent(grid, cell);
};

const cellContent = function (grid, cell) {
    if (withinBounds(grid, cell)) {
        return grid.cells[cell.x][cell.y];
    } else {
        return null;
    }
};

// Inserts a tile at its position
const insertTile = function (grid, tile) {
    grid.cells[tile.x][tile.y] = tile;
};

const removeTile = function (grid, tile) {
    grid.cells[tile.x][tile.y] = null;
};

const withinBounds = function (grid, position) {
    return position.x >= 0 && position.x < grid.size &&
        position.y >= 0 && position.y < grid.size;
};

const serializeGrid = function (grid) {
    var cellState = [];

    for (var x = 0; x < grid.size; x++) {
        var row = cellState[x] = [];

        for (var y = 0; y < grid.size; y++) {
            row.push(grid.cells[x][y] ? serializeTile(grid.cells[x][y]) : null);
        }
    }

    return {
        size: grid.size,
        cells: cellState
    };
};


/* Tile */
const createTile = function (position, value) {
    return {
        x: position.x,
        y: position.y,
        value: value || 2,
        previousPosition: null,
        mergedFrom: null,
    };
}

const savePosition = function (tile) {
    tile.previousPosition = {
        x: tile.x,
        y: tile.y
    }
};

const updatePosition = function (tile, position) {
    tile.x = position.x;
    tile.y = position.y;
};

const serializeTile = function (tile) {
    return {
        x: tile.x,
        y: tile.y,
        value: tile.value,
        previousPosition: null,
        mergedFrom: null,
    };
};