let inputManager = {
    events: [],
    eventTouchstart: "",
    eventTouchmove: "",
    eventTouchend: ""
}

const InputManager = () => {
    if (window.navigator.msPointerEnabled) {
        //Internet Explorer 10 style
        inputManager.eventTouchstart = "MSPointerDown";
        inputManager.eventTouchmove = "MSPointerMove";
        inputManager.eventTouchend = "MSPointerUp";
    } else {
        inputManager.eventTouchstart = "touchstart";
        inputManager.eventTouchmove = "touchmove";
        inputManager.eventTouchend = "touchend";
    }
    return inputManager;
}

export const on = function (event, callback) {
    if (!inputManager.events[event]) {
        inputManager.events[event] = [];
    }
    inputManager.events[event].push(callback);
};

const emit = function (event, data) {
    var callbacks = inputManager.events[event];
    if (callbacks) {
        callbacks.forEach(function (callback) {
            callback(data);
        });
    }
};

export const listen = function () {
    var self = InputManager();

    var map = {
        38: 0, // Up
        39: 1, // Right
        40: 2, // Down
        37: 3, // Left
        75: 0, // Vim up
        76: 1, // Vim right
        74: 2, // Vim down
        72: 3, // Vim left
        87: 0, // W
        68: 1, // D
        83: 2, // S
        65: 3  // A
    };

    // Respond to direction keys
    document.addEventListener("keydown", function (event) {
        var modifiers = event.altKey || event.ctrlKey || event.metaKey ||
            event.shiftKey;
        var mapped = map[event.which];

        if (!modifiers) {
            if (mapped !== undefined) {
                event.preventDefault();
                emit("move", mapped);
            }
        }

        // R key restarts the game
        if (!modifiers && event.which === 82) {
            restart.call(self, event);
        }
    });

    // Respond to swipe events
    var touchStartClientX, touchStartClientY;
    var gameContainer = document.getElementsByClassName("game-container")[0];

    gameContainer.addEventListener(self.eventTouchstart, function (event) {
        if ((!window.navigator.msPointerEnabled && event.touches.length > 1) ||
            event.targetTouches.length > 1) {
            return; // Ignore if touching with more than 1 finger
        }

        if (window.navigator.msPointerEnabled) {
            touchStartClientX = event.pageX;
            touchStartClientY = event.pageY;
        } else {
            touchStartClientX = event.touches[0].clientX;
            touchStartClientY = event.touches[0].clientY;
        }

        event.preventDefault();
    });

    gameContainer.addEventListener(self.eventTouchmove, function (event) {
        event.preventDefault();
    });

    gameContainer.addEventListener(self.eventTouchend, function (event) {
        if ((!window.navigator.msPointerEnabled && event.touches.length > 0) ||
            event.targetTouches.length > 0) {
            return; // Ignore if still touching with one or more fingers
        }

        var touchEndClientX, touchEndClientY;

        if (window.navigator.msPointerEnabled) {
            touchEndClientX = event.pageX;
            touchEndClientY = event.pageY;
        } else {
            touchEndClientX = event.changedTouches[0].clientX;
            touchEndClientY = event.changedTouches[0].clientY;
        }

        var dx = touchEndClientX - touchStartClientX;
        var absDx = Math.abs(dx);

        var dy = touchEndClientY - touchStartClientY;
        var absDy = Math.abs(dy);

        if (Math.max(absDx, absDy) > 10) {
            // (right : left) : (down : up)
            emit("move", absDx > absDy ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0));
        }
    });
};

const restart = function (event) {
    event.preventDefault();
    emit("restart");
};