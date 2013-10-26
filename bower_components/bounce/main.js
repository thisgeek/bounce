require([
  '_window',
  '_document',
  '_math',
  'bounce',
  'desk',
  'particle',
  'keyPressRouter'
], function (_window, _document, _math, bounce, desk, particle, keyPressRouter) {

  _document.querySelector('h1').className = 'in';
  _window.setTimeout(function () {
    _document.querySelector('h1').className = 'out';
  }, 10000);
  _window.setTimeout(function () {
    _document.querySelector('#instructions').className = 'in';
  }, 15000);
  _window.setTimeout(function () {
    _document.querySelector('#instructions').className = 'out';
  }, 20000);

  var ctx = desk.init(_window.innerWidth, _window.innerHeight).context();

  var lineargradient = ctx.createLinearGradient(0, 0, 0, desk.canvas().height);
  lineargradient.addColorStop(0, 'rgb(150,255,100)');
  lineargradient.addColorStop(0.5, 'rgb(255,100,100)');
  lineargradient.addColorStop(1, 'rgb(100,150,255)');

  ctx.strokeStyle = lineargradient;
  ctx.lineWidth = 3;

  var bounceCtrl = bounce(desk);

  // Initialize
  bounceCtrl.particles = [
    particle.create(10, 20, 12, 0, 10),
    particle.create(10, desk.canvas().height - 20, 10, 30, 10),
    particle.create(10, desk.canvas().height - 20, 5, 40, 10),
    particle.create(10, desk.canvas().height / 2, 10, 30, 10)
  ];

  bounceCtrl.onGenerate = function () {
    var d = this.diameter;
    this.particles.push(particle.create(10, _math.random() * 400, 12, 0, d));
    this.particles.push(particle.create(10, desk.canvas().height - 20, 5, _math.random() * 43, d));
  };

  keyPressRouter({
    '32': function () {
      bounceCtrl.togglePlay();
    }
  });

  bounceCtrl.play();

  _window.bounceCtrl = bounceCtrl;
});
