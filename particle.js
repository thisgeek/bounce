define(function () {
  var particle = {
    render: function (ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.d, 0, Math.PI * 2, true);
      ctx.stroke();
      return this;
    },
    move: function () {
      // Drag
      this.vx *= 0.994;
      this.vy *= 0.994;
      // Gravity
      this.vy -= 0.66;
      // Velocity
      this.x += this.vx;
      this.y -= this.vy;
      // Ground
      if (this.y > window.innerHeight - 20 - 10) {
        this.vy = this.vy * -1;
      }
      // Walls
      if (this.x > window.innerWidth - 20 || this.x < 10) {
        this.vx = this.vx * -1;
      }
      return this;
    }
  };

  return {
    create: function (x, y, vx, vy, d) {
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
        },
        d: {
          value: d,
          writable: true
        }
      });
    }
  };
});
