System.register(['aurelia-event-aggregator', 'aurelia-framework', 'services/pouch/pouch.js'], function (_export) {
  'use strict';

  var EventAggregator, inject, Pouch, History;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_servicesPouchPouchJs) {
      Pouch = _servicesPouchPouchJs.Pouch;
    }],
    execute: function () {
      History = (function () {
        function History(pouch, events) {
          _classCallCheck(this, _History);

          this.heading = 'History';
          this.selectedDay = Date.now();
          this.dayTasks = null;

          this.pouch = pouch;
          this.events = events;
        }

        _createClass(History, [{
          key: 'activate',
          value: function activate() {
            this.init();
          }
        }, {
          key: 'init',
          value: function init() {}
        }, {
          key: 'getTotalTime',
          value: function getTotalTime(task, includeRunning) {
            var ret = 0;
            var runningInterval = 0;

            try {
              runningInterval = this.timers[task._id].seconds;
            } catch (ex) {}

            var previousIntervals = 0;

            if (task.intervals) {
              task.intervals.forEach(function (i) {
                if (i.start && i.stop) {
                  previousIntervals += Math.floor((i.stop - i.start) / 1000);
                }
              });
            }

            if (includeRunning) {
              return previousIntervals + runningInterval;
            } else {
              return previousIntervals;
            }
          }
        }]);

        var _History = History;
        History = inject(Pouch, EventAggregator)(History) || History;
        return History;
      })();

      _export('default', History);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2hpc3RvcnkvaGlzdG9yeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7c0NBS3FCLE9BQU87Ozs7Ozs7O2dEQUxwQixlQUFlOztpQ0FDZixNQUFNOztvQ0FDTixLQUFLOzs7QUFHUSxhQUFPO0FBS2YsaUJBTFEsT0FBTyxDQUtkLEtBQUssRUFBQyxNQUFNLEVBQUU7OztlQUoxQixPQUFPLEdBQUcsU0FBUztlQUNuQixXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTtlQUN4QixRQUFRLEdBQUcsSUFBSTs7QUFHZCxjQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixjQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztTQUNyQjs7cUJBUmtCLE9BQU87O2lCQVVsQixvQkFBRztBQUNWLGdCQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7V0FDWjs7O2lCQUVHLGdCQUFHLEVBRU47OztpQkFFVyxzQkFBRSxJQUFJLEVBQUUsY0FBYyxFQUFHO0FBQ25DLGdCQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDWixnQkFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDOztBQUV4QixnQkFBSTtBQUNGLDZCQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO2FBQ2pELENBQUMsT0FBTSxFQUFFLEVBQUUsRUFBNkI7O0FBRXpDLGdCQUFJLGlCQUFpQixHQUFHLENBQUMsQ0FBQzs7QUFFMUIsZ0JBQUksSUFBSSxDQUFDLFNBQVMsRUFBRztBQUNuQixrQkFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUUsVUFBQSxDQUFDLEVBQUk7QUFDM0Isb0JBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFHO0FBQ3RCLG1DQUFpQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUEsR0FBSSxJQUFJLENBQUMsQ0FBQztpQkFDNUQ7ZUFDRixDQUFDLENBQUM7YUFDSjs7QUFFRCxnQkFBSSxjQUFjLEVBQUc7QUFDbkIscUJBQU8saUJBQWlCLEdBQUcsZUFBZSxDQUFDO2FBQzVDLE1BQU07QUFDTCxxQkFBTyxpQkFBaUIsQ0FBQzthQUMxQjtXQUNGOzs7dUJBekNrQixPQUFPO0FBQVAsZUFBTyxHQUQzQixNQUFNLENBQUMsS0FBSyxFQUFDLGVBQWUsQ0FBQyxDQUNULE9BQU8sS0FBUCxPQUFPO2VBQVAsT0FBTzs7O3lCQUFQLE9BQU8iLCJmaWxlIjoicGFnZXMvaGlzdG9yeS9oaXN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEFnZ3JlZ2F0b3J9IGZyb20gJ2F1cmVsaWEtZXZlbnQtYWdncmVnYXRvcic7XG5pbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtQb3VjaH0gZnJvbSAnc2VydmljZXMvcG91Y2gvcG91Y2guanMnO1xuXG5AaW5qZWN0KFBvdWNoLEV2ZW50QWdncmVnYXRvcilcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpc3Rvcnkge1xuICBoZWFkaW5nID0gJ0hpc3RvcnknO1xuICBzZWxlY3RlZERheSA9IERhdGUubm93KCk7XG4gIGRheVRhc2tzID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwb3VjaCxldmVudHMpIHtcbiAgXHR0aGlzLnBvdWNoID0gcG91Y2g7XG4gIFx0dGhpcy5ldmVudHMgPSBldmVudHM7XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgXHR0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG5cbiAgfVxuXG4gIGdldFRvdGFsVGltZSggdGFzaywgaW5jbHVkZVJ1bm5pbmcgKSB7XG4gICAgbGV0IHJldCA9IDA7XG4gICAgbGV0IHJ1bm5pbmdJbnRlcnZhbCA9IDA7XG5cbiAgICB0cnkge1xuICAgICAgcnVubmluZ0ludGVydmFsID0gdGhpcy50aW1lcnNbdGFzay5faWRdLnNlY29uZHM7XG4gICAgfSBjYXRjaChleCkgey8qIHNoaGguLi5pJ20gaW4gYSBodXJyeSAqL31cblxuICAgIGxldCBwcmV2aW91c0ludGVydmFscyA9IDA7XG5cbiAgICBpZiggdGFzay5pbnRlcnZhbHMgKSB7XG4gICAgICB0YXNrLmludGVydmFscy5mb3JFYWNoKCBpID0+IHtcbiAgICAgICAgaWYoIGkuc3RhcnQgJiYgaS5zdG9wICkge1xuICAgICAgICAgIHByZXZpb3VzSW50ZXJ2YWxzICs9IE1hdGguZmxvb3IoKGkuc3RvcCAtIGkuc3RhcnQpIC8gMTAwMCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmKCBpbmNsdWRlUnVubmluZyApIHtcbiAgICAgIHJldHVybiBwcmV2aW91c0ludGVydmFscyArIHJ1bm5pbmdJbnRlcnZhbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHByZXZpb3VzSW50ZXJ2YWxzOyAgXG4gICAgfVxuICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
