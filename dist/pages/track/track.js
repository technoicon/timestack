System.register(['services/pouch/pouch.js', 'aurelia-framework', 'aurelia-binding', 'node-uuid'], function (_export) {
  'use strict';

  var Pouch, inject, bindable, computedFrom, UUID, Track;

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

        function Track(pouch) {
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

          this.pouch = pouch;
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
                console.log('got settings');
                console.log(_this.settings);
              } else {
                _this.pouch.createSettings().then(function (created) {

                  _this.settings = created;
                  console.log('set settings');
                  console.log(_this.settings);
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
          value: function stop(task) {
            var _this8 = this;

            this.removeTimer(task);

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
              proms.push(_this9.stop(t));
            });

            return Promise.all(proms);
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
        }], null, _instanceInitializers);

        var _Track = Track;
        Track = inject(Pouch)(Track) || Track;
        return Track;
      })();

      _export('default', Track);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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LEVBQUUsSUFBSSxDQUFFLENBQUM7QUFDVixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztXQUNwQzs7O2lCQUVVLHFCQUFFLElBQUksRUFBRztBQUNuQixnQkFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRztBQUMzQixvQkFBTSxDQUFDLGFBQWEsQ0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUUsQ0FBQzthQUNwRDtXQUNEOzs7cUJBdk5rQixLQUFLO0FBQUwsYUFBSyxHQUR6QixNQUFNLENBQUMsS0FBSyxDQUFDLENBQ08sS0FBSyxLQUFMLEtBQUs7ZUFBTCxLQUFLOzs7eUJBQUwsS0FBSyIsImZpbGUiOiJwYWdlcy90cmFjay90cmFjay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UG91Y2h9IGZyb20gJ3NlcnZpY2VzL3BvdWNoL3BvdWNoLmpzJztcbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge2NvbXB1dGVkRnJvbX0gZnJvbSAnYXVyZWxpYS1iaW5kaW5nJztcbmltcG9ydCAqIGFzIFVVSUQgZnJvbSAnbm9kZS11dWlkJztcbmltcG9ydCB7YmluZGFibGV9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcblxuQGluamVjdChQb3VjaClcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyYWNrIHtcbiAgaGVhZGluZyA9ICdUcmFjayc7XG4gIGl0ZW1fdHlwZSA9ICdUYXNrJztcbiAgaXNDcmVhdGluZyA9IGZhbHNlO1xuICBpc0VkaXRpbmcgPSBmYWxzZTtcbiAgZWRpdGluZ1Rhc2sgPSBudWxsO1xuICB0YXNrcyA9IFtdO1xuICBwcm9qZWN0cyA9IFtdO1xuICB0aW1lcnMgPSB7fTtcbiAgc2V0dGluZ3MgPSBudWxsO1xuICB0YXNrSW5Qcm9ncmVzcyA9IG51bGw7XG4gIEBiaW5kYWJsZSBzaG93Q29tcGxldGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoIHBvdWNoICkge1xuICBcdHRoaXMucG91Y2ggPSBwb3VjaDtcbiAgfVxuXG4gIGluaXQoKSB7XG4gIFx0dGhpcy5wcm9qZWN0cyA9IFtdO1xuICBcdHRoaXMudGFza3MgPSBbXTtcblxuICBcdHRoaXMucG91Y2guZ2V0VGFza3MoIHRoaXMuc2hvd0NvbXBsZXRlZCApLnRoZW4oIHRhc2tzID0+IHtcblx0XHR0YXNrcy5mb3JFYWNoKCB0ID0+IHtcbiAgXHRcdFx0dGhpcy50YXNrcy5wdXNoKCB0LmRvYyApO1x0XG4gIFx0XHR9KTtcblxuICBcdFx0dGhpcy5zdGFydFRpbWVyc09uUnVubmluZ1Rhc2tzKCk7XG4gIFx0fSk7XG5cbiAgXHR0aGlzLnBvdWNoLmdldFByb2plY3RzKCkudGhlbiggcHJvamVjdHMgPT4ge1xuICBcdFx0cHJvamVjdHMuZm9yRWFjaCggcCA9PiB7XG4gIFx0XHRcdHRoaXMucHJvamVjdHMucHVzaCggcC5kb2MgKTtcbiAgXHRcdH0pO1xuICBcdH0pO1xuXG4gICAgdGhpcy5wb3VjaC5nZXRTZXR0aW5ncygpLnRoZW4oIHMgPT4ge1xuICAgICAgaWYoIHMgKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzO1xuICAgICAgICBjb25zb2xlLmxvZygnZ290IHNldHRpbmdzJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCB0aGlzLnNldHRpbmdzICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBvdWNoLmNyZWF0ZVNldHRpbmdzKCkudGhlbiggY3JlYXRlZCA9PiB7XG4gICAgICAgICAgXG4gICAgICAgICAgdGhpcy5zZXR0aW5ncyA9IGNyZWF0ZWQ7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3NldCBzZXR0aW5ncycpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCB0aGlzLnNldHRpbmdzICk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYWN0aXZhdGUoKSB7XG4gIFx0dGhpcy5pbml0KCk7XG4gIH1cblxuICBzaG93Q29tcGxldGVkQ2hhbmdlZCgpIHtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHN0YXJ0VGltZXJzT25SdW5uaW5nVGFza3MoKSB7XG4gIFx0dGhpcy50YXNrcy5mb3JFYWNoKCB0ID0+IHtcbiAgXHRcdGlmKCB0LnN0YXR1cyA9PT0gJ3J1bm5pbmcnICkge1xuICBcdFx0XHR0aGlzLmluaXRSdW5uaW5nVGltZXIoIHQgKTtcbiAgXHRcdH1cbiAgXHR9KTtcbiAgfVxuXG4gIGluaXRSdW5uaW5nVGltZXIoIHRhc2sgKSB7XG4gIFx0bGV0IGVsYXBzZWQgPSBNYXRoLmZsb29yKChEYXRlLm5vdygpIC0gdGFzay5pbnRlcnZhbHNbIHRhc2suaW50ZXJ2YWxzLmxlbmd0aCAtIDEgXS5zdGFydCkgLyAxMDAwKTtcbiAgXHR0aGlzLmFkZFRpbWVyKCB0YXNrLCBlbGFwc2VkICk7XG4gICAgdGhpcy50YXNrSW5Qcm9ncmVzcyA9IHRhc2s7XG4gIH1cblxuICBnZXRCbGFua1Rhc2soKSB7XG4gIFx0bGV0IHBpZCA9IG51bGw7XG5cbiAgICBpZiggdGhpcy5zZXR0aW5ncy5kZWZhdWx0X3Byb2plY3QgKSB7XG4gICAgICBwaWQgPSB0aGlzLnNldHRpbmdzLmRlZmF1bHRfcHJvamVjdDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICBcdFx0bmFtZTogbnVsbCxcbiAgXHRcdGRlc2M6IG51bGwsXG4gIFx0XHRwcm9qZWN0X2lkOiBudWxsLFxuICBcdFx0c3RhcnRfdGltZTogbnVsbCxcbiAgXHRcdGVuZF90aW1lOiBudWxsLFxuICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgXHQgIHByb2plY3RfaWQ6IHBpZFxuICAgIH1cbiAgfVxuXG4gIHNldFByb2plY3QoIHRhc2ssIHByb2plY3QgKSB7XG4gICAgdGFzay5wcm9qZWN0X2lkID0gcHJvamVjdC5faWQ7XG4gIH1cblxuICBjcmVhdGVUYXNrKCkge1xuICBcdHRoaXMuZWRpdGluZ1Rhc2sgPSB0aGlzLmdldEJsYW5rVGFzaygpO1xuICBcdHRoaXMuaXNDcmVhdGluZyA9IHRydWU7XG4gIH1cblxuICBlZGl0VGFzayggdGFzayApIHtcbiAgXHR0aGlzLmVkaXRpbmdUYXNrID0gdGFzaztcbiAgXHR0aGlzLmlzRWRpdGluZyA9IHRydWU7XG4gIH1cblxuICBjYW5jZWxDcmVhdGUoKSB7XG4gIFx0Y29uc29sZS5sb2coIHRoaXMudGFza3MgKTtcbiAgXHR0aGlzLmlzQ3JlYXRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIHJlbW92ZVRhc2soIHRhc2sgKSB7XG4gIFx0dGhpcy5wb3VjaC5yZW1vdmVQcm9qZWN0KCB0YXNrICkudGhlbiggdCA9PiB7XG4gIFx0XHR0aGlzLnRhc2tzID0gdGhpcy50YXNrcy5maWx0ZXIoIHAgPT4ge1xuICBcdFx0XHRyZXR1cm4gcC5faWQgIT09IHRhc2suX2lkO1xuICBcdFx0fSk7XG4gICAgICB0aGlzLmlzRWRpdGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5lZGl0aW5nVGFzayA9IG51bGw7XG4gIFx0fSk7XG4gIH1cblxuICBuZXdUYXNrKCB0YXNrICkge1xuICBcdHRoaXMucG91Y2guY3JlYXRlVGFzayggdGFzay5uYW1lLCB0YXNrLmRlc2MsIHRhc2sucHJvamVjdF9pZCApLnRoZW4oIHRhc2sgPT4ge1xuICBcdFx0dGhpcy50YXNrcy5wdXNoKCB0YXNrICk7XG4gIFx0XHR0aGlzLmVkaXRpbmdUYXNrID0gbnVsbDtcbiAgXHRcdHRoaXMuaXNDcmVhdGluZyA9IGZhbHNlO1xuICBcdH0pO1xuICB9XG5cbiAgdXBkYXRlVGFzayggdGFzayApIHtcbiAgXHRyZXR1cm4gdGhpcy5wb3VjaC51cGRhdGVUYXNrKCB0YXNrICkudGhlbiggdCA9PiB7XG4gIFx0XHR0aGlzLmVkaXRpbmdUYXNrID0gbnVsbDtcbiAgXHRcdHRoaXMuaXNFZGl0aW5nID0gZmFsc2U7XG4gIFx0XHRyZXR1cm4gdDtcbiAgXHR9KTtcbiAgfVxuXG4gIGNvbXBsZXRlVGFzayggdGFzayApIHtcbiAgICB0YXNrLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgdGhpcy5zdG9wKCB0YXNrICkudGhlbiggdCA9PiB7XG4gICAgICBpZiggIXRoaXMuc2hvd0NvbXBsZXRlZCApIHtcbiAgICAgICAgdGhpcy50YXNrcyA9IHRoaXMudGFza3MuZmlsdGVyKCB0c2sgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRzay5faWQgIT09IHRhc2suX2lkO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHN0YXJ0KCB0YXNrICkge1xuICBcdHRoaXMuc3RvcEFsbCgpLnRoZW4oICgpID0+IHtcblx0ICBcdHRoaXMuYWRkVGltZXIoIHRhc2sgKTtcblxuXHQgIFx0dGFzay5zdGF0dXMgPSAncnVubmluZyc7XG5cdCAgXHRsZXQgaW50ZXJ2YWwgPSB7XG4gICAgICAgIGlkOiBVVUlELnY0KCksXG5cdCAgXHRcdHN0YXJ0OiBEYXRlLm5vdygpLFxuXHQgIFx0XHRzdG9wOiBudWxsXG5cdCAgXHR9O1xuXG5cdCAgXHR0YXNrLmludGVydmFscy5wdXNoKCBpbnRlcnZhbCApO1xuXG5cdCAgXHR0aGlzLnVwZGF0ZVRhc2soIHRhc2sgKS50aGVuKCB0ID0+IHtcblx0ICBcdFx0dGFzayA9IHQ7XG5cdCAgXHRcdHRoaXMudGFza0luUHJvZ3Jlc3MgPSB0YXNrO1xuXHQgIFx0fSk7XG4gIFx0fSk7XG4gIH1cblxuICBzdG9wKCB0YXNrICkge1xuICBcdHRoaXMucmVtb3ZlVGltZXIoIHRhc2sgKTtcblxuICBcdHRhc2suc3RhdHVzID0gJ3BhdXNlZCc7XG4gIFx0XG4gIFx0bGV0IGxhc3RJbnRlcnZhbCA9IHRhc2suaW50ZXJ2YWxzWyB0YXNrLmludGVydmFscy5sZW5ndGggLSAxIF07XG5cbiAgXHRpZiggbGFzdEludGVydmFsICYmICFsYXN0SW50ZXJ2YWwuc3RvcCApIHtcbiAgXHRcdGxhc3RJbnRlcnZhbC5zdG9wID0gRGF0ZS5ub3coKTtcbiAgXHR9XG5cbiAgXHRyZXR1cm4gdGhpcy51cGRhdGVUYXNrKCB0YXNrICkudGhlbiggdCA9PiB7XG4gIFx0XHR0YXNrID0gdDtcbiAgICAgIHRoaXMudGFza0luUHJvZ3Jlc3MgPSBudWxsO1xuICBcdFx0cmV0dXJuIHQ7XG4gIFx0fSk7XG4gIH1cblxuICBzdG9wQWxsKCkge1xuICBcdGxldCBwcm9tcyA9IFtdO1xuXG4gIFx0dGhpcy50YXNrcy5mb3JFYWNoKCB0ID0+IHtcbiAgXHRcdHByb21zLnB1c2goIHRoaXMuc3RvcCh0KSApO1xuICBcdH0pO1xuXG4gIFx0cmV0dXJuIFByb21pc2UuYWxsKCBwcm9tcyApO1xuICB9XG5cbiAgYWRkVGltZXIoIHRhc2ssIGVsYXBzZWQgKSB7XG4gIFx0aWYoICFlbGFwc2VkICkge1xuICBcdFx0ZWxhcHNlZCA9IDA7XG4gIFx0fVxuXG4gIFx0dGhpcy50aW1lcnNbdGFzay5faWRdID0ge1xuICBcdFx0dGltZXI6IG51bGwsXG4gIFx0XHRzZWNvbmRzOiBlbGFwc2VkXG4gIFx0fTtcblxuICBcdGxldCB0aW1lciA9IHdpbmRvdy5zZXRJbnRlcnZhbCggKCkgPT4ge1xuICBcdFx0dGhpcy50aW1lcnNbdGFzay5faWRdLnNlY29uZHMgKz0gMTtcbiAgXHR9LCAxMDAwICk7XG4gIFx0dGhpcy50aW1lcnNbdGFzay5faWRdLnRpbWVyID0gdGltZXI7XG4gIH1cblxuICByZW1vdmVUaW1lciggdGFzayApIHtcbiAgXHRpZiggdGhpcy50aW1lcnNbdGFzay5faWRdICkge1xuICBcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwoIHRoaXMudGltZXJzW3Rhc2suX2lkXS50aW1lciApO1xuICBcdH1cbiAgfVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
