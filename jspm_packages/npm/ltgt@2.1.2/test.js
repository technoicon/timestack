/* */ 
var tape = require('tape');
var ltgt = require('./index');
function clone(o) {
  var O = {};
  for (var k in o)
    O[k] = o[k];
  return O;
}
var elements = [1, 2, 3, 4, 5];
var ranges = [{
  range: {},
  selection: elements
}, {
  range: {reverse: true},
  selection: elements.slice().reverse()
}, {
  range: {start: 2},
  selection: [2, 3, 4, 5]
}, {
  range: {
    start: 2,
    reverse: true
  },
  selection: [2, 1]
}, {
  range: {end: 2},
  selection: [1, 2]
}, {
  range: {
    end: 2,
    reverse: true
  },
  selection: [2, 3, 4, 5].reverse()
}, {
  range: {start: 2.5},
  selection: [3, 4, 5]
}, {
  range: {
    start: 2.5,
    reverse: true
  },
  selection: [2, 1]
}, {
  range: {
    end: 2.5,
    reverse: true
  },
  selection: [5, 4, 3]
}, {
  range: {start: 5},
  selection: [5]
}, {
  range: {start: 5.5},
  selection: []
}, {
  range: {end: 0.5},
  selection: []
}, {
  range: {
    start: 5.5,
    reverse: true
  },
  selection: [5, 4, 3, 2, 1]
}, {
  range: {
    end: 0.5,
    reverse: true
  },
  selection: [5, 4, 3, 2, 1]
}, {
  range: {
    end: null,
    reverse: true
  },
  selection: [5, 4, 3, 2, 1]
}, {
  range: {
    end: undefined,
    reverse: true
  },
  selection: [5, 4, 3, 2, 1]
}, {
  range: {
    end: '',
    reverse: true
  },
  selection: [5, 4, 3, 2, 1]
}, {
  range: {lt: 2.5},
  selection: [1, 2]
}, {
  range: {gt: 2.5},
  selection: [3, 4, 5]
}, {
  range: {lt: 2},
  selection: [1]
}, {
  range: {gt: 2},
  selection: [3, 4, 5]
}, {
  range: {lte: 2.5},
  selection: [1, 2]
}, {
  range: {gte: 2.5},
  selection: [3, 4, 5]
}, {
  range: {lte: 2},
  selection: [1, 2]
}, {
  range: {gte: 2},
  selection: [2, 3, 4, 5]
}, {
  range: {
    gt: 2.5,
    lt: 5
  },
  selection: [3, 4]
}, {
  range: {
    gte: 2,
    lt: 3.5
  },
  selection: [2, 3]
}, {
  range: {
    gt: 2.5,
    lte: 4
  },
  selection: [3, 4]
}, {
  range: {
    gte: 2,
    lte: 4
  },
  selection: [2, 3, 4]
}, {
  range: {
    min: 2,
    max: 4
  },
  selection: [2, 3, 4]
}, {
  range: {max: 2.5},
  selection: [1, 2]
}, {
  range: {min: 2.5},
  selection: [3, 4, 5]
}, {
  range: {max: 2},
  selection: [1, 2]
}, {
  range: {min: 2},
  selection: [2, 3, 4, 5]
}];
var strings = ['00', '01', '02'];
var sranges = [{
  range: {start: '00'},
  selection: ['00', '01', '02']
}, {
  range: {
    start: '03',
    reverse: true
  },
  selection: ['02', '01', '00']
}];
function compare(a, b) {
  return a - b;
}
make(elements, ranges);
make(strings, sranges);
make(elements.map(String), ranges.map(function(e) {
  var r = {};
  for (var k in e.range)
    if ('number' === typeof e.range[k])
      r[k] = e.range.toString();
  return {
    range: e.range,
    selection: e.selection.map(String)
  };
}));
function make(elements, ranges) {
  ranges.forEach(function(e) {
    tape(JSON.stringify(e.range) + ' => ' + JSON.stringify(e.selection), function(t) {
      var actual = elements.filter(ltgt.filter(e.range));
      if (e.range.reverse)
        actual.reverse();
      t.deepEqual(actual, e.selection, 'test range:' + JSON.stringify(e.range));
      var range = ltgt.toLtgt(e.range);
      t.notOk(range.min || range.max || range.start || range.end);
      var actual2 = elements.filter(ltgt.filter(range));
      if (e.range.reverse)
        actual2.reverse();
      t.deepEqual(actual2, e.selection);
      t.end();
    });
  });
}
tape('upperBound', function(t) {
  t.equal('b', ltgt.upperBound({
    start: 'b',
    reverse: true
  }));
  t.equal('b', ltgt.upperBound({
    end: 'b',
    reverse: false
  }));
  t.equal(undefined, ltgt.lowerBound({
    start: 'b',
    reverse: true
  }));
  t.equal(undefined, ltgt.lowerBound({
    end: 'b',
    reverse: false
  }));
  t.end();
});
function createLtgtTests(mutate) {
  return function(t) {
    function map(key) {
      return 'foo!' + key;
    }
    function T(expected, input) {
      input = clone(input);
      t.deepEqual(expected, ltgt.toLtgt(input, mutate ? input : null, map, '!', '~'));
    }
    T({
      gte: 'foo!a',
      lte: 'foo!b'
    }, {
      start: 'a',
      end: 'b'
    });
    T({
      gte: 'foo!a',
      lte: 'foo!~'
    }, {start: 'a'});
    T({
      gte: 'foo!!',
      lte: 'foo!b'
    }, {end: 'b'});
    T({
      gte: 'foo!a',
      lte: 'foo!b',
      reverse: true
    }, {
      start: 'b',
      end: 'a',
      reverse: true
    });
    T({
      gte: 'foo!a',
      lte: 'foo!b'
    }, {
      min: 'a',
      max: 'b'
    });
    T({
      gte: 'foo!a',
      lte: 'foo!~'
    }, {min: 'a'});
    T({
      gte: 'foo!!',
      lte: 'foo!b'
    }, {max: 'b'});
    T({
      gte: 'foo!!',
      lte: 'foo!~'
    }, {});
    T({
      gt: 'foo!a',
      lt: 'foo!b'
    }, {
      gt: 'a',
      lt: 'b'
    });
    T({
      gt: 'foo!a',
      lte: 'foo!~'
    }, {gt: 'a'});
    T({
      gte: 'foo!!',
      lt: 'foo!b'
    }, {lt: 'b'});
    T({
      gte: 'foo!!',
      lte: 'foo!~'
    }, {});
    T({
      gte: 'foo!a',
      lte: 'foo!b'
    }, {
      gte: 'a',
      lte: 'b'
    });
    T({
      gte: 'foo!a',
      lte: 'foo!~'
    }, {gte: 'a'});
    T({
      gte: 'foo!!',
      lte: 'foo!b'
    }, {lte: 'b'});
    T({
      gte: 'foo!!',
      lte: 'foo!~'
    }, {});
    t.end();
  };
}
tape('toLtgt - immutable', createLtgtTests(false));
tape('toLtgt - mutable', createLtgtTests(true));
