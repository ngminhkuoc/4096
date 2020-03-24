

export const createTile = function (position, value) {
    return {
        x: position.x,
        y = position.y,
        value = value || 2,
        previousPosition = null,
        mergedFrom = null,// Tracks tiles that merged together
    };
}

export const savePosition = function (tile) {
    tile.previousPosition.x = tile.x;
    tile.previousPosition.y = tile.y;
};

export const updatePosition = function (tile, position) {
    tile.x = position.x;
    tile.y = position.y;
};

export const serialize = function (tile) {
    return {
        position: {
            x: tile.x,
            y: tile.y
        },
        value: tile.value
    };
};
