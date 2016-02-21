/* */ 
(function(Buffer, process) {
  var assert = require('./util').assert;
  var base = require('./base');
  var codecs = require('./codecs');
  var bytewise = exports;
  var sorts = bytewise.sorts = base.sorts;
  bytewise.bound = base.bound;
  bytewise.compare = base.compare;
  bytewise.equal = base.equal;
  function serialize(type, source, options) {
    var codec = type.codec;
    if (!codec)
      return postEncode(new Buffer([type.byte]), options);
    var buffer = codec.encode(source, bytewise);
    if (options && options.nested && codec.escape)
      buffer = codec.escape(buffer);
    var hint = typeof codec.length === 'number' ? (codec.length + 1) : void 0;
    var buffers = [new Buffer([type.byte]), buffer];
    return postEncode(Buffer.concat(buffers, hint), options);
  }
  bytewise.encode = function(source, options) {
    assert(!base.invalid(source), 'Invalid value');
    var boundary = base.bound.getBoundary(source);
    if (boundary)
      return boundary.encode(source, bytewise);
    var order = base.order;
    var sort;
    for (var i = 0,
        length = order.length; i < length; ++i) {
      sort = sorts[order[i]];
      if (sort.is(source)) {
        var subsorts = sort.sorts || {'': sort};
        for (key in subsorts) {
          var subsort = subsorts[key];
          if (subsort.is(source))
            return serialize(subsort, source, options);
        }
        assert(false, 'Unsupported sort value');
      }
    }
    assert(false, 'Unknown value');
  };
  bytewise.decode = function(buffer, options) {
    if (typeof buffer === 'string') {
      buffer = bytewise.stringCodec.encode(buffer);
    }
    assert(!buffer || !buffer.undecodable, 'Encoded value not decodable');
    var byte = buffer[0];
    var type = bytewise.getType(byte);
    assert(type, 'Invalid encoding: ' + buffer);
    var codec = type.codec;
    if (codec) {
      var decoded = codec.decode(buffer.slice(1), bytewise);
      if (options && options.nested && codec.unescape)
        decoded = codec.unescape(decoded);
      return postDecode(decoded, options);
    }
    assert('value' in type, 'Unsupported encoding: ' + buffer);
    return postDecode(type.value, options);
  };
  function postEncode(encoded, options) {
    if (options === null)
      return encoded;
    return bytewise.postEncode(encoded, options);
  }
  bytewise.postEncode = function(encoded, options) {
    encoded.toString = function(encoding) {
      if (!encoding)
        return bytewise.stringCodec.decode(encoded);
      return Buffer.prototype.toString.apply(encoded, arguments);
    };
    return encoded;
  };
  function postDecode(decoded, options) {
    if (options === null)
      return decoded;
    return bytewise.postDecode(decoded, options);
  }
  bytewise.postDecode = function(decoded, options) {
    return decoded;
  };
  var PREFIX_REGISTRY;
  function registerType(type) {
    var byte = type && type.byte;
    if (byte == null)
      return;
    if (byte in PREFIX_REGISTRY)
      assert.deepEqual(type, PREFIX_REGISTRY[byte], 'Duplicate prefix: ' + byte);
    PREFIX_REGISTRY[type.byte] = type;
  }
  function registerTypes(types) {
    for (var key in types) {
      registerType(types[key]);
    }
  }
  bytewise.getType = function(byte) {
    if (!PREFIX_REGISTRY) {
      PREFIX_REGISTRY = {};
      var sort;
      for (var key in sorts) {
        sort = sorts[key];
        sort.sorts ? registerTypes(sort.sorts) : registerType(sort);
      }
    }
    return PREFIX_REGISTRY[byte];
  };
  bytewise.buffer = true;
  bytewise.stringCodec = codecs.HEX;
  bytewise.type = 'bytewise-core';
})(require('buffer').Buffer, require('process'));
