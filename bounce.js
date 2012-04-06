require(['desk', 'particle'], function (desk, particle) {
    (function(element) {
        element.style.opacity = 0;
        element.style.display = 'block';
        var loop = function (callback, delay) {
            setTimeout(function () {
                if (callback()) {
                    loop(callback, delay);
                }
            }, delay);
        };
        loop(function () {
            var opacity = parseFloat(element.style.opacity),
                notDone = opacity < 1;
            element.style.opacity = opacity + 0.008;
            if (!notDone) {
                setTimeout(function () {
                    loop(function () {
                        var opacity = parseFloat(element.style.opacity),
                            notDone = opacity > 0;
                        element.style.opacity = opacity - 0.008;
                        return notDone;
                    }, 1000 / 40);
                }, 5000);
            }
            return notDone;
        }, 1000 / 40);
    }(document.querySelector('h1')));

    var ctx = desk.init(window).context();
    var parts = [
        particle.create(10, 20, 12, 0),
        particle.create(10, window.innerHeight - 20, 10, 30),
        particle.create(10, window.innerHeight - 20, 5, 40),
        particle.create(10, window.innerHeight / 2, 10, 30)
    ];

    var lineargradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
    lineargradient.addColorStop(0, "rgb(150,255,100)");
    lineargradient.addColorStop(0.5, "rgb(255,100,100)");
    lineargradient.addColorStop(1, "rgb(100,150,255)");

    ctx.strokeStyle = lineargradient;
    ctx.lineWidth = 3;

    var move = function (thing) {
        // Drag
        thing.vy *= 0.994;
        thing.vx *= 0.994;
        // Gravity
        thing.vy -= 0.66;
        // Velocity
        thing.x += thing.vx;
        thing.y -= thing.vy;
        // Ground
        if (thing.y > window.innerHeight - 20 - 10) {
            thing.vy = thing.vy * -1;
        }
        // Walls
        if (thing.x > window.innerWidth - 20 || thing.x < 10) {
            thing.vx = thing.vx * -1;
        }

        return thing;
    };

    // Animate
    setInterval(function () {
        desk.clear(ctx);
        parts.map(function (part) {
            var p = move(part);
            part.render(ctx);
            return p;
        });
    }, 1000 / 40);

    // Generate particles
    setInterval(function () {
        parts.push(particle.create(10, Math.random() * 400, 12, 0));
        parts.push(particle.create(10, window.innerHeight - 20, 5, Math.random() * 43));
    }, 1000);
});
