define(function (callback, delay) {
    setTimeout(function () {
        if (callback()) {
            loop(callback, delay);
        }
    }, delay);
});
