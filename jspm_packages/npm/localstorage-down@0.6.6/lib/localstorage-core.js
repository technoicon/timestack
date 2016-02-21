/* */ 
(function(process) {
  'use strict';
  var nextTick = global.setImmediate || process.nextTick;
  var storage = require('humble-localstorage');
  function callbackify(callback, fun) {
    var val;
    var err;
    try {
      val = fun();
    } catch (e) {
      err = e;
    }
    nextTick(function() {
      callback(err, val);
    });
  }
  function createPrefix(dbname) {
    return dbname.replace(/!/g, '!!') + '!';
  }
  function LocalStorageCore(dbname) {
    this._prefix = createPrefix(dbname);
  }
  LocalStorageCore.prototype.getKeys = function(callback) {
    var self = this;
    callbackify(callback, function() {
      var keys = [];
      var prefixLen = self._prefix.length;
      var i = -1;
      var len = storage.length;
      while (++i < len) {
        var fullKey = storage.key(i);
        if (fullKey.substring(0, prefixLen) === self._prefix) {
          keys.push(fullKey.substring(prefixLen));
        }
      }
      keys.sort();
      return keys;
    });
  };
  LocalStorageCore.prototype.put = function(key, value, callback) {
    var self = this;
    callbackify(callback, function() {
      storage.setItem(self._prefix + key, value);
    });
  };
  LocalStorageCore.prototype.get = function(key, callback) {
    var self = this;
    callbackify(callback, function() {
      return storage.getItem(self._prefix + key);
    });
  };
  LocalStorageCore.prototype.remove = function(key, callback) {
    var self = this;
    callbackify(callback, function() {
      storage.removeItem(self._prefix + key);
    });
  };
  LocalStorageCore.destroy = function(dbname, callback) {
    var prefix = createPrefix(dbname);
    callbackify(callback, function() {
      var keysToDelete = [];
      var i = -1;
      var len = storage.length;
      while (++i < len) {
        var key = storage.key(i);
        if (key.substring(0, prefix.length) === prefix) {
          keysToDelete.push(key);
        }
      }
      keysToDelete.forEach(function(key) {
        storage.removeItem(key);
      });
    });
  };
  module.exports = LocalStorageCore;
})(require('process'));
