window.fakeStorage = {
    _data: {},

    setItem: function (id, val) {
        return this._data[id] = String(val);
    },

    getItem: function (id) {
        return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
    },

    removeItem: function (id) {
        return delete this._data[id];
    },

    clear: function () {
        return this._data = {};
    }
};

const BEST_SCORE_KEY = "bestScore";
const GAME_STATE_KEY = "gameState";
let store = null

const localStorageManager = () => {
    if (store == null) {
        var supported = localStorageSupported();
        store = supported ? window.localStorage : window.fakeStorage;
    }
    return store;
}

const localStorageSupported = function () {
    var testKey = "test";
    try {
        var storage = window.localStorage;
        storage.setItem(testKey, "1");
        storage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
};


// Best score getters/setters
export const getBestScore = function () {
    return localStorageManager().getItem(BEST_SCORE_KEY) || 0;
};

export const setBestScore = function (score) {
    localStorageManager().setItem(BEST_SCORE_KEY, score);
};

// Game state getters/setters and clearing
export const getGameState = function () {
    var stateJSON = localStorageManager().getItem(GAME_STATE_KEY);
    return stateJSON ? JSON.parse(stateJSON) : null;
};

export const setGameState = function (gameState) {
    localStorageManager().setItem(GAME_STATE_KEY, JSON.stringify(gameState));
};

export const clearGameState = function () {
    localStorageManager().removeItem(GAME_STATE_KEY);
};
