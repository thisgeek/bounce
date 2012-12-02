require([
    'fade'
], function (fade) {
    return function (element) {
        element.style.opacity = 0;
        element.style.display = 'block';

        return loop(function () {
            return fade(element, -0.008) >= 1;
        }, 1000 / 40)
        .delay(5000)
        .then(function () {
            return listener();
        }).then(function () {
            return loop(function () {
                return fade(element, 0.008) <= 0;
            }, 1000 / 40);
        }).then(function () {
            element.style.opacity = 0;
            element.style.display = 'none';
        });

    };
});
