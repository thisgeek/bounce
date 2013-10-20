require([
  '_window',
  '_document',
  '_math',
  'desk',
  'particle',
  'inAndOut',
  'keyPressRouter'
], function (_window, _document, _math, desk, particle, inAndOut, keyPressRouter) {

  inAndOut(_document.querySelector('h1'))
  .then(function () {
    inAndOut(_document.querySelector('#instructions .first'));
  });

  var ctx = desk.init(_window).context();
  var parts = [
    particle.create(10, 20, 12, 0, 10),
    particle.create(10, _window.innerHeight - 20, 10, 30, 10),
    particle.create(10, _window.innerHeight - 20, 5, 40, 10),
    particle.create(10, _window.innerHeight / 2, 10, 30, 10)
  ];

  var lineargradient = ctx.createLinearGradient(0, 0, 0, _window.innerHeight);
  lineargradient.addColorStop(0, 'rgb(150,255,100)');
  lineargradient.addColorStop(0.5, 'rgb(255,100,100)');
  lineargradient.addColorStop(1, 'rgb(100,150,255)');

  ctx.strokeStyle = lineargradient;
  ctx.lineWidth = 3;

  var bounceCtrl = {
    paused: true,
    diameter: 10,
    pause: function () {
      if (!this.paused) {
        _window.clearInterval(animation);
        _window.clearInterval(generator);
        this.paused = true;
      } else {
        animation = _window.setInterval(bounceCtrl.updateFrame, 1000 / 40);

        generator = _window.setInterval(function () {
          var d = bounceCtrl.diameter;
          parts.push(particle.create(10, _math.random() * 400, 12, 0, d));
          parts.push(particle.create(10, _window.innerHeight - 20, 5, _math.random() * 43, d));
        }, 1000);
        this.paused = false;
      }
    },
    setDiameter: function (value) {
      if (this.paused) { desk.clear(ctx); }
      this.diameter = value;
      parts.map(function (part) {
        part.d = value;
        part.render(ctx);
        return part;
      });
    },
    updateFrame: function () {
      desk.clear(ctx);
      parts.map(function (part) {
        part.move();
        part.render(ctx);
        return part;
      });
    }
  };

  // Animate
  var animation = _window.setInterval(bounceCtrl.updateFrame, 1000 / 40);

  // Generate particles
  var generator = _window.setInterval(function () {
    var d = bounceCtrl.diameter;
    parts.push(particle.create(10, _math.random() * 400, 12, 0, d));
    parts.push(particle.create(10, _window.innerHeight - 20, 5, _math.random() * 43, d));
  }, 1000);

  keyPressRouter({
    '32': bounceCtrl.pause
  });

  _window.bounceCtrl = bounceCtrl;
});
