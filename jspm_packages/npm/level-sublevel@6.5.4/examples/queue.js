/* */ 
(function(process) {
  var shasum = require('shasum');
  module.exports = function(input, jobs, map, work) {
    if (!work)
      work = map, map = function(data) {
        return data.key;
      };
    var pending = {},
        running = {};
    if ('string' === typeof jobs)
      jobs = input.sublevel(jobs);
    var retry = [];
    function doJob(data) {
      if (!data.value)
        return;
      var hash = shasum(data.value);
      if (!running[hash])
        running[hash] = true;
      else
        return;
      var done = false;
      work(data.value, function(err) {
        if (done)
          return;
        done = true;
        if (err) {
          running[hash];
          return setTimeout(function() {
            doJob(data);
          }, 500);
        }
        jobs.del(data.key, function(err) {
          if (err)
            return retry.push(data);
          delete running[hash];
          if (pending[hash]) {
            delete pending[hash];
            doJob(data);
          }
        });
      });
    }
    input.pre(function(ch, add) {
      var key = map(ch);
      var hash = shasum(key);
      console.log('KEY', key);
      if (!pending[hash])
        add({
          key: Date.now(),
          value: key,
          type: 'put'
        }, jobs);
      else
        pending[hash] = (0 || pending[hash]) + 1;
    });
    jobs.createReadStream().on('data', doJob);
    jobs.post(doJob);
    return jobs;
  };
})(require('process'));
