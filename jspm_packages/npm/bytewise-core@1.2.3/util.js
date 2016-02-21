/* */ 
(function(Buffer) {
  var util = exports;
  util.compare = require('typewise-core/collation').bitwise;
  util.equal = function(a, b) {
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b))
      return;
    if (a === b)
      return true;
    if (typeof a.equals === 'function')
      return a.equals(b);
    return util.compare(a, b) === 0;
  };
  var assert = util.assert = function(test, message) {
    if (!test)
      throw new TypeError(message);
  };
  var FLOAT_LENGTH = 8;
  util.invertBytes = function(buffer) {
    var bytes = [];
    for (var i = 0,
        end = buffer.length; i < end; ++i) {
      bytes.push(~buffer[i]);
    }
    return new Buffer(bytes);
  };
  util.encodeFloat = function(value) {
    var buffer = new Buffer(FLOAT_LENGTH);
    if (value < 0) {
      buffer.writeDoubleBE(-value.valueOf(), 0);
      return util.invertBytes(buffer);
    }
    buffer.writeDoubleBE(value.valueOf() || 0, 0);
    return buffer;
  };
  util.decodeFloat = function(buffer, base, negative) {
    assert(buffer.length === FLOAT_LENGTH, 'Invalid float encoding length');
    if (negative)
      buffer = util.invertBytes(buffer);
    var value = buffer.readDoubleBE(0);
    return negative ? -value : value;
  };
  var SKIP_HIGH_BYTES = {};
  util.escapeFlat = function(buffer, options) {
    var b,
        bytes = [];
    for (var i = 0,
        end = buffer.length; i < end; ++i) {
      b = buffer[i];
      if (b === 0x01 || b === 0x00)
        bytes.push(0x01, b + 1);
      else if (options !== SKIP_HIGH_BYTES && (b === 0xfe || b === 0xff))
        bytes.push(0xfe, b - 1);
      else
        bytes.push(b);
    }
    return new Buffer(bytes);
  };
  util.unescapeFlat = function(buffer, options) {
    var b,
        bytes = [];
    for (var i = 0,
        end = buffer.length; i < end; ++i) {
      b = buffer[i];
      if (b === 0x01)
        bytes.push(buffer[++i] - 1);
      else if (options !== SKIP_HIGH_BYTES && b === 0xfe)
        bytes.push(buffer[++i] + 1);
      else
        bytes.push(b);
    }
    return new Buffer(bytes);
  };
  util.escapeFlatLow = function(buffer) {
    return util.escapeFlat(buffer, SKIP_HIGH_BYTES);
  };
  util.unescapeFlatLow = function(buffer) {
    return util.unescapeFlat(buffer, SKIP_HIGH_BYTES);
  };
  util.encodeList = function(source, base) {
    var buffers = [];
    var undecodable;
    for (var i = 0,
        end = source.length; i < end; ++i) {
      var buffer = base.encode(source[i], null);
      undecodable || (undecodable = buffer.undecodable);
      if (undecodable) {
        buffers.push(buffer);
        continue;
      }
      var sort = base.getType(buffer[0]);
      assert(sort, 'List encoding failure: ' + buffer);
      if (sort.codec && sort.codec.escape)
        buffers.push(sort.codec.escape(buffer), new Buffer([0x00]));
      else
        buffers.push(buffer);
    }
    buffers.push(new Buffer([0x00]));
    buffer = Buffer.concat(buffers);
    undecodable && (buffer.undecodable = undecodable);
    return buffer;
  };
  util.decodeList = function(buffer, base) {
    var result = util.parse(buffer, base);
    assert(result[1] === buffer.length, 'Invalid encoding');
    return result[0];
  };
  util.encodeHash = function(source, base) {
    var list = [];
    Object.keys(source).forEach(function(key) {
      list.push(key);
      list.push(source[key]);
    });
    return util.encodeList(list, base);
  };
  util.decodeHash = function(buffer, base) {
    var list = util.decodeList(buffer, base);
    var hash = Object.create(null);
    for (var i = 0,
        end = list.length; i < end; ++i) {
      hash[list[i]] = list[++i];
    }
    return hash;
  };
  util.parse = function(buffer, base, sort) {
    var codec = sort && sort.codec;
    var index,
        end;
    if (sort && !codec)
      return [base.decode(new Buffer([sort.byte]), null), 0];
    if (codec && codec.parse)
      return codec.parse(buffer, base, sort);
    var length = codec && codec.length;
    if (typeof length === 'number')
      return [codec.decode(buffer.slice(0, length)), length];
    if (codec && codec.unescape) {
      for (index = 0, end = buffer.length; index < end; ++index) {
        if (buffer[index] === 0x00)
          break;
      }
      assert(index < buffer.length, 'No closing byte found for sequence');
      var unescaped = codec.unescape(buffer.slice(0, index));
      return [codec.decode(unescaped), index + 1];
    }
    index = 0;
    var list = [];
    var next;
    while ((next = buffer[index]) !== 0x00) {
      sort = base.getType(next);
      var result = util.parse(buffer.slice(index + 1), base, sort);
      list.push(result[0]);
      index += result[1] + 1;
      assert(index < buffer.length, 'No closing byte found for nested sequence');
    }
    return [list, index + 1];
  };
  function encodeBound(data, base) {
    var prefix = data.prefix;
    var buffer = prefix ? base.encode(prefix, null) : new Buffer([data.byte]);
    if (data.upper)
      buffer = Buffer.concat([buffer, new Buffer([0xff])]);
    return util.encodedBound(data, buffer);
  }
  util.encodeBound = function(data, base) {
    return util.encodedBound(data, encodeBound(data, base));
  };
  util.encodeBaseBound = function(data, base) {
    return util.encodedBound(data, new Buffer([data.upper ? 0xff : 0x00]));
  };
  util.encodeListBound = function(data, base) {
    var buffer = encodeBound(data, base);
    if (data.prefix) {
      var endByte = buffer[buffer.length - 1];
      buffer = buffer.slice(0, -1);
      if (data.upper)
        buffer[buffer.length - 1] = endByte;
    }
    return util.encodedBound(data, buffer);
  };
  util.encodedBound = function(data, buffer) {
    buffer.undecodable = true;
    return buffer;
  };
})(require('buffer').Buffer);
