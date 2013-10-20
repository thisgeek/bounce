define([
  '_document'
], function (_document) {
  var canvas;
  var context;
  var desk = {
    init: function (width, height, parent) {
      parent = parent || _document.body;
      canvas = _document.createElement('canvas');
      parent.appendChild(canvas);
      canvas.height = height;
      canvas.width = width;
      context = canvas.getContext('2d');
      return this;
    },
    canvas: function () {
      return canvas;
    },
    context: function () {
      return context;
    },
    clear: function () {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };
  return desk;
});
