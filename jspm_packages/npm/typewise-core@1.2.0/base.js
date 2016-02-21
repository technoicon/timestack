/* */ 
(function(Buffer) {
  var collation = require('./collation');
  var base = {};
  function _valueOf(instance) {
    return instance == null ? instance : instance.valueOf();
  }
  var _toString = Object.prototype.toString;
  function _isObject(instance) {
    return instance && _toString.call(instance) === '[object Object]';
  }
  base.compare = function(a, b) {
    if (base.invalid(a, b))
      return NaN;
    if (a === b)
      return 0;
    var result = base.bound.compare(a, b);
    if (result !== undefined)
      return result;
    var aTypeOf = typeof a;
    var bTypeOf = typeof b;
    var aValueOf = _valueOf(a);
    var bValueOf = _valueOf(b);
    var order = base.order;
    var sorts = base.sorts;
    var sort;
    for (var i = 0,
        length = order.length; i < length; ++i) {
      sort = sorts[order[i]];
      if (sort.is(a, aTypeOf))
        return sort.is(b, bTypeOf) ? sort.compare(aValueOf, bValueOf) : -1;
      if (sort.is(b, bTypeOf))
        return 1;
    }
    return NaN;
  };
  base.equal = function(a, b) {
    return base.compare(a, b) === 0;
  };
  base.invalid = function(a, b) {
    var types = base.invalid;
    for (var key in types) {
      var type = types[key];
      if (type && type.is && (type.is(a) || type.is(b)))
        return true;
    }
    return false;
  };
  base.invalid.NAN = {is: function(instance) {
      var valueOf = _valueOf(instance);
      return valueOf !== valueOf;
    }};
  base.invalid.ERROR = {is: function(instance) {
      return instance && instance instanceof Error;
    }};
  function BoundedKey(bound, upper, prefix) {
    this.bound = bound;
    this.upper = !!upper;
    this.prefix = prefix;
  }
  function Boundary(sort) {
    this.sort = sort;
  }
  Boundary.prototype.lower = function(prefix) {
    return new BoundedKey(this, false, prefix);
  };
  Boundary.prototype.upper = function(prefix) {
    return new BoundedKey(this, true, prefix);
  };
  Boundary.prototype.is = function(source) {
    return source instanceof BoundedKey && source.sort === this.sort;
  };
  Boundary.add = function(sort) {
    sort.bound = new Boundary(sort);
  };
  Boundary.add(base);
  base.bound.getBoundary = function(source) {
    return source instanceof BoundedKey && source.bound;
  };
  base.bound.compare = function(a, b) {
    var aBound = base.bound.is(a);
    var bBound = base.bound.is(b);
    if (aBound) {
      if (bBound && !a.upper === !b.upper)
        return 0;
      return a.upper ? 1 : -1;
    }
    if (bBound)
      return -base.bound.compare(b, a);
  };
  function fixed(value) {
    return {
      is: function(instance) {
        return instance === value;
      },
      value: value
    };
  }
  var sorts = base.sorts = {};
  sorts.void = fixed(void 0);
  sorts.void.compare = collation.inequality;
  sorts.null = fixed(null);
  sorts.null.compare = collation.inequality;
  var BOOLEAN = sorts.boolean = {};
  BOOLEAN.compare = collation.inequality;
  BOOLEAN.is = function(instance, typeOf) {
    return (typeOf || typeof instance) === 'boolean';
  };
  BOOLEAN.sorts = {};
  BOOLEAN.sorts.true = fixed(true);
  BOOLEAN.sorts.false = fixed(false);
  Boundary.add(BOOLEAN);
  var NUMBER = sorts.number = {};
  NUMBER.compare = collation.difference;
  NUMBER.is = function(instance, typeOf) {
    return (typeOf || typeof instance) === 'number';
  };
  NUMBER.sorts = {};
  NUMBER.sorts.max = fixed(Number.POSITIVE_INFINITY);
  NUMBER.sorts.min = fixed(Number.NEGATIVE_INFINITY);
  NUMBER.sorts.positive = {};
  NUMBER.sorts.positive.is = function(instance) {
    return instance >= 0;
  };
  NUMBER.sorts.negative = {};
  NUMBER.sorts.negative.is = function(instance) {
    return instance < 0;
  };
  Boundary.add(NUMBER);
  var DATE = sorts.date = {};
  DATE.compare = collation.difference;
  DATE.is = function(instance) {
    return instance instanceof Date && instance.valueOf() === instance.valueOf();
  };
  DATE.sorts = {};
  DATE.sorts.positive = {};
  DATE.sorts.positive.is = function(instance) {
    return instance.valueOf() >= 0;
  };
  DATE.sorts.negative = {};
  DATE.sorts.negative.is = function(instance) {
    return instance.valueOf() < 0;
  };
  Boundary.add(DATE);
  var BINARY = sorts.binary = {};
  BINARY.empty = new Buffer([]);
  BINARY.compare = collation.bitwise;
  BINARY.is = Buffer.isBuffer;
  Boundary.add(BINARY);
  var STRING = sorts.string = {};
  STRING.empty = '';
  STRING.compare = collation.inequality;
  STRING.is = function(instance, typeOf) {
    return (typeOf || typeof instance) === 'string';
  };
  Boundary.add(STRING);
  var ARRAY = sorts.array = {};
  ARRAY.empty = [];
  ARRAY.compare = collation.recursive.elementwise(base.compare);
  ARRAY.is = Array.isArray;
  Boundary.add(ARRAY);
  base.order = [];
  for (var key in sorts) {
    base.order.push(key);
  }
  module.exports = base;
})(require('buffer').Buffer);
