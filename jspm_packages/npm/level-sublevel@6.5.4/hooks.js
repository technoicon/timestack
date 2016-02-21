/* */ 
var inRange = require('./range');
module.exports = function(compare) {
  var hooks = [];
  return {
    add: function(range, hook) {
      var m = {
        range: range,
        hook: hook
      };
      hooks.push(m);
      return function() {
        var i = hooks.indexOf(m);
        if (~i)
          return hooks.splice(i, 1);
      };
    },
    removeAll: function(range) {
      throw new Error('not implemented');
    },
    trigger: function(key, args) {
      for (var i = 0; i < hooks.length; i++) {
        var test = hooks[i];
        if (inRange(test.range, key, compare))
          test.hook.apply(this, args);
      }
    }
  };
};
