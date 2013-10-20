define([
  '_window'
], function (_window) {

  return function (desk, ctx) {
    var bounceCtrl = {
      paused: true,
      diameter: 10,
      frameRate: 1000 / 40,
      particles: [],
      onGenerate: function () {},
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
          self.onGenerate.call(self);
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
