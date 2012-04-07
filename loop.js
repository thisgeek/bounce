define(function() {
    return function loop (callback, delay) {
        setTimeout(function () {
            if (callback()) {
                loop(callback, delay);
            }
        }, delay);
    };
});
