define(function () {
    var particle = {
        create: function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        },
        vy: 30,
        vx: 8,
        render: function (ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 10, 0, Math.PI * 2, true);
            ctx.stroke();
            return this;
        }
    };

    return particle;
});
