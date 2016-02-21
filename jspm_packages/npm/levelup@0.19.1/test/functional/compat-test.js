/* */ 
(function(process) {
  var async = require('async'),
      rimraf = require('rimraf'),
      path = require('path'),
      tarcommon = require('./tarcommon'),
      dbtar = path.join(__dirname, 'test-data.db.tar'),
      dblocation = path.join(__dirname, 'levelup_test_compat.db');
  function runTest(dbtar, callback) {
    async.series([rimraf.bind(null, tarcommon.dblocation), rimraf.bind(null, dblocation), rimraf.bind(null, tarcommon.datadir), tarcommon.extract.bind(null, dbtar, __dirname), tarcommon.extract.bind(null, tarcommon.datatar, tarcommon.datadir), tarcommon.opendb.bind(null, dblocation), tarcommon.verify, rimraf.bind(null, tarcommon.dblocation), rimraf.bind(null, dblocation), rimraf.bind(null, tarcommon.datadir)], callback);
  }
  console.log('***************************************************');
  console.log('RUNNING COMPAT-DATA-TEST...');
  runTest(dbtar, function(err) {
    if (err)
      throw err;
    console.log('No errors? All good then!');
    console.log('***************************************************');
    process.exit(err ? -1 : 0);
  });
})(require('process'));
