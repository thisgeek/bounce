define(function () {
    var canvas;
    var desk = {
        init: function (window) {
            canvas = window.document.createElement('canvas');
            window.document.body.appendChild(canvas);
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            return this;
        },
        canvas: function () {
            return canvas;
        },
        context: function () {
            return canvas.getContext('2d');
        },
        clear: function (ctx) {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }
    };
    return desk;
});
