/* */ 
var extend = require('xtend'),
    LevelUPError = require('./errors').LevelUPError,
    encodings = require('./encodings'),
    defaultOptions = {
      createIfMissing: true,
      errorIfExists: false,
      keyEncoding: 'utf8',
      valueEncoding: 'utf8',
      compression: true
    },
    leveldown,
    encodingOpts = (function() {
      var eo = {};
      for (var e in encodings)
        eo[e] = {valueEncoding: encodings[e]};
      return eo;
    }());
function copy(srcdb, dstdb, callback) {
  srcdb.readStream().pipe(dstdb.writeStream()).on('close', callback ? callback : function() {}).on('error', callback ? callback : function(err) {
    throw err;
  });
}
function getOptions(levelup, options) {
  var s = typeof options == 'string';
  if (!s && options && options.encoding && !options.valueEncoding)
    options.valueEncoding = options.encoding;
  return extend((levelup && levelup.options) || {}, s ? encodingOpts[options] || encodingOpts[defaultOptions.valueEncoding] : options);
}
function getLevelDOWN() {
  if (leveldown)
    return leveldown;
  var requiredVersion = require('../package.json!systemjs-json').devDependencies.leveldown,
      missingLevelDOWNError = 'Could not locate LevelDOWN, try `npm install leveldown`',
      leveldownVersion;
  try {
    leveldownVersion = require('@empty/package').version;
  } catch (e) {
    throw new LevelUPError(missingLevelDOWNError);
  }
  if (!require('@empty').satisfies(leveldownVersion, requiredVersion)) {
    throw new LevelUPError('Installed version of LevelDOWN (' + leveldownVersion + ') does not match required version (' + requiredVersion + ')');
  }
  try {
    return leveldown = require('@empty');
  } catch (e) {
    throw new LevelUPError(missingLevelDOWNError);
  }
}
function dispatchError(levelup, error, callback) {
  return typeof callback == 'function' ? callback(error) : levelup.emit('error', error);
}
function isDefined(v) {
  return typeof v !== 'undefined';
}
module.exports = {
  defaultOptions: defaultOptions,
  copy: copy,
  getOptions: getOptions,
  getLevelDOWN: getLevelDOWN,
  dispatchError: dispatchError,
  isDefined: isDefined
};
