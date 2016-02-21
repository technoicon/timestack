/* */ 
(function(Buffer, process) {
  var util = require('util'),
      AbstractLevelDOWN = require('abstract-leveldown').AbstractLevelDOWN;
  function DeferredLevelDOWN(location) {
    AbstractLevelDOWN.call(this, typeof location == 'string' ? location : '');
    this._db = undefined;
    this._operations = [];
  }
  util.inherits(DeferredLevelDOWN, AbstractLevelDOWN);
  DeferredLevelDOWN.prototype.setDb = function(db) {
    this._db = db;
    this._operations.forEach(function(op) {
      db[op.method].apply(db, op.args);
    });
  };
  DeferredLevelDOWN.prototype._open = function(options, callback) {
    return process.nextTick(callback);
  };
  DeferredLevelDOWN.prototype._operation = function(method, args) {
    if (this._db)
      return this._db[method].apply(this._db, args);
    this._operations.push({
      method: method,
      args: args
    });
  };
  'put get del batch approximateSize'.split(' ').forEach(function(m) {
    DeferredLevelDOWN.prototype['_' + m] = function() {
      this._operation(m, arguments);
    };
  });
  DeferredLevelDOWN.prototype._isBuffer = function(obj) {
    return Buffer.isBuffer(obj);
  };
  DeferredLevelDOWN.prototype._iterator = function() {
    throw new TypeError('not implemented');
  };
  module.exports = DeferredLevelDOWN;
})(require('buffer').Buffer, require('process'));
