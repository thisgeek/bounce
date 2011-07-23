define(function () {
    var particle = {
        render: function (ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 10, 0, Math.PI * 2, true);
            ctx.stroke();
            return this;
        }
    };

    return {
        create: function (x, y, vx, vy) {
            return Object.create(particle, {
                x: {
                    value: x,
                    writable: true
                },
                y: {
                    value: y,
                    writable: true
                },
                vx: {
                    value: vx,
                    writable: true
                },
                vy: {
                    value: vy,
                    writable: true
                }
            });
        }
    };
});
