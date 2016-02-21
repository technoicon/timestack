/* */ 
(function(Buffer, process) {
  'use strict';
  function _interopDefault(ex) {
    return 'default' in ex ? ex['default'] : ex;
  }
  var pouchdbCollate = require('pouchdb-collate');
  var lie = _interopDefault(require('lie'));
  var crypto = _interopDefault(require('@empty'));
  var getArguments = _interopDefault(require('argsarray'));
  var PouchPromise = typeof Promise === 'function' ? Promise : lie;
  function isBinaryObject(object) {
    return object instanceof Buffer;
  }
  function cloneBinaryObject(object) {
    var copy = new Buffer(object.length);
    object.copy(copy);
    return copy;
  }
  function clone(object) {
    var newObject;
    var i;
    var len;
    if (!object || typeof object !== 'object') {
      return object;
    }
    if (Array.isArray(object)) {
      newObject = [];
      for (i = 0, len = object.length; i < len; i++) {
        newObject[i] = clone(object[i]);
      }
      return newObject;
    }
    if (object instanceof Date) {
      return object.toISOString();
    }
    if (isBinaryObject(object)) {
      return cloneBinaryObject(object);
    }
    newObject = {};
    for (i in object) {
      if (Object.prototype.hasOwnProperty.call(object, i)) {
        var value = clone(object[i]);
        if (typeof value !== 'undefined') {
          newObject[i] = value;
        }
      }
    }
    return newObject;
  }
  function once(fun) {
    var called = false;
    return getArguments(function(args) {
      if (called) {
        throw new Error('once called more than once');
      } else {
        called = true;
        fun.apply(this, args);
      }
    });
  }
  function toPromise(func) {
    return getArguments(function(args) {
      args = clone(args);
      var self = this;
      var tempCB = (typeof args[args.length - 1] === 'function') ? args.pop() : false;
      var usedCB;
      if (tempCB) {
        usedCB = function(err, resp) {
          process.nextTick(function() {
            tempCB(err, resp);
          });
        };
      }
      var promise = new PouchPromise(function(fulfill, reject) {
        var resp;
        try {
          var callback = once(function(err, mesg) {
            if (err) {
              reject(err);
            } else {
              fulfill(mesg);
            }
          });
          args.push(callback);
          resp = func.apply(self, args);
          if (resp && typeof resp.then === 'function') {
            fulfill(resp);
          }
        } catch (e) {
          reject(e);
        }
      });
      if (usedCB) {
        promise.then(function(result) {
          usedCB(null, result);
        }, usedCB);
      }
      return promise;
    });
  }
  var res = toPromise(function(data, callback) {
    var base64 = crypto.createHash('md5').update(data).digest('base64');
    callback(null, base64);
  });
  function sortObjectPropertiesByKey(queryParams) {
    return Object.keys(queryParams).sort(pouchdbCollate.collate).reduce(function(result, key) {
      result[key] = queryParams[key];
      return result;
    }, {});
  }
  function generateReplicationId(src, target, opts) {
    var docIds = opts.doc_ids ? opts.doc_ids.sort(pouchdbCollate.collate) : '';
    var filterFun = opts.filter ? opts.filter.toString() : '';
    var queryParams = '';
    var filterViewName = '';
    if (opts.filter && opts.query_params) {
      queryParams = JSON.stringify(sortObjectPropertiesByKey(opts.query_params));
    }
    if (opts.filter && opts.filter === '_view') {
      filterViewName = opts.view.toString();
    }
    return PouchPromise.all([src.id(), target.id()]).then(function(res$$) {
      var queryData = res$$[0] + res$$[1] + filterFun + filterViewName + queryParams + docIds;
      return res(queryData);
    }).then(function(md5sum) {
      md5sum = md5sum.replace(/\//g, '.').replace(/\+/g, '_');
      return '_local/' + md5sum;
    });
  }
  module.exports = generateReplicationId;
})(require('buffer').Buffer, require('process'));
