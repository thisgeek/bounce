define(function () {
  return function (element, increment) {
    var current = parseFloat(element.style.opacity),
    next = current >= increment ? current - increment : 0;
    element.style.opacity = next;
    if (parseFloat(element.style.opacity) !== next) {
      throw {
        name: 'AssignmentException',
        message: 'Value could not be assigned to variable.'
      };
    }
    return parseFloat(element.style.opacity);
  };
});
