define([
  '_window',
  '_math',
  'particle'
], function (_window, _math, particle) {

  return function (desk, ctx) {
    var bounceCtrl = {
      paused: true,
      diameter: 10,
      frameRate: 1000 / 40,
      particles: [],
      togglePlay: function () {
        if (!this.paused) {
          this.pause();
        } else {
          this.play();
        }
      },
      play: function () {
        var self = this;

        this.animation = _window.setInterval(bounceCtrl.updateFrame, this.frameRate);

        this.generator = _window.setInterval(function () {
          var d = bounceCtrl.diameter;
          self.particles.push(particle.create(10, _math.random() * 400, 12, 0, d));
          self.particles.push(particle.create(10, _window.innerHeight - 20, 5, _math.random() * 43, d));
        }, 1000);

        this.paused = false;
      },
      pause: function () {
        _window.clearInterval(this.animation);
        _window.clearInterval(this.generator);
        this.paused = true;
      },
      setDiameter: function (value) {
        if (this.paused) { desk.clear(ctx); }
        this.diameter = value;
        this.particles.map(function (part) {
          part.d = value;
          part.render(ctx);
          return part;
        });
      },
      updateFrame: function () {
        desk.clear(ctx);
        bounceCtrl.particles.map(function (part) {
          part.move();
          part.render(ctx);
          return part;
        });
      }
    };
    return bounceCtrl;
  };


});
