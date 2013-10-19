define(['bower_components/q/q.min'], function (Q) {
  return function loop(callback, delay) {
    var deferred = Q.defer();
    setTimeout(function () {
      if (!callback()) {
        loop(callback, delay).then(function () {
          deferred.resolve();
        });
      } else {
        deferred.resolve();
      }
    }, delay);
    return deferred.promise;
  };
});
