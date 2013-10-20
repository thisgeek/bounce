require([
  '_window',
  '_document',
  'bounce',
  'desk',
  'particle',
  'inAndOut',
  'keyPressRouter'
], function (_window, _document, bounce, desk, particle, inAndOut, keyPressRouter) {

  inAndOut(_document.querySelector('h1'))
  .then(function () {
    inAndOut(_document.querySelector('#instructions .first'));
  });

  var ctx = desk.init(_window).context();

  var lineargradient = ctx.createLinearGradient(0, 0, 0, _window.innerHeight);
  lineargradient.addColorStop(0, 'rgb(150,255,100)');
  lineargradient.addColorStop(0.5, 'rgb(255,100,100)');
  lineargradient.addColorStop(1, 'rgb(100,150,255)');

  ctx.strokeStyle = lineargradient;
  ctx.lineWidth = 3;

  var bounceCtrl = bounce(desk, ctx);

  // Initialize
  bounceCtrl.particles = [
    particle.create(10, 20, 12, 0, 10),
    particle.create(10, _window.innerHeight - 20, 10, 30, 10),
    particle.create(10, _window.innerHeight - 20, 5, 40, 10),
    particle.create(10, _window.innerHeight / 2, 10, 30, 10)
  ];

  keyPressRouter({
    '32': function () {
      bounceCtrl.togglePlay();
    }
  });

  bounceCtrl.play();

  _window.bounceCtrl = bounceCtrl;
});
