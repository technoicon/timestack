/* */ 
(function(Buffer) {
  'use strict';
  var arrayBuffPrefix = 'ArrayBuffer:';
  var arrayBuffRegex = new RegExp('^' + arrayBuffPrefix);
  var uintPrefix = 'Uint8Array:';
  var uintRegex = new RegExp('^' + uintPrefix);
  var bufferPrefix = 'Buff:';
  var bufferRegex = new RegExp('^' + bufferPrefix);
  var utils = require('./utils');
  var DatabaseCore = require('./database-core');
  var TaskQueue = require('./taskqueue');
  var d64 = require('d64');
  function Database(dbname) {
    this._store = new DatabaseCore(dbname);
    this._queue = new TaskQueue();
  }
  Database.prototype.sequentialize = function(callback, fun) {
    this._queue.add(fun, callback);
  };
  Database.prototype.init = function(callback) {
    var self = this;
    self.sequentialize(callback, function(callback) {
      self._store.getKeys(function(err, keys) {
        if (err) {
          return callback(err);
        }
        self._keys = keys;
        return callback();
      });
    });
  };
  Database.prototype.keys = function(callback) {
    var self = this;
    self.sequentialize(callback, function(callback) {
      callback(null, self._keys.slice());
    });
  };
  Database.prototype.setItem = function(key, value, callback) {
    var self = this;
    self.sequentialize(callback, function(callback) {
      if (Buffer.isBuffer(value)) {
        value = bufferPrefix + d64.encode(value);
      }
      var idx = utils.sortedIndexOf(self._keys, key);
      if (self._keys[idx] !== key) {
        self._keys.splice(idx, 0, key);
      }
      self._store.put(key, value, callback);
    });
  };
  Database.prototype.getItem = function(key, callback) {
    var self = this;
    self.sequentialize(callback, function(callback) {
      self._store.get(key, function(err, retval) {
        if (err) {
          return callback(err);
        }
        if (typeof retval === 'undefined' || retval === null) {
          return callback(new Error('NotFound'));
        }
        if (typeof retval !== 'undefined') {
          if (bufferRegex.test(retval)) {
            retval = d64.decode(retval.substring(bufferPrefix.length));
          } else if (arrayBuffRegex.test(retval)) {
            retval = retval.substring(arrayBuffPrefix.length);
            retval = new ArrayBuffer(atob(retval).split('').map(function(c) {
              return c.charCodeAt(0);
            }));
          } else if (uintRegex.test(retval)) {
            retval = retval.substring(uintPrefix.length);
            retval = new Uint8Array(atob(retval).split('').map(function(c) {
              return c.charCodeAt(0);
            }));
          }
        }
        callback(null, retval);
      });
    });
  };
  Database.prototype.removeItem = function(key, callback) {
    var self = this;
    self.sequentialize(callback, function(callback) {
      var idx = utils.sortedIndexOf(self._keys, key);
      if (self._keys[idx] === key) {
        self._keys.splice(idx, 1);
        self._store.remove(key, function(err) {
          if (err) {
            return callback(err);
          }
          callback();
        });
      } else {
        callback();
      }
    });
  };
  Database.prototype.length = function(callback) {
    var self = this;
    self.sequentialize(callback, function(callback) {
      callback(null, self._keys.length);
    });
  };
  module.exports = Database;
})(require('buffer').Buffer);
