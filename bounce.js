require([
  '_window',
  '_document',
  '_math',
  'desk',
  'particle',
  'inAndOut'
], function (_window, _document, _math, desk, particle, inAndOut) {

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

  var frame = function () {
    desk.clear(ctx);
    parts.map(function (part) {
      part.move();
      part.render(ctx);
      return part;
    });
  };

  // Animate
  var animation = _window.setInterval(frame, 1000 / 40);

  // Generate particles
  var generator = _window.setInterval(function () {
    var d = 1;
    parts.push(particle.create(10, _math.random() * 400, 12, 0, d));
    parts.push(particle.create(10, _window.innerHeight - 20, 5, _math.random() * 43, d));
  }, 1000);

  var paused = false;
  (function () {
    _document.onkeypress = function (e) {
      var charCode = (typeof e.which === 'number') ? e.which : e.keyCode;
      if (charCode === 32) {
        if (!paused) {
          _window.clearInterval(animation);
          _window.clearInterval(generator);
          paused = true;
        } else {
          animation = _window.setInterval(frame, 1000 / 40);

          generator = _window.setInterval(function () {
            var d = 1;
            parts.push(particle.create(10, _math.random() * 400, 12, 0, d));
            parts.push(particle.create(10, _window.innerHeight - 20, 5, _math.random() * 43, d));
          }, 1000);
          paused = false;
        }
      }
    };
  }());

  _window.bounceCtrl = {
    setDiameter: function (value) {
      if (paused) { desk.clear(ctx); }
      parts.map(function (part) {
        part.d = value;
        part.render(ctx);
        return part;
      });
    }
  };

});
