require(['desk', 'particle'], function (desk, particle) {
    var ctx = desk.init(window).context();
    var part = particle.create(10, window.innerHeight - 20);
    var colors = ["rgb(255,200,200)", "rgb(200,200,255)", "rgb(200,255,200)"];
    var color = colors.pop();
    ctx.strokeStyle = color;
    colors.unshift(color);
    ctx.lineWidth = 3;

    var move = function (thing) {
        // Drag
        thing.vy *= 0.994;
        thing.vx *= 0.994;
        // Gravity
        thing.vy -= 0.6;
        // Velocity
        thing.x += thing.vx;
        thing.y -= thing.vy;
        // Ground
        if (thing.y > window.innerHeight - 20 - 10) {
            thing.vy = thing.vy * -1;
            color = colors.pop();
            ctx.strokeStyle = color;
            colors.unshift(color);
        }
        return thing;
    };

    setInterval(function () {
        desk.clear(ctx);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        part = move(part);
        part.render(ctx);
    }, 1000 / 32);
});
