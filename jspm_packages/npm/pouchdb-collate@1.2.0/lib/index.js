/* */ 
'use strict';
var MIN_MAGNITUDE = -324;
var MAGNITUDE_DIGITS = 3;
var SEP = '';
var utils = require('./utils');
exports.collate = function(a, b) {
  if (a === b) {
    return 0;
  }
  a = exports.normalizeKey(a);
  b = exports.normalizeKey(b);
  var ai = collationIndex(a);
  var bi = collationIndex(b);
  if ((ai - bi) !== 0) {
    return ai - bi;
  }
  if (a === null) {
    return 0;
  }
  switch (typeof a) {
    case 'number':
      return a - b;
    case 'boolean':
      return a === b ? 0 : (a < b ? -1 : 1);
    case 'string':
      return stringCollate(a, b);
  }
  return Array.isArray(a) ? arrayCollate(a, b) : objectCollate(a, b);
};
exports.normalizeKey = function(key) {
  switch (typeof key) {
    case 'undefined':
      return null;
    case 'number':
      if (key === Infinity || key === -Infinity || isNaN(key)) {
        return null;
      }
      return key;
    case 'object':
      var origKey = key;
      if (Array.isArray(key)) {
        var len = key.length;
        key = new Array(len);
        for (var i = 0; i < len; i++) {
          key[i] = exports.normalizeKey(origKey[i]);
        }
      } else if (key instanceof Date) {
        return key.toJSON();
      } else if (key !== null) {
        key = {};
        for (var k in origKey) {
          if (origKey.hasOwnProperty(k)) {
            var val = origKey[k];
            if (typeof val !== 'undefined') {
              key[k] = exports.normalizeKey(val);
            }
          }
        }
      }
  }
  return key;
};
function indexify(key) {
  if (key !== null) {
    switch (typeof key) {
      case 'boolean':
        return key ? 1 : 0;
      case 'number':
        return numToIndexableString(key);
      case 'string':
        return key.replace(/\u0002/g, '\u0002\u0002').replace(/\u0001/g, '\u0001\u0002').replace(/\u0000/g, '\u0001\u0001');
      case 'object':
        var isArray = Array.isArray(key);
        var arr = isArray ? key : Object.keys(key);
        var i = -1;
        var len = arr.length;
        var result = '';
        if (isArray) {
          while (++i < len) {
            result += exports.toIndexableString(arr[i]);
          }
        } else {
          while (++i < len) {
            var objKey = arr[i];
            result += exports.toIndexableString(objKey) + exports.toIndexableString(key[objKey]);
          }
        }
        return result;
    }
  }
  return '';
}
exports.toIndexableString = function(key) {
  var zero = '\u0000';
  key = exports.normalizeKey(key);
  return collationIndex(key) + SEP + indexify(key) + zero;
};
function parseNumber(str, i) {
  var originalIdx = i;
  var num;
  var zero = str[i] === '1';
  if (zero) {
    num = 0;
    i++;
  } else {
    var neg = str[i] === '0';
    i++;
    var numAsString = '';
    var magAsString = str.substring(i, i + MAGNITUDE_DIGITS);
    var magnitude = parseInt(magAsString, 10) + MIN_MAGNITUDE;
    if (neg) {
      magnitude = -magnitude;
    }
    i += MAGNITUDE_DIGITS;
    while (true) {
      var ch = str[i];
      if (ch === '\u0000') {
        break;
      } else {
        numAsString += ch;
      }
      i++;
    }
    numAsString = numAsString.split('.');
    if (numAsString.length === 1) {
      num = parseInt(numAsString, 10);
    } else {
      num = parseFloat(numAsString[0] + '.' + numAsString[1]);
    }
    if (neg) {
      num = num - 10;
    }
    if (magnitude !== 0) {
      num = parseFloat(num + 'e' + magnitude);
    }
  }
  return {
    num: num,
    length: i - originalIdx
  };
}
function pop(stack, metaStack) {
  var obj = stack.pop();
  if (metaStack.length) {
    var lastMetaElement = metaStack[metaStack.length - 1];
    if (obj === lastMetaElement.element) {
      metaStack.pop();
      lastMetaElement = metaStack[metaStack.length - 1];
    }
    var element = lastMetaElement.element;
    var lastElementIndex = lastMetaElement.index;
    if (Array.isArray(element)) {
      element.push(obj);
    } else if (lastElementIndex === stack.length - 2) {
      var key = stack.pop();
      element[key] = obj;
    } else {
      stack.push(obj);
    }
  }
}
exports.parseIndexableString = function(str) {
  var stack = [];
  var metaStack = [];
  var i = 0;
  while (true) {
    var collationIndex = str[i++];
    if (collationIndex === '\u0000') {
      if (stack.length === 1) {
        return stack.pop();
      } else {
        pop(stack, metaStack);
        continue;
      }
    }
    switch (collationIndex) {
      case '1':
        stack.push(null);
        break;
      case '2':
        stack.push(str[i] === '1');
        i++;
        break;
      case '3':
        var parsedNum = parseNumber(str, i);
        stack.push(parsedNum.num);
        i += parsedNum.length;
        break;
      case '4':
        var parsedStr = '';
        while (true) {
          var ch = str[i];
          if (ch === '\u0000') {
            break;
          }
          parsedStr += ch;
          i++;
        }
        parsedStr = parsedStr.replace(/\u0001\u0001/g, '\u0000').replace(/\u0001\u0002/g, '\u0001').replace(/\u0002\u0002/g, '\u0002');
        stack.push(parsedStr);
        break;
      case '5':
        var arrayElement = {
          element: [],
          index: stack.length
        };
        stack.push(arrayElement.element);
        metaStack.push(arrayElement);
        break;
      case '6':
        var objElement = {
          element: {},
          index: stack.length
        };
        stack.push(objElement.element);
        metaStack.push(objElement);
        break;
      default:
        throw new Error('bad collationIndex or unexpectedly reached end of input: ' + collationIndex);
    }
  }
};
function arrayCollate(a, b) {
  var len = Math.min(a.length, b.length);
  for (var i = 0; i < len; i++) {
    var sort = exports.collate(a[i], b[i]);
    if (sort !== 0) {
      return sort;
    }
  }
  return (a.length === b.length) ? 0 : (a.length > b.length) ? 1 : -1;
}
function stringCollate(a, b) {
  return (a === b) ? 0 : ((a > b) ? 1 : -1);
}
function objectCollate(a, b) {
  var ak = Object.keys(a),
      bk = Object.keys(b);
  var len = Math.min(ak.length, bk.length);
  for (var i = 0; i < len; i++) {
    var sort = exports.collate(ak[i], bk[i]);
    if (sort !== 0) {
      return sort;
    }
    sort = exports.collate(a[ak[i]], b[bk[i]]);
    if (sort !== 0) {
      return sort;
    }
  }
  return (ak.length === bk.length) ? 0 : (ak.length > bk.length) ? 1 : -1;
}
function collationIndex(x) {
  var id = ['boolean', 'number', 'string', 'object'];
  var idx = id.indexOf(typeof x);
  if (~idx) {
    if (x === null) {
      return 1;
    }
    if (Array.isArray(x)) {
      return 5;
    }
    return idx < 3 ? (idx + 2) : (idx + 3);
  }
  if (Array.isArray(x)) {
    return 5;
  }
}
function numToIndexableString(num) {
  if (num === 0) {
    return '1';
  }
  var expFormat = num.toExponential().split(/e\+?/);
  var magnitude = parseInt(expFormat[1], 10);
  var neg = num < 0;
  var result = neg ? '0' : '2';
  var magForComparison = ((neg ? -magnitude : magnitude) - MIN_MAGNITUDE);
  var magString = utils.padLeft((magForComparison).toString(), '0', MAGNITUDE_DIGITS);
  result += SEP + magString;
  var factor = Math.abs(parseFloat(expFormat[0]));
  if (neg) {
    factor = 10 - factor;
  }
  var factorStr = factor.toFixed(20);
  factorStr = factorStr.replace(/\.?0+$/, '');
  result += SEP + factorStr;
  return result;
}
