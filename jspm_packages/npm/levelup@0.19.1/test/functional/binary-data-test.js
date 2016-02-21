/* */ 
(function(process) {
  var async = require('async'),
      rimraf = require('rimraf'),
      tarcommon = require('./tarcommon');
  console.log('***************************************************');
  console.log('RUNNING BINARY-DATA-TEST...');
  async.series([rimraf.bind(null, tarcommon.dblocation), rimraf.bind(null, tarcommon.datadir), tarcommon.extract.bind(null, tarcommon.datatar, tarcommon.datadir), tarcommon.opendb.bind(null, tarcommon.dblocation), tarcommon.fstreamWrite, tarcommon.sync, tarcommon.verify, rimraf.bind(null, tarcommon.dblocation), rimraf.bind(null, tarcommon.datadir)], function(err) {
    if (err)
      console.error('Error', err);
    else
      console.log('No errors? All good then!');
    console.log('***************************************************');
    process.exit(err ? -1 : 0);
  });
})(require('process'));
