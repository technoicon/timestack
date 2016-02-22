System.register(['services/pouch/pouch.js', 'aurelia-framework', 'aurelia-binding', 'node-uuid', 'aurelia-event-aggregator'], function (_export) {
  'use strict';

  var Pouch, inject, bindable, computedFrom, UUID, EventAggregator, Track;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  return {
    setters: [function (_servicesPouchPouchJs) {
      Pouch = _servicesPouchPouchJs.Pouch;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
    }, function (_aureliaBinding) {
      computedFrom = _aureliaBinding.computedFrom;
    }, function (_nodeUuid) {
      UUID = _nodeUuid;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }],
    execute: function () {
      Track = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(Track, [{
          key: 'showCompleted',
          decorators: [bindable],
          initializer: function initializer() {
            return false;
          },
          enumerable: true
        }], null, _instanceInitializers);

        function Track(pouch, events) {
          _classCallCheck(this, _Track);

          this.heading = 'Track';
          this.item_type = 'Task';
          this.isCreating = false;
          this.isEditing = false;
          this.editingTask = null;
          this.tasks = [];
          this.projects = [];
          this.timers = {};
          this.settings = null;
          this.taskInProgress = null;

          _defineDecoratedPropertyDescriptor(this, 'showCompleted', _instanceInitializers);

          this.today = Date.now();

          this.pouch = pouch;
          this.events = events;
        }

        _createDecoratedClass(Track, [{
          key: 'init',
          value: function init() {
            var _this = this;

            this.projects = [];
            this.tasks = [];

            this.pouch.getTasks(this.showCompleted).then(function (tasks) {
              tasks.forEach(function (t) {
                _this.tasks.push(t.doc);
              });

              _this.startTimersOnRunningTasks();
            });

            this.pouch.getProjects().then(function (projects) {
              projects.forEach(function (p) {
                _this.projects.push(p.doc);
              });
            });

            this.pouch.getSettings().then(function (s) {
              if (s) {
                _this.settings = s;
              } else {
                _this.pouch.createSettings().then(function (created) {

                  _this.settings = created;
                });
              }
            });
          }
        }, {
          key: 'activate',
          value: function activate() {
            this.init();
          }
        }, {
          key: 'showCompletedChanged',
          value: function showCompletedChanged() {
            this.init();
          }
        }, {
          key: 'startTimersOnRunningTasks',
          value: function startTimersOnRunningTasks() {
            var _this2 = this;

            this.tasks.forEach(function (t) {
              if (t.status === 'running') {
                _this2.initRunningTimer(t);
              }
            });
          }
        }, {
          key: 'initRunningTimer',
          value: function initRunningTimer(task) {
            var elapsed = Math.floor((Date.now() - task.intervals[task.intervals.length - 1].start) / 1000);
            this.addTimer(task, elapsed);
            this.taskInProgress = task;
          }
        }, {
          key: 'getBlankTask',
          value: function getBlankTask() {
            var pid = null;

            if (this.settings.default_project) {
              pid = this.settings.default_project;
            }

            return {
              name: null,
              desc: null,
              start_time: null,
              end_time: null,
              completed: false,
              project_id: pid
            };
          }
        }, {
          key: 'setProject',
          value: function setProject(task, project) {
            task.project_id = project._id;
          }
        }, {
          key: 'createTask',
          value: function createTask() {
            this.editingTask = this.getBlankTask();
            this.isCreating = true;
          }
        }, {
          key: 'editTask',
          value: function editTask(task) {
            this.editingTask = task;
            this.isEditing = true;
          }
        }, {
          key: 'cancelCreate',
          value: function cancelCreate() {
            console.log(this.tasks);
            this.isCreating = false;
          }
        }, {
          key: 'removeTask',
          value: function removeTask(task) {
            var _this3 = this;

            this.pouch.removeProject(task).then(function (t) {
              _this3.tasks = _this3.tasks.filter(function (p) {
                return p._id !== task._id;
              });
              _this3.isEditing = false;
              _this3.editingTask = null;
              _this3.events.publish('time-update-charts', {});
            });
          }
        }, {
          key: 'newTask',
          value: function newTask(task) {
            var _this4 = this;

            this.pouch.createTask(task.name, task.desc, task.project_id).then(function (task) {
              _this4.tasks.push(task);
              _this4.editingTask = null;
              _this4.isCreating = false;

              if (_this4.settings && _this4.settings.auto_start) {
                _this4.start(task);
              }
            });
          }
        }, {
          key: 'updateTask',
          value: function updateTask(task) {
            var _this5 = this;

            return this.pouch.updateTask(task).then(function (t) {
              _this5.editingTask = null;
              _this5.isEditing = false;
              return t;
            });
          }
        }, {
          key: 'completeTask',
          value: function completeTask(task) {
            var _this6 = this;

            task.completed = true;
            this.stop(task).then(function (t) {
              if (!_this6.showCompleted) {
                _this6.tasks = _this6.tasks.filter(function (tsk) {
                  return tsk._id !== task._id;
                });
              }
            });
          }
        }, {
          key: 'start',
          value: function start(task) {
            var _this7 = this;

            this.stopAll().then(function () {
              _this7.addTimer(task);

              task.status = 'running';
              var interval = {
                id: UUID.v4(),
                start: Date.now(),
                stop: null
              };

              task.intervals.push(interval);

              _this7.updateTask(task).then(function (t) {
                task = t;
                _this7.taskInProgress = task;
              });
            });
          }
        }, {
          key: 'stop',
          value: function stop(task, suppressSignal) {
            var _this8 = this;

            this.removeTimer(task);

            if (!suppressSignal) {
              this.events.publish('time-update-charts', {});
            }

            task.status = 'paused';

            var lastInterval = task.intervals[task.intervals.length - 1];

            if (lastInterval && !lastInterval.stop) {
              lastInterval.stop = Date.now();
            }

            return this.updateTask(task).then(function (t) {
              task = t;
              _this8.taskInProgress = null;
              return t;
            });
          }
        }, {
          key: 'stopAll',
          value: function stopAll() {
            var _this9 = this;

            var proms = [];

            this.tasks.forEach(function (t) {
              proms.push(_this9.stop(t, true));
            });

            return Promise.all(proms).then(function (done) {
              _this9.events.publish('time-update-charts', {});
            });
          }
        }, {
          key: 'addTimer',
          value: function addTimer(task, elapsed) {
            var _this10 = this;

            if (!elapsed) {
              elapsed = 0;
            }

            this.timers[task._id] = {
              timer: null,
              seconds: elapsed
            };

            var timer = window.setInterval(function () {
              _this10.timers[task._id].seconds += 1;

              _this10.timers[task._id].total = _this10.getTotalTime(task, true);
            }, 1000);
            this.timers[task._id].timer = timer;
          }
        }, {
          key: 'removeTimer',
          value: function removeTimer(task) {
            if (this.timers[task._id]) {
              window.clearInterval(this.timers[task._id].timer);
            }
          }
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
        }], null, _instanceInitializers);

        var _Track = Track;
        Track = inject(Pouch, EventAggregator)(Track) || Track;
        return Track;
      })();

      _export('default', Track);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUksSUFBSSxDQUFDLFNBQVMsRUFBRztBQUNuQixrQkFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUUsVUFBQSxDQUFDLEVBQUk7QUFDM0Isb0JBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFHO0FBQ3RCLG1DQUFpQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUEsR0FBSSxJQUFJLENBQUMsQ0FBQztpQkFDNUQ7ZUFDRixDQUFDLENBQUM7YUFDSjs7QUFFRCxnQkFBSSxjQUFjLEVBQUc7QUFDbkIscUJBQU8saUJBQWlCLEdBQUcsZUFBZSxDQUFDO2FBQzVDLE1BQU07QUFDTCxxQkFBTyxpQkFBaUIsQ0FBQzthQUMxQjtXQUNGOzs7cUJBNVBrQixLQUFLO0FBQUwsYUFBSyxHQUR6QixNQUFNLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUNWLEtBQUssS0FBTCxLQUFLO2VBQUwsS0FBSzs7O3lCQUFMLEtBQUsiLCJmaWxlIjoicGFnZXMvdHJhY2svdHJhY2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BvdWNofSBmcm9tICdzZXJ2aWNlcy9wb3VjaC9wb3VjaC5qcyc7XG5pbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtjb21wdXRlZEZyb219IGZyb20gJ2F1cmVsaWEtYmluZGluZyc7XG5pbXBvcnQgKiBhcyBVVUlEIGZyb20gJ25vZGUtdXVpZCc7XG5pbXBvcnQge2JpbmRhYmxlfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge0V2ZW50QWdncmVnYXRvcn0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcblxuQGluamVjdChQb3VjaCwgRXZlbnRBZ2dyZWdhdG9yKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJhY2sge1xuICBoZWFkaW5nID0gJ1RyYWNrJztcbiAgaXRlbV90eXBlID0gJ1Rhc2snO1xuICBpc0NyZWF0aW5nID0gZmFsc2U7XG4gIGlzRWRpdGluZyA9IGZhbHNlO1xuICBlZGl0aW5nVGFzayA9IG51bGw7XG4gIHRhc2tzID0gW107XG4gIHByb2plY3RzID0gW107XG4gIHRpbWVycyA9IHt9O1xuICBzZXR0aW5ncyA9IG51bGw7XG4gIHRhc2tJblByb2dyZXNzID0gbnVsbDtcbiAgQGJpbmRhYmxlIHNob3dDb21wbGV0ZWQgPSBmYWxzZTtcbiAgdG9kYXkgPSBEYXRlLm5vdygpO1xuXG4gIGNvbnN0cnVjdG9yKCBwb3VjaCwgZXZlbnRzICkge1xuICBcdHRoaXMucG91Y2ggPSBwb3VjaDtcbiAgICB0aGlzLmV2ZW50cyA9IGV2ZW50cztcbiAgfVxuXG4gIGluaXQoKSB7XG4gIFx0dGhpcy5wcm9qZWN0cyA9IFtdO1xuICBcdHRoaXMudGFza3MgPSBbXTtcblxuICBcdHRoaXMucG91Y2guZ2V0VGFza3MoIHRoaXMuc2hvd0NvbXBsZXRlZCApLnRoZW4oIHRhc2tzID0+IHtcblx0XHR0YXNrcy5mb3JFYWNoKCB0ID0+IHtcbiAgXHRcdFx0dGhpcy50YXNrcy5wdXNoKCB0LmRvYyApO1x0XG4gIFx0XHR9KTtcblxuICBcdFx0dGhpcy5zdGFydFRpbWVyc09uUnVubmluZ1Rhc2tzKCk7XG4gIFx0fSk7XG5cbiAgXHR0aGlzLnBvdWNoLmdldFByb2plY3RzKCkudGhlbiggcHJvamVjdHMgPT4ge1xuICBcdFx0cHJvamVjdHMuZm9yRWFjaCggcCA9PiB7XG4gIFx0XHRcdHRoaXMucHJvamVjdHMucHVzaCggcC5kb2MgKTtcbiAgXHRcdH0pO1xuICBcdH0pO1xuXG4gICAgdGhpcy5wb3VjaC5nZXRTZXR0aW5ncygpLnRoZW4oIHMgPT4ge1xuICAgICAgaWYoIHMgKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wb3VjaC5jcmVhdGVTZXR0aW5ncygpLnRoZW4oIGNyZWF0ZWQgPT4ge1xuICAgICAgICAgIFxuICAgICAgICAgIHRoaXMuc2V0dGluZ3MgPSBjcmVhdGVkO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFjdGl2YXRlKCkge1xuICBcdHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgc2hvd0NvbXBsZXRlZENoYW5nZWQoKSB7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBzdGFydFRpbWVyc09uUnVubmluZ1Rhc2tzKCkge1xuICBcdHRoaXMudGFza3MuZm9yRWFjaCggdCA9PiB7XG4gIFx0XHRpZiggdC5zdGF0dXMgPT09ICdydW5uaW5nJyApIHtcbiAgXHRcdFx0dGhpcy5pbml0UnVubmluZ1RpbWVyKCB0ICk7XG4gIFx0XHR9XG4gIFx0fSk7XG4gIH1cblxuICBpbml0UnVubmluZ1RpbWVyKCB0YXNrICkge1xuICBcdGxldCBlbGFwc2VkID0gTWF0aC5mbG9vcigoRGF0ZS5ub3coKSAtIHRhc2suaW50ZXJ2YWxzWyB0YXNrLmludGVydmFscy5sZW5ndGggLSAxIF0uc3RhcnQpIC8gMTAwMCk7XG4gIFx0dGhpcy5hZGRUaW1lciggdGFzaywgZWxhcHNlZCApO1xuICAgIHRoaXMudGFza0luUHJvZ3Jlc3MgPSB0YXNrO1xuICB9XG5cbiAgZ2V0QmxhbmtUYXNrKCkge1xuICBcdGxldCBwaWQgPSBudWxsO1xuXG4gICAgaWYoIHRoaXMuc2V0dGluZ3MuZGVmYXVsdF9wcm9qZWN0ICkge1xuICAgICAgcGlkID0gdGhpcy5zZXR0aW5ncy5kZWZhdWx0X3Byb2plY3Q7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgXHRcdG5hbWU6IG51bGwsXG4gIFx0XHRkZXNjOiBudWxsLFxuICBcdFx0c3RhcnRfdGltZTogbnVsbCxcbiAgXHRcdGVuZF90aW1lOiBudWxsLFxuICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgXHQgIHByb2plY3RfaWQ6IHBpZFxuICAgIH1cbiAgfVxuXG4gIHNldFByb2plY3QoIHRhc2ssIHByb2plY3QgKSB7XG4gICAgdGFzay5wcm9qZWN0X2lkID0gcHJvamVjdC5faWQ7XG4gIH1cblxuICBjcmVhdGVUYXNrKCkge1xuICBcdHRoaXMuZWRpdGluZ1Rhc2sgPSB0aGlzLmdldEJsYW5rVGFzaygpO1xuICBcdHRoaXMuaXNDcmVhdGluZyA9IHRydWU7XG4gIH1cblxuICBlZGl0VGFzayggdGFzayApIHtcbiAgXHR0aGlzLmVkaXRpbmdUYXNrID0gdGFzaztcbiAgXHR0aGlzLmlzRWRpdGluZyA9IHRydWU7XG4gIH1cblxuICBjYW5jZWxDcmVhdGUoKSB7XG4gIFx0Y29uc29sZS5sb2coIHRoaXMudGFza3MgKTtcbiAgXHR0aGlzLmlzQ3JlYXRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIHJlbW92ZVRhc2soIHRhc2sgKSB7XG4gIFx0dGhpcy5wb3VjaC5yZW1vdmVQcm9qZWN0KCB0YXNrICkudGhlbiggdCA9PiB7XG4gIFx0XHR0aGlzLnRhc2tzID0gdGhpcy50YXNrcy5maWx0ZXIoIHAgPT4ge1xuICBcdFx0XHRyZXR1cm4gcC5faWQgIT09IHRhc2suX2lkO1xuICBcdFx0fSk7XG4gICAgICB0aGlzLmlzRWRpdGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5lZGl0aW5nVGFzayA9IG51bGw7XG4gICAgICB0aGlzLmV2ZW50cy5wdWJsaXNoKCd0aW1lLXVwZGF0ZS1jaGFydHMnLCB7fSk7XG4gIFx0fSk7XG4gIH1cblxuICBuZXdUYXNrKCB0YXNrICkge1xuICBcdHRoaXMucG91Y2guY3JlYXRlVGFzayggdGFzay5uYW1lLCB0YXNrLmRlc2MsIHRhc2sucHJvamVjdF9pZCApLnRoZW4oIHRhc2sgPT4ge1xuICBcdFx0dGhpcy50YXNrcy5wdXNoKCB0YXNrICk7XG4gIFx0XHR0aGlzLmVkaXRpbmdUYXNrID0gbnVsbDtcbiAgXHRcdHRoaXMuaXNDcmVhdGluZyA9IGZhbHNlO1xuXG4gICAgICBpZiggdGhpcy5zZXR0aW5ncyAmJiB0aGlzLnNldHRpbmdzLmF1dG9fc3RhcnQgKSB7XG4gICAgICAgIHRoaXMuc3RhcnQoIHRhc2sgKTtcbiAgICAgIH1cbiAgXHR9KTtcbiAgfVxuXG4gIHVwZGF0ZVRhc2soIHRhc2sgKSB7XG4gIFx0cmV0dXJuIHRoaXMucG91Y2gudXBkYXRlVGFzayggdGFzayApLnRoZW4oIHQgPT4ge1xuICBcdFx0dGhpcy5lZGl0aW5nVGFzayA9IG51bGw7XG4gIFx0XHR0aGlzLmlzRWRpdGluZyA9IGZhbHNlO1xuICBcdFx0cmV0dXJuIHQ7XG4gIFx0fSk7XG4gIH1cblxuICBjb21wbGV0ZVRhc2soIHRhc2sgKSB7XG4gICAgdGFzay5jb21wbGV0ZWQgPSB0cnVlO1xuICAgIHRoaXMuc3RvcCggdGFzayApLnRoZW4oIHQgPT4ge1xuICAgICAgaWYoICF0aGlzLnNob3dDb21wbGV0ZWQgKSB7XG4gICAgICAgIHRoaXMudGFza3MgPSB0aGlzLnRhc2tzLmZpbHRlciggdHNrID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0c2suX2lkICE9PSB0YXNrLl9pZDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzdGFydCggdGFzayApIHtcbiAgXHR0aGlzLnN0b3BBbGwoKS50aGVuKCAoKSA9PiB7XG5cdCAgXHR0aGlzLmFkZFRpbWVyKCB0YXNrICk7XG5cblx0ICBcdHRhc2suc3RhdHVzID0gJ3J1bm5pbmcnO1xuXHQgIFx0bGV0IGludGVydmFsID0ge1xuICAgICAgICBpZDogVVVJRC52NCgpLFxuXHQgIFx0XHRzdGFydDogRGF0ZS5ub3coKSxcblx0ICBcdFx0c3RvcDogbnVsbFxuXHQgIFx0fTtcblxuXHQgIFx0dGFzay5pbnRlcnZhbHMucHVzaCggaW50ZXJ2YWwgKTtcblxuXHQgIFx0dGhpcy51cGRhdGVUYXNrKCB0YXNrICkudGhlbiggdCA9PiB7XG5cdCAgXHRcdHRhc2sgPSB0O1xuXHQgIFx0XHR0aGlzLnRhc2tJblByb2dyZXNzID0gdGFzaztcblx0ICBcdH0pO1xuICBcdH0pO1xuICB9XG5cbiAgc3RvcCggdGFzaywgc3VwcHJlc3NTaWduYWwgKSB7XG4gIFx0dGhpcy5yZW1vdmVUaW1lciggdGFzayApO1xuXG4gICAgaWYoICFzdXBwcmVzc1NpZ25hbCApIHtcbiAgICAgIHRoaXMuZXZlbnRzLnB1Ymxpc2goJ3RpbWUtdXBkYXRlLWNoYXJ0cycsIHt9KTtcbiAgICB9XG5cbiAgXHR0YXNrLnN0YXR1cyA9ICdwYXVzZWQnO1xuICBcdFxuICBcdGxldCBsYXN0SW50ZXJ2YWwgPSB0YXNrLmludGVydmFsc1sgdGFzay5pbnRlcnZhbHMubGVuZ3RoIC0gMSBdO1xuXG4gIFx0aWYoIGxhc3RJbnRlcnZhbCAmJiAhbGFzdEludGVydmFsLnN0b3AgKSB7XG4gIFx0XHRsYXN0SW50ZXJ2YWwuc3RvcCA9IERhdGUubm93KCk7XG4gIFx0fVxuXG4gIFx0cmV0dXJuIHRoaXMudXBkYXRlVGFzayggdGFzayApLnRoZW4oIHQgPT4ge1xuICBcdFx0dGFzayA9IHQ7XG4gICAgICB0aGlzLnRhc2tJblByb2dyZXNzID0gbnVsbDtcbiAgXHRcdHJldHVybiB0O1xuICBcdH0pO1xuICB9XG5cbiAgc3RvcEFsbCgpIHtcbiAgXHRsZXQgcHJvbXMgPSBbXTtcblxuICBcdHRoaXMudGFza3MuZm9yRWFjaCggdCA9PiB7XG4gIFx0XHRwcm9tcy5wdXNoKCB0aGlzLnN0b3AodCwgdHJ1ZSkgKTtcbiAgXHR9KTtcblxuICBcdHJldHVybiBQcm9taXNlLmFsbCggcHJvbXMgKS50aGVuKCBkb25lID0+IHtcbiAgICAgIC8qIHNlbmQgdXBkYXRlIG9uY2UgKi9cbiAgICAgIHRoaXMuZXZlbnRzLnB1Ymxpc2goJ3RpbWUtdXBkYXRlLWNoYXJ0cycsIHt9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZFRpbWVyKCB0YXNrLCBlbGFwc2VkICkge1xuICBcdGlmKCAhZWxhcHNlZCApIHtcbiAgXHRcdGVsYXBzZWQgPSAwO1xuICBcdH1cblxuICBcdHRoaXMudGltZXJzW3Rhc2suX2lkXSA9IHtcbiAgXHRcdHRpbWVyOiBudWxsLFxuICBcdFx0c2Vjb25kczogZWxhcHNlZFxuICBcdH07XG5cbiAgXHRsZXQgdGltZXIgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoICgpID0+IHtcbiAgXHRcdHRoaXMudGltZXJzW3Rhc2suX2lkXS5zZWNvbmRzICs9IDE7XG5cbiAgICAgIHRoaXMudGltZXJzW3Rhc2suX2lkXS50b3RhbCA9IHRoaXMuZ2V0VG90YWxUaW1lKCB0YXNrLCB0cnVlICk7XG5cbiAgXHR9LCAxMDAwICk7XG4gIFx0dGhpcy50aW1lcnNbdGFzay5faWRdLnRpbWVyID0gdGltZXI7XG4gIH1cblxuICByZW1vdmVUaW1lciggdGFzayApIHtcbiAgXHRpZiggdGhpcy50aW1lcnNbdGFzay5faWRdICkge1xuICBcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwoIHRoaXMudGltZXJzW3Rhc2suX2lkXS50aW1lciApO1xuICBcdH1cbiAgfVxuXG4gIGdldFRvdGFsVGltZSggdGFzaywgaW5jbHVkZVJ1bm5pbmcgKSB7XG4gICAgbGV0IHJldCA9IDA7XG4gICAgbGV0IHJ1bm5pbmdJbnRlcnZhbCA9IDA7XG5cbiAgICB0cnkge1xuICAgICAgcnVubmluZ0ludGVydmFsID0gdGhpcy50aW1lcnNbdGFzay5faWRdLnNlY29uZHM7XG4gICAgfSBjYXRjaChleCkgey8qIHNoaGguLi5pJ20gaW4gYSBodXJyeSAqL31cblxuICAgIGxldCBwcmV2aW91c0ludGVydmFscyA9IDA7XG5cbiAgICBpZiggdGFzay5pbnRlcnZhbHMgKSB7XG4gICAgICB0YXNrLmludGVydmFscy5mb3JFYWNoKCBpID0+IHtcbiAgICAgICAgaWYoIGkuc3RhcnQgJiYgaS5zdG9wICkge1xuICAgICAgICAgIHByZXZpb3VzSW50ZXJ2YWxzICs9IE1hdGguZmxvb3IoKGkuc3RvcCAtIGkuc3RhcnQpIC8gMTAwMCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmKCBpbmNsdWRlUnVubmluZyApIHtcbiAgICAgIHJldHVybiBwcmV2aW91c0ludGVydmFscyArIHJ1bm5pbmdJbnRlcnZhbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHByZXZpb3VzSW50ZXJ2YWxzOyAgXG4gICAgfVxuICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
