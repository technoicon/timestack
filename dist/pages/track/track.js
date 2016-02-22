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
              project_id: null,
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

              _this10.timers[task._id].total = _this10.getTotalTime(task);
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
          value: function getTotalTime(task) {
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

            return runningInterval + previousIntervals;
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
//# sourceMappingURL=data:application/json;base64,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QkFBSSxJQUFJLENBQUMsU0FBUyxFQUFHO0FBQ25CLGtCQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBRSxVQUFBLENBQUMsRUFBSTtBQUMzQixvQkFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUc7QUFDdEIsbUNBQWlCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQSxHQUFJLElBQUksQ0FBQyxDQUFDO2lCQUM1RDtlQUNGLENBQUMsQ0FBQzthQUNKOztBQUVELG1CQUFPLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQztXQUM1Qzs7O3FCQXpQa0IsS0FBSztBQUFMLGFBQUssR0FEekIsTUFBTSxDQUFDLEtBQUssRUFBRSxlQUFlLENBQUMsQ0FDVixLQUFLLEtBQUwsS0FBSztlQUFMLEtBQUs7Ozt5QkFBTCxLQUFLIiwiZmlsZSI6InBhZ2VzL3RyYWNrL3RyYWNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQb3VjaH0gZnJvbSAnc2VydmljZXMvcG91Y2gvcG91Y2guanMnO1xuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7Y29tcHV0ZWRGcm9tfSBmcm9tICdhdXJlbGlhLWJpbmRpbmcnO1xuaW1wb3J0ICogYXMgVVVJRCBmcm9tICdub2RlLXV1aWQnO1xuaW1wb3J0IHtiaW5kYWJsZX0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtFdmVudEFnZ3JlZ2F0b3J9IGZyb20gJ2F1cmVsaWEtZXZlbnQtYWdncmVnYXRvcic7XG5cbkBpbmplY3QoUG91Y2gsIEV2ZW50QWdncmVnYXRvcilcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyYWNrIHtcbiAgaGVhZGluZyA9ICdUcmFjayc7XG4gIGl0ZW1fdHlwZSA9ICdUYXNrJztcbiAgaXNDcmVhdGluZyA9IGZhbHNlO1xuICBpc0VkaXRpbmcgPSBmYWxzZTtcbiAgZWRpdGluZ1Rhc2sgPSBudWxsO1xuICB0YXNrcyA9IFtdO1xuICBwcm9qZWN0cyA9IFtdO1xuICB0aW1lcnMgPSB7fTtcbiAgc2V0dGluZ3MgPSBudWxsO1xuICB0YXNrSW5Qcm9ncmVzcyA9IG51bGw7XG4gIEBiaW5kYWJsZSBzaG93Q29tcGxldGVkID0gZmFsc2U7XG4gIHRvZGF5ID0gRGF0ZS5ub3coKTtcblxuICBjb25zdHJ1Y3RvciggcG91Y2gsIGV2ZW50cyApIHtcbiAgXHR0aGlzLnBvdWNoID0gcG91Y2g7XG4gICAgdGhpcy5ldmVudHMgPSBldmVudHM7XG4gIH1cblxuICBpbml0KCkge1xuICBcdHRoaXMucHJvamVjdHMgPSBbXTtcbiAgXHR0aGlzLnRhc2tzID0gW107XG5cbiAgXHR0aGlzLnBvdWNoLmdldFRhc2tzKCB0aGlzLnNob3dDb21wbGV0ZWQgKS50aGVuKCB0YXNrcyA9PiB7XG5cdFx0dGFza3MuZm9yRWFjaCggdCA9PiB7XG4gIFx0XHRcdHRoaXMudGFza3MucHVzaCggdC5kb2MgKTtcdFxuICBcdFx0fSk7XG5cbiAgXHRcdHRoaXMuc3RhcnRUaW1lcnNPblJ1bm5pbmdUYXNrcygpO1xuICBcdH0pO1xuXG4gIFx0dGhpcy5wb3VjaC5nZXRQcm9qZWN0cygpLnRoZW4oIHByb2plY3RzID0+IHtcbiAgXHRcdHByb2plY3RzLmZvckVhY2goIHAgPT4ge1xuICBcdFx0XHR0aGlzLnByb2plY3RzLnB1c2goIHAuZG9jICk7XG4gIFx0XHR9KTtcbiAgXHR9KTtcblxuICAgIHRoaXMucG91Y2guZ2V0U2V0dGluZ3MoKS50aGVuKCBzID0+IHtcbiAgICAgIGlmKCBzICkge1xuICAgICAgICB0aGlzLnNldHRpbmdzID0gcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucG91Y2guY3JlYXRlU2V0dGluZ3MoKS50aGVuKCBjcmVhdGVkID0+IHtcbiAgICAgICAgICBcbiAgICAgICAgICB0aGlzLnNldHRpbmdzID0gY3JlYXRlZDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgXHR0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHNob3dDb21wbGV0ZWRDaGFuZ2VkKCkge1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgc3RhcnRUaW1lcnNPblJ1bm5pbmdUYXNrcygpIHtcbiAgXHR0aGlzLnRhc2tzLmZvckVhY2goIHQgPT4ge1xuICBcdFx0aWYoIHQuc3RhdHVzID09PSAncnVubmluZycgKSB7XG4gIFx0XHRcdHRoaXMuaW5pdFJ1bm5pbmdUaW1lciggdCApO1xuICBcdFx0fVxuICBcdH0pO1xuICB9XG5cbiAgaW5pdFJ1bm5pbmdUaW1lciggdGFzayApIHtcbiAgXHRsZXQgZWxhcHNlZCA9IE1hdGguZmxvb3IoKERhdGUubm93KCkgLSB0YXNrLmludGVydmFsc1sgdGFzay5pbnRlcnZhbHMubGVuZ3RoIC0gMSBdLnN0YXJ0KSAvIDEwMDApO1xuICBcdHRoaXMuYWRkVGltZXIoIHRhc2ssIGVsYXBzZWQgKTtcbiAgICB0aGlzLnRhc2tJblByb2dyZXNzID0gdGFzaztcbiAgfVxuXG4gIGdldEJsYW5rVGFzaygpIHtcbiAgXHRsZXQgcGlkID0gbnVsbDtcblxuICAgIGlmKCB0aGlzLnNldHRpbmdzLmRlZmF1bHRfcHJvamVjdCApIHtcbiAgICAgIHBpZCA9IHRoaXMuc2V0dGluZ3MuZGVmYXVsdF9wcm9qZWN0O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gIFx0XHRuYW1lOiBudWxsLFxuICBcdFx0ZGVzYzogbnVsbCxcbiAgXHRcdHByb2plY3RfaWQ6IG51bGwsXG4gIFx0XHRzdGFydF90aW1lOiBudWxsLFxuICBcdFx0ZW5kX3RpbWU6IG51bGwsXG4gICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICBcdCAgcHJvamVjdF9pZDogcGlkXG4gICAgfVxuICB9XG5cbiAgc2V0UHJvamVjdCggdGFzaywgcHJvamVjdCApIHtcbiAgICB0YXNrLnByb2plY3RfaWQgPSBwcm9qZWN0Ll9pZDtcbiAgfVxuXG4gIGNyZWF0ZVRhc2soKSB7XG4gIFx0dGhpcy5lZGl0aW5nVGFzayA9IHRoaXMuZ2V0QmxhbmtUYXNrKCk7XG4gIFx0dGhpcy5pc0NyZWF0aW5nID0gdHJ1ZTtcbiAgfVxuXG4gIGVkaXRUYXNrKCB0YXNrICkge1xuICBcdHRoaXMuZWRpdGluZ1Rhc2sgPSB0YXNrO1xuICBcdHRoaXMuaXNFZGl0aW5nID0gdHJ1ZTtcbiAgfVxuXG4gIGNhbmNlbENyZWF0ZSgpIHtcbiAgXHRjb25zb2xlLmxvZyggdGhpcy50YXNrcyApO1xuICBcdHRoaXMuaXNDcmVhdGluZyA9IGZhbHNlO1xuICB9XG5cbiAgcmVtb3ZlVGFzayggdGFzayApIHtcbiAgXHR0aGlzLnBvdWNoLnJlbW92ZVByb2plY3QoIHRhc2sgKS50aGVuKCB0ID0+IHtcbiAgXHRcdHRoaXMudGFza3MgPSB0aGlzLnRhc2tzLmZpbHRlciggcCA9PiB7XG4gIFx0XHRcdHJldHVybiBwLl9pZCAhPT0gdGFzay5faWQ7XG4gIFx0XHR9KTtcbiAgICAgIHRoaXMuaXNFZGl0aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmVkaXRpbmdUYXNrID0gbnVsbDtcbiAgICAgIHRoaXMuZXZlbnRzLnB1Ymxpc2goJ3RpbWUtdXBkYXRlLWNoYXJ0cycsIHt9KTtcbiAgXHR9KTtcbiAgfVxuXG4gIG5ld1Rhc2soIHRhc2sgKSB7XG4gIFx0dGhpcy5wb3VjaC5jcmVhdGVUYXNrKCB0YXNrLm5hbWUsIHRhc2suZGVzYywgdGFzay5wcm9qZWN0X2lkICkudGhlbiggdGFzayA9PiB7XG4gIFx0XHR0aGlzLnRhc2tzLnB1c2goIHRhc2sgKTtcbiAgXHRcdHRoaXMuZWRpdGluZ1Rhc2sgPSBudWxsO1xuICBcdFx0dGhpcy5pc0NyZWF0aW5nID0gZmFsc2U7XG5cbiAgICAgIGlmKCB0aGlzLnNldHRpbmdzICYmIHRoaXMuc2V0dGluZ3MuYXV0b19zdGFydCApIHtcbiAgICAgICAgdGhpcy5zdGFydCggdGFzayApO1xuICAgICAgfVxuICBcdH0pO1xuICB9XG5cbiAgdXBkYXRlVGFzayggdGFzayApIHtcbiAgXHRyZXR1cm4gdGhpcy5wb3VjaC51cGRhdGVUYXNrKCB0YXNrICkudGhlbiggdCA9PiB7XG4gIFx0XHR0aGlzLmVkaXRpbmdUYXNrID0gbnVsbDtcbiAgXHRcdHRoaXMuaXNFZGl0aW5nID0gZmFsc2U7XG4gIFx0XHRyZXR1cm4gdDtcbiAgXHR9KTtcbiAgfVxuXG4gIGNvbXBsZXRlVGFzayggdGFzayApIHtcbiAgICB0YXNrLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgdGhpcy5zdG9wKCB0YXNrICkudGhlbiggdCA9PiB7XG4gICAgICBpZiggIXRoaXMuc2hvd0NvbXBsZXRlZCApIHtcbiAgICAgICAgdGhpcy50YXNrcyA9IHRoaXMudGFza3MuZmlsdGVyKCB0c2sgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRzay5faWQgIT09IHRhc2suX2lkO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHN0YXJ0KCB0YXNrICkge1xuICBcdHRoaXMuc3RvcEFsbCgpLnRoZW4oICgpID0+IHtcblx0ICBcdHRoaXMuYWRkVGltZXIoIHRhc2sgKTtcblxuXHQgIFx0dGFzay5zdGF0dXMgPSAncnVubmluZyc7XG5cdCAgXHRsZXQgaW50ZXJ2YWwgPSB7XG4gICAgICAgIGlkOiBVVUlELnY0KCksXG5cdCAgXHRcdHN0YXJ0OiBEYXRlLm5vdygpLFxuXHQgIFx0XHRzdG9wOiBudWxsXG5cdCAgXHR9O1xuXG5cdCAgXHR0YXNrLmludGVydmFscy5wdXNoKCBpbnRlcnZhbCApO1xuXG5cdCAgXHR0aGlzLnVwZGF0ZVRhc2soIHRhc2sgKS50aGVuKCB0ID0+IHtcblx0ICBcdFx0dGFzayA9IHQ7XG5cdCAgXHRcdHRoaXMudGFza0luUHJvZ3Jlc3MgPSB0YXNrO1xuXHQgIFx0fSk7XG4gIFx0fSk7XG4gIH1cblxuICBzdG9wKCB0YXNrLCBzdXBwcmVzc1NpZ25hbCApIHtcbiAgXHR0aGlzLnJlbW92ZVRpbWVyKCB0YXNrICk7XG5cbiAgICBpZiggIXN1cHByZXNzU2lnbmFsICkge1xuICAgICAgdGhpcy5ldmVudHMucHVibGlzaCgndGltZS11cGRhdGUtY2hhcnRzJywge30pO1xuICAgIH1cblxuICBcdHRhc2suc3RhdHVzID0gJ3BhdXNlZCc7XG4gIFx0XG4gIFx0bGV0IGxhc3RJbnRlcnZhbCA9IHRhc2suaW50ZXJ2YWxzWyB0YXNrLmludGVydmFscy5sZW5ndGggLSAxIF07XG5cbiAgXHRpZiggbGFzdEludGVydmFsICYmICFsYXN0SW50ZXJ2YWwuc3RvcCApIHtcbiAgXHRcdGxhc3RJbnRlcnZhbC5zdG9wID0gRGF0ZS5ub3coKTtcbiAgXHR9XG5cbiAgXHRyZXR1cm4gdGhpcy51cGRhdGVUYXNrKCB0YXNrICkudGhlbiggdCA9PiB7XG4gIFx0XHR0YXNrID0gdDtcbiAgICAgIHRoaXMudGFza0luUHJvZ3Jlc3MgPSBudWxsO1xuICBcdFx0cmV0dXJuIHQ7XG4gIFx0fSk7XG4gIH1cblxuICBzdG9wQWxsKCkge1xuICBcdGxldCBwcm9tcyA9IFtdO1xuXG4gIFx0dGhpcy50YXNrcy5mb3JFYWNoKCB0ID0+IHtcbiAgXHRcdHByb21zLnB1c2goIHRoaXMuc3RvcCh0LCB0cnVlKSApO1xuICBcdH0pO1xuXG4gIFx0cmV0dXJuIFByb21pc2UuYWxsKCBwcm9tcyApLnRoZW4oIGRvbmUgPT4ge1xuICAgICAgLyogc2VuZCB1cGRhdGUgb25jZSAqL1xuICAgICAgdGhpcy5ldmVudHMucHVibGlzaCgndGltZS11cGRhdGUtY2hhcnRzJywge30pO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkVGltZXIoIHRhc2ssIGVsYXBzZWQgKSB7XG4gIFx0aWYoICFlbGFwc2VkICkge1xuICBcdFx0ZWxhcHNlZCA9IDA7XG4gIFx0fVxuXG4gIFx0dGhpcy50aW1lcnNbdGFzay5faWRdID0ge1xuICBcdFx0dGltZXI6IG51bGwsXG4gIFx0XHRzZWNvbmRzOiBlbGFwc2VkXG4gIFx0fTtcblxuICBcdGxldCB0aW1lciA9IHdpbmRvdy5zZXRJbnRlcnZhbCggKCkgPT4ge1xuICBcdFx0dGhpcy50aW1lcnNbdGFzay5faWRdLnNlY29uZHMgKz0gMTtcblxuICAgICAgdGhpcy50aW1lcnNbdGFzay5faWRdLnRvdGFsID0gdGhpcy5nZXRUb3RhbFRpbWUoIHRhc2sgKTtcblxuICBcdH0sIDEwMDAgKTtcbiAgXHR0aGlzLnRpbWVyc1t0YXNrLl9pZF0udGltZXIgPSB0aW1lcjtcbiAgfVxuXG4gIHJlbW92ZVRpbWVyKCB0YXNrICkge1xuICBcdGlmKCB0aGlzLnRpbWVyc1t0YXNrLl9pZF0gKSB7XG4gIFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbCggdGhpcy50aW1lcnNbdGFzay5faWRdLnRpbWVyICk7XG4gIFx0fVxuICB9XG5cbiAgZ2V0VG90YWxUaW1lKCB0YXNrICkge1xuICAgIGxldCByZXQgPSAwO1xuICAgIGxldCBydW5uaW5nSW50ZXJ2YWwgPSAwO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJ1bm5pbmdJbnRlcnZhbCA9IHRoaXMudGltZXJzW3Rhc2suX2lkXS5zZWNvbmRzO1xuICAgIH0gY2F0Y2goZXgpIHsvKiBzaGhoLi4uaSdtIGluIGEgaHVycnkgKi99XG5cbiAgICBsZXQgcHJldmlvdXNJbnRlcnZhbHMgPSAwO1xuXG4gICAgaWYoIHRhc2suaW50ZXJ2YWxzICkge1xuICAgICAgdGFzay5pbnRlcnZhbHMuZm9yRWFjaCggaSA9PiB7XG4gICAgICAgIGlmKCBpLnN0YXJ0ICYmIGkuc3RvcCApIHtcbiAgICAgICAgICBwcmV2aW91c0ludGVydmFscyArPSBNYXRoLmZsb29yKChpLnN0b3AgLSBpLnN0YXJ0KSAvIDEwMDApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcnVubmluZ0ludGVydmFsICsgcHJldmlvdXNJbnRlcnZhbHM7XG4gIH1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
