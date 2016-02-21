/* */ 
var pull = require('../index');
var test = require('tape');
test('join through streams with pipe', function(t) {
  var map = pull.map;
  var pipeline = map(function(d) {
    return d + '!';
  }).pipe(map(function(d) {
    return d.toUpperCase();
  })).pipe(map(function(d) {
    return '*** ' + d + ' ***';
  }));
  t.equal('function', typeof pipeline);
  t.equal(1, pipeline.length);
  var read = pull.readArray(['billy', 'joe', 'zeke']).pipe(pipeline);
  t.equal('function', typeof read);
  t.equal(2, read.length);
  read.pipe(pull.writeArray(function(err, array) {
    console.log(array);
    t.deepEqual(array, ['*** BILLY! ***', '*** JOE! ***', '*** ZEKE! ***']);
    t.end();
  }));
});
