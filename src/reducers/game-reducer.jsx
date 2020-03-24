import { NEW_GAME } from '../constants/action-types';
import { SIZE } from '../constants/app-constants';

const startTiles = 2;

const initialState = {
    grid: null,
    score: 0,
    over: false,
    won: false,
    keepPlaying: false
};

export default function games(state = initialState, action) {
    switch (action.type) {
        case NEW_GAME:
            let grid = createGrid(SIZE);
            addStartTiles(grid);
            return {...state, grid: grid};
        default:
            return state;
    }
}

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

/* Grid */
const createGrid = function (size, previousGrid) {
    return {
        size: size,
        cells: previousGrid ? fromState(previousGrid) : empty(size)
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

const fromState = function (previousGrid) {
    var cells = [];

    for (var x = 0; x < previousGrid.size; x++) {
        var row = cells[x] = [];

        for (var y = 0; y < previousGrid.size; y++) {
            var tile = previousGrid[x][y];
            row.push(tile ? createTile(tile.position, tile.value) : null);
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
    if (withinBounds(cell)) {
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
        mergedFrom: null,// Tracks tiles that merged together
    };
}

const savePosition = function (tile) {
    tile.previousPosition.x = tile.x;
    tile.previousPosition.y = tile.y;
};

const updatePosition = function (tile, position) {
    tile.x = position.x;
    tile.y = position.y;
};

const serializeTile = function (tile) {
    return {
        position: {
            x: tile.x,
            y: tile.y
        },
        value: tile.value
    };
};
