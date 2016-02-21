/* */ 
var sources = require('./sources');
var sinks = require('./sinks');
var throughs = require('./throughs');
var u = require('pull-core');
function isFunction(fun) {
  return 'function' === typeof fun;
}
function isReader(fun) {
  return fun && (fun.type === "Through" || fun.length === 1);
}
var exports = module.exports = function pull() {
  var args = [].slice.call(arguments);
  if (isReader(args[0]))
    return function(read) {
      args.unshift(read);
      return pull.apply(null, args);
    };
  var read = args.shift();
  if (isFunction(read.source))
    read = read.source;
  function next() {
    var s = args.shift();
    if (null == s)
      return next();
    if (isFunction(s))
      return s;
    return function(read) {
      s.sink(read);
      return s.source;
    };
  }
  while (args.length)
    read = next()(read);
  return read;
};
for (var k in sources)
  exports[k] = u.Source(sources[k]);
for (var k in throughs)
  exports[k] = u.Through(throughs[k]);
for (var k in sinks)
  exports[k] = u.Sink(sinks[k]);
var maybe = require('./maybe')(exports);
for (var k in maybe)
  exports[k] = maybe[k];
exports.Duplex = exports.Through = exports.pipeable = u.Through;
exports.Source = exports.pipeableSource = u.Source;
exports.Sink = exports.pipeableSink = u.Sink;
