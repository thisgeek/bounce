define([
  '_window'
], function (_window) {
  var canvas;
  var desk = {
    init: function (win) {
      canvas = win.document.createElement('canvas');
      win.document.body.appendChild(canvas);
      canvas.width = win.innerWidth;
      canvas.height = win.innerHeight;
      return this;
    },
    canvas: function () {
      return canvas;
    },
    context: function () {
      return canvas.getContext('2d');
    },
    clear: function (ctx) {
      ctx.clearRect(0, 0, _window.innerWidth, _window.innerHeight);
    }
  };
  return desk;
});
