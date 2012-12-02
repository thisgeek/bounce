require([
    'desk',
    'particle',
    'loop',
    'inAndOut'
], function (desk, particle, loop, inAndOut) {

    inAndOut(document.querySelector('h1'))
    .then(function () {
        inAndOut(document.querySelector('#instructions .first'));
    });

    var input = (function () {
        var div = document.createElement('div');
        var input = document.createElement('input');
        input.type = 'range';
        input.min = 1;
        input.max = 100;
        input.value = 10;
        input.step = 1;
        div.appendChild(input);
        document.body.appendChild(div);
        return input;
    }());

    var ctx = desk.init(window).context();
    var parts = [
        particle.create(10, 20, 12, 0, 10),
        particle.create(10, window.innerHeight - 20, 10, 30, 10),
        particle.create(10, window.innerHeight - 20, 5, 40, 10),
        particle.create(10, window.innerHeight / 2, 10, 30, 10)
    ];

    var lineargradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
    lineargradient.addColorStop(0, "rgb(150,255,100)");
    lineargradient.addColorStop(0.5, "rgb(255,100,100)");
    lineargradient.addColorStop(1, "rgb(100,150,255)");

    ctx.strokeStyle = lineargradient;
    ctx.lineWidth = 3;

    // Animate
    var animation = window.setInterval(function () {
        desk.clear(ctx);
        parts.forEach(function (part) {
            part.move();
            part.render(ctx);
        });
    }, 1000 / 40);

    // Generate particles
    var generator = window.setInterval(function () {
        var d = parseInt(input.value, 10);
        parts.push(particle.create(10, Math.random() * 400, 12, 0, d));
        parts.push(particle.create(10, window.innerHeight - 20, 5, Math.random() * 43, d));
    }, 1000);

    var paused = false;
    (function () {
        document.onkeypress = function (e) {
            var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
            if (charCode === 32) {
                if (!paused) {
                    window.clearInterval(animation);
                    window.clearInterval(generator);
                    paused = true;
                } else {
                    animation = window.setInterval(function () {
                        desk.clear(ctx);
                        parts.forEach(function (part) {
                            part.move();
                            part.render(ctx);
                            return p;
                        });
                    }, 1000 / 40);

                    generator = window.setInterval(function () {
                        var d = parseInt(input.value, 10);
                        parts.push(particle.create(10, Math.random() * 400, 12, 0, d));
                        parts.push(particle.create(10, window.innerHeight - 20, 5, Math.random() * 43, d));
                    }, 1000);
                    paused = false;
                }
            }
        };
    }());

    (function() {
        input.onchange = function () {
            if (paused) desk.clear(ctx);
            parts.map(function (part) {
                part.d = input.value;
                part.render(ctx);
            });
        };
    }());

});
