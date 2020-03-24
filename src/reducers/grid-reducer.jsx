export const createGrid = function (size, previousGrid) {
    return {
        size: size,
        cells: previousGrid ? fromState(previousGrid) : empty(size)
    };
}

// Build a grid of the specified size
export const empty = function (size) {
    var cells = [];

    for (var x = 0; x < size; x++) {
        var row = cells[x] = [];

        for (var y = 0; y < size; y++) {
            row.push(null);
        }
    }

    return cells;
};

export const fromState = function (previousGrid) {
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
export const randomAvailableCell = function (grid) {
    var cells = availableCells(grid);

    if (cells.length) {
        return cells[Math.floor(Math.random() * cells.length)];
    }
};

export const availableCells = function (grid) {
    var cells = [];

    eachCell(grid, function (x, y, tile) {
        if (!tile) {
            cells.push({ x: x, y: y });
        }
    });

    return cells;
};

// Call callback for every cell
export const eachCell = function (grid, callback) {
    for (var x = 0; x < grid.size; x++) {
        for (var y = 0; y < grid.size; y++) {
            callback(x, y, grid.cells[x][y]);
        }
    }
};

// Check if there are any cells available
export const cellsAvailable = function (grid) {
    return !!availableCells(grid).length;
};

// Check if the specified cell is taken
export const cellAvailable = function (grid, cell) {
    return !cellOccupied(grid, cell);
};

export const cellOccupied = function (grid, cell) {
    return !!cellContent(grid, cell);
};

export const cellContent = function (grid, cell) {
    if (withinBounds(cell)) {
        return grid.cells[cell.x][cell.y];
    } else {
        return null;
    }
};

// Inserts a tile at its position
export const insertTile = function (grid, tile) {
    grid.cells[tile.x][tile.y] = tile;
};

export const removeTile = function (grid, tile) {
    grid.cells[tile.x][tile.y] = null;
};

export const withinBounds = function (grid, position) {
    return position.x >= 0 && position.x < grid.size &&
        position.y >= 0 && position.y < grid.size;
};

export const serializeGrid = function () {
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
