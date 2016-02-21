/* */ 
var tape = require('tape');
var sublevel = require('../index');
var level = require('level-test')();
tape('expose version', function(t) {
  t.equal(sublevel(level('level-sublevel-ver')).version, require('../package.json!systemjs-json').version);
  t.end();
});
