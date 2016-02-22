System.register(['aurelia-event-aggregator', 'aurelia-framework'], function (_export) {
  'use strict';

  var EventAggregator, inject, History;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }],
    execute: function () {
      History = (function () {
        function History(events) {
          _classCallCheck(this, _History);

          this.heading = 'History';
          this.selectedDay = Date.now();

          this.events = events;
        }

        var _History = History;
        History = inject(EventAggregator)(History) || History;
        return History;
      })();

      _export('default', History);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2hpc3RvcnkvaGlzdG9yeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7K0JBSXFCLE9BQU87Ozs7OztnREFKcEIsZUFBZTs7aUNBQ2YsTUFBTTs7O0FBR08sYUFBTztBQUlmLGlCQUpRLE9BQU8sQ0FJZCxNQUFNLEVBQUU7OztlQUhwQixPQUFPLEdBQUcsU0FBUztlQUNuQixXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTs7QUFHdkIsY0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDckI7O3VCQU5rQixPQUFPO0FBQVAsZUFBTyxHQUQzQixNQUFNLENBQUMsZUFBZSxDQUFDLENBQ0gsT0FBTyxLQUFQLE9BQU87ZUFBUCxPQUFPOzs7eUJBQVAsT0FBTyIsImZpbGUiOiJwYWdlcy9oaXN0b3J5L2hpc3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50QWdncmVnYXRvcn0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5cbkBpbmplY3QoRXZlbnRBZ2dyZWdhdG9yKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGlzdG9yeSB7XG4gIGhlYWRpbmcgPSAnSGlzdG9yeSc7XG4gIHNlbGVjdGVkRGF5ID0gRGF0ZS5ub3coKTtcblxuICBjb25zdHJ1Y3RvcihldmVudHMpIHtcbiAgXHR0aGlzLmV2ZW50cyA9IGV2ZW50cztcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
