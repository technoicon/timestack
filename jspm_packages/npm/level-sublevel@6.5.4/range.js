/* */ 
(function(Buffer) {
  var ltgt = require('ltgt');
  function isArrayLike(a) {
    return Array.isArray(a) || Buffer.isBuffer(a);
  }
  function isPrimitive(a) {
    return 'string' === typeof a || 'number' === typeof a;
  }
  function has(o, k) {
    return Object.hasOwnProperty.call(o, k);
  }
  function compare(a, b) {
    if (isArrayLike(a) && isArrayLike(b)) {
      var l = Math.min(a.length, b.length);
      for (var i = 0; i < l; i++) {
        var c = compare(a[i], b[i]);
        if (c)
          return c;
      }
      return a.length - b.length;
    }
    if (isPrimitive(a) && isPrimitive(b))
      return a < b ? -1 : a > b ? 1 : 0;
    throw new Error('items not comparable:' + JSON.stringify(a) + ' ' + JSON.stringify(b));
  }
  function prefix(a, b) {
    if (a.length > b.length)
      return false;
    var l = a.length - 1;
    var lastA = a[l];
    var lastB = b[l];
    if (typeof lastA !== typeof lastB)
      return false;
    if ('string' == typeof lastA && 0 != lastB.indexOf(lastA))
      return false;
    if (a.length == 1 && isArrayLike(lastA))
      l++;
    while (l--) {
      if (compare(a[l], b[l]))
        return false;
    }
    return true;
  }
  exports = module.exports = function(range, key, _compare) {
    _compare = _compare || compare;
    if (isArrayLike(range))
      return prefix(range, key);
    return ltgt.contains(range, key, _compare);
  };
  function addPrefix(prefix, range) {
    var o = ltgt.toLtgt(range, null, function(key) {
      return [prefix, key];
    });
    if (!has(o, 'gte') && !has(o, 'lte'))
      return [prefix];
    return o;
  }
  exports.compare = compare;
  exports.prefix = prefix;
  exports.addPrefix = addPrefix;
})(require('buffer').Buffer);
