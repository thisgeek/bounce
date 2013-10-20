define(['_document'], function (_document) {
  return function (config) {
    _document.onkeypress = function (e) {
      var charCode = (typeof e.which === 'number') ? e.which : e.keyCode;
      var fn = config[charCode.toString()];
      if (fn) { fn(); }
    };
  };
});
