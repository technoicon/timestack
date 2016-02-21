System.register(['services/pouch/pouch.js', 'aurelia-framework', 'aurelia-binding', 'node-uuid'], function (_export) {
  'use strict';

  var Pouch, inject, computedFrom, UUID, Track;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_servicesPouchPouchJs) {
      Pouch = _servicesPouchPouchJs.Pouch;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaBinding) {
      computedFrom = _aureliaBinding.computedFrom;
    }, function (_nodeUuid) {
      UUID = _nodeUuid;
    }],
    execute: function () {
      Track = (function () {
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

          this.pouch = pouch;
        }

        _createClass(Track, [{
          key: 'init',
          value: function init() {
            var _this = this;

            this.projects = [];
            this.tasks = [];

            this.pouch.getTasks().then(function (tasks) {
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
          key: 'start',
          value: function start(task) {
            var _this6 = this;

            this.stopAll().then(function () {
              _this6.addTimer(task);

              task.status = 'running';
              var interval = {
                id: UUID.v4(),
                start: Date.now(),
                stop: null
              };

              task.intervals.push(interval);

              _this6.updateTask(task).then(function (t) {
                task = t;
                _this6.taskInProgress = task;
              });
            });
          }
        }, {
          key: 'stop',
          value: function stop(task) {
            var _this7 = this;

            this.removeTimer(task);

            task.status = 'paused';

            var lastInterval = task.intervals[task.intervals.length - 1];

            if (!lastInterval.stop) {
              lastInterval.stop = Date.now();
            }

            return this.updateTask(task).then(function (t) {
              task = t;
              _this7.taskInProgress = null;
              return t;
            });
          }
        }, {
          key: 'stopAll',
          value: function stopAll() {
            var _this8 = this;

            var proms = [];

            this.tasks.forEach(function (t) {
              proms.push(_this8.stop(t));
            });

            return Promise.all(proms);
          }
        }, {
          key: 'addTimer',
          value: function addTimer(task, elapsed) {
            var _this9 = this;

            if (!elapsed) {
              elapsed = 0;
            }

            this.timers[task._id] = {
              timer: null,
              seconds: elapsed
            };

            var timer = window.setInterval(function () {
              _this9.timers[task._id].seconds += 1;
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
        }]);

        var _Track = Track;
        Track = inject(Pouch)(Track) || Track;
        return Track;
      })();

      _export('default', Track);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUFDOztBQUVILG1CQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUUsS0FBSyxDQUFFLENBQUM7V0FDNUI7OztpQkFFTyxrQkFBRSxJQUFJLEVBQUUsT0FBTyxFQUFHOzs7QUFDekIsZ0JBQUksQ0FBQyxPQUFPLEVBQUc7QUFDZCxxQkFBTyxHQUFHLENBQUMsQ0FBQzthQUNaOztBQUVELGdCQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRztBQUN2QixtQkFBSyxFQUFFLElBQUk7QUFDWCxxQkFBTyxFQUFFLE9BQU87YUFDaEIsQ0FBQzs7QUFFRixnQkFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBRSxZQUFNO0FBQ3JDLHFCQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQzthQUNuQyxFQUFFLElBQUksQ0FBRSxDQUFDO0FBQ1YsZ0JBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7V0FDcEM7OztpQkFFVSxxQkFBRSxJQUFJLEVBQUc7QUFDbkIsZ0JBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUc7QUFDM0Isb0JBQU0sQ0FBQyxhQUFhLENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFFLENBQUM7YUFDcEQ7V0FDRDs7O3FCQXJNa0IsS0FBSztBQUFMLGFBQUssR0FEekIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUNPLEtBQUssS0FBTCxLQUFLO2VBQUwsS0FBSzs7O3lCQUFMLEtBQUsiLCJmaWxlIjoicGFnZXMvdHJhY2svdHJhY2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BvdWNofSBmcm9tICdzZXJ2aWNlcy9wb3VjaC9wb3VjaC5qcyc7XG5pbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtjb21wdXRlZEZyb219IGZyb20gJ2F1cmVsaWEtYmluZGluZyc7XG5pbXBvcnQgKiBhcyBVVUlEIGZyb20gJ25vZGUtdXVpZCc7XG5cbkBpbmplY3QoUG91Y2gpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFjayB7XG4gIGhlYWRpbmcgPSAnVHJhY2snO1xuICBpdGVtX3R5cGUgPSAnVGFzayc7XG4gIGlzQ3JlYXRpbmcgPSBmYWxzZTtcbiAgaXNFZGl0aW5nID0gZmFsc2U7XG4gIGVkaXRpbmdUYXNrID0gbnVsbDtcbiAgdGFza3MgPSBbXTtcbiAgcHJvamVjdHMgPSBbXTtcbiAgdGltZXJzID0ge307XG4gIHNldHRpbmdzID0gbnVsbDtcbiAgdGFza0luUHJvZ3Jlc3MgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKCBwb3VjaCApIHtcbiAgXHR0aGlzLnBvdWNoID0gcG91Y2g7XG4gIH1cblxuICBpbml0KCkge1xuICBcdHRoaXMucHJvamVjdHMgPSBbXTtcbiAgXHR0aGlzLnRhc2tzID0gW107XG5cbiAgXHR0aGlzLnBvdWNoLmdldFRhc2tzKCkudGhlbiggdGFza3MgPT4ge1xuXHRcdHRhc2tzLmZvckVhY2goIHQgPT4ge1xuICBcdFx0XHR0aGlzLnRhc2tzLnB1c2goIHQuZG9jICk7XHRcbiAgXHRcdH0pO1xuXG4gIFx0XHR0aGlzLnN0YXJ0VGltZXJzT25SdW5uaW5nVGFza3MoKTtcbiAgXHR9KTtcblxuICBcdHRoaXMucG91Y2guZ2V0UHJvamVjdHMoKS50aGVuKCBwcm9qZWN0cyA9PiB7XG4gIFx0XHRwcm9qZWN0cy5mb3JFYWNoKCBwID0+IHtcbiAgXHRcdFx0dGhpcy5wcm9qZWN0cy5wdXNoKCBwLmRvYyApO1xuICBcdFx0fSk7XG4gIFx0fSk7XG5cbiAgICB0aGlzLnBvdWNoLmdldFNldHRpbmdzKCkudGhlbiggcyA9PiB7XG4gICAgICBpZiggcyApIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHM7XG4gICAgICAgIGNvbnNvbGUubG9nKCdnb3Qgc2V0dGluZ3MnKTtcbiAgICAgICAgY29uc29sZS5sb2coIHRoaXMuc2V0dGluZ3MgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucG91Y2guY3JlYXRlU2V0dGluZ3MoKS50aGVuKCBjcmVhdGVkID0+IHtcbiAgICAgICAgICBcbiAgICAgICAgICB0aGlzLnNldHRpbmdzID0gY3JlYXRlZDtcbiAgICAgICAgICBjb25zb2xlLmxvZygnc2V0IHNldHRpbmdzJyk7XG4gICAgICAgICAgY29uc29sZS5sb2coIHRoaXMuc2V0dGluZ3MgKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgXHR0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHN0YXJ0VGltZXJzT25SdW5uaW5nVGFza3MoKSB7XG4gIFx0dGhpcy50YXNrcy5mb3JFYWNoKCB0ID0+IHtcbiAgXHRcdGlmKCB0LnN0YXR1cyA9PT0gJ3J1bm5pbmcnICkge1xuICBcdFx0XHR0aGlzLmluaXRSdW5uaW5nVGltZXIoIHQgKTtcbiAgXHRcdH1cbiAgXHR9KTtcbiAgfVxuXG4gIGluaXRSdW5uaW5nVGltZXIoIHRhc2sgKSB7XG4gIFx0bGV0IGVsYXBzZWQgPSBNYXRoLmZsb29yKChEYXRlLm5vdygpIC0gdGFzay5pbnRlcnZhbHNbIHRhc2suaW50ZXJ2YWxzLmxlbmd0aCAtIDEgXS5zdGFydCkgLyAxMDAwKTtcbiAgXHR0aGlzLmFkZFRpbWVyKCB0YXNrLCBlbGFwc2VkICk7XG4gICAgdGhpcy50YXNrSW5Qcm9ncmVzcyA9IHRhc2s7XG4gIH1cblxuICBnZXRCbGFua1Rhc2soKSB7XG4gIFx0bGV0IHBpZCA9IG51bGw7XG5cbiAgICBpZiggdGhpcy5zZXR0aW5ncy5kZWZhdWx0X3Byb2plY3QgKSB7XG4gICAgICBwaWQgPSB0aGlzLnNldHRpbmdzLmRlZmF1bHRfcHJvamVjdDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICBcdFx0bmFtZTogbnVsbCxcbiAgXHRcdGRlc2M6IG51bGwsXG4gIFx0XHRwcm9qZWN0X2lkOiBudWxsLFxuICBcdFx0c3RhcnRfdGltZTogbnVsbCxcbiAgXHRcdGVuZF90aW1lOiBudWxsLFxuICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgXHQgIHByb2plY3RfaWQ6IHBpZFxuICAgIH1cbiAgfVxuXG4gIHNldFByb2plY3QoIHRhc2ssIHByb2plY3QgKSB7XG4gICAgdGFzay5wcm9qZWN0X2lkID0gcHJvamVjdC5faWQ7XG4gIH1cblxuICBjcmVhdGVUYXNrKCkge1xuICBcdHRoaXMuZWRpdGluZ1Rhc2sgPSB0aGlzLmdldEJsYW5rVGFzaygpO1xuICBcdHRoaXMuaXNDcmVhdGluZyA9IHRydWU7XG4gIH1cblxuICBlZGl0VGFzayggdGFzayApIHtcbiAgXHR0aGlzLmVkaXRpbmdUYXNrID0gdGFzaztcbiAgXHR0aGlzLmlzRWRpdGluZyA9IHRydWU7XG4gIH1cblxuICBjYW5jZWxDcmVhdGUoKSB7XG4gIFx0Y29uc29sZS5sb2coIHRoaXMudGFza3MgKTtcbiAgXHR0aGlzLmlzQ3JlYXRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIHJlbW92ZVRhc2soIHRhc2sgKSB7XG4gIFx0dGhpcy5wb3VjaC5yZW1vdmVQcm9qZWN0KCB0YXNrICkudGhlbiggdCA9PiB7XG4gIFx0XHR0aGlzLnRhc2tzID0gdGhpcy50YXNrcy5maWx0ZXIoIHAgPT4ge1xuICBcdFx0XHRyZXR1cm4gcC5faWQgIT09IHRhc2suX2lkO1xuICBcdFx0fSk7XG4gIFx0fSk7XG4gIH1cblxuICBuZXdUYXNrKCB0YXNrICkge1xuICBcdHRoaXMucG91Y2guY3JlYXRlVGFzayggdGFzay5uYW1lLCB0YXNrLmRlc2MsIHRhc2sucHJvamVjdF9pZCApLnRoZW4oIHRhc2sgPT4ge1xuICBcdFx0dGhpcy50YXNrcy5wdXNoKCB0YXNrICk7XG4gIFx0XHR0aGlzLmVkaXRpbmdUYXNrID0gbnVsbDtcbiAgXHRcdHRoaXMuaXNDcmVhdGluZyA9IGZhbHNlO1xuICBcdH0pO1xuICB9XG5cbiAgdXBkYXRlVGFzayggdGFzayApIHtcbiAgXHRyZXR1cm4gdGhpcy5wb3VjaC51cGRhdGVUYXNrKCB0YXNrICkudGhlbiggdCA9PiB7XG4gIFx0XHR0aGlzLmVkaXRpbmdUYXNrID0gbnVsbDtcbiAgXHRcdHRoaXMuaXNFZGl0aW5nID0gZmFsc2U7XG4gIFx0XHRyZXR1cm4gdDtcbiAgXHR9KTtcbiAgfVxuXG4gIHN0YXJ0KCB0YXNrICkge1xuICBcdHRoaXMuc3RvcEFsbCgpLnRoZW4oICgpID0+IHtcblx0ICBcdHRoaXMuYWRkVGltZXIoIHRhc2sgKTtcblxuXHQgIFx0dGFzay5zdGF0dXMgPSAncnVubmluZyc7XG5cdCAgXHRsZXQgaW50ZXJ2YWwgPSB7XG4gICAgICAgIGlkOiBVVUlELnY0KCksXG5cdCAgXHRcdHN0YXJ0OiBEYXRlLm5vdygpLFxuXHQgIFx0XHRzdG9wOiBudWxsXG5cdCAgXHR9O1xuXG5cdCAgXHR0YXNrLmludGVydmFscy5wdXNoKCBpbnRlcnZhbCApO1xuXG5cdCAgXHR0aGlzLnVwZGF0ZVRhc2soIHRhc2sgKS50aGVuKCB0ID0+IHtcblx0ICBcdFx0dGFzayA9IHQ7XG5cdCAgXHRcdHRoaXMudGFza0luUHJvZ3Jlc3MgPSB0YXNrO1xuXHQgIFx0fSk7XG4gIFx0fSk7XG4gIH1cblxuICBzdG9wKCB0YXNrICkge1xuICBcdHRoaXMucmVtb3ZlVGltZXIoIHRhc2sgKTtcblxuICBcdHRhc2suc3RhdHVzID0gJ3BhdXNlZCc7XG4gIFx0XG4gIFx0bGV0IGxhc3RJbnRlcnZhbCA9IHRhc2suaW50ZXJ2YWxzWyB0YXNrLmludGVydmFscy5sZW5ndGggLSAxIF07XG5cbiAgXHRpZiggIWxhc3RJbnRlcnZhbC5zdG9wICkge1xuICBcdFx0bGFzdEludGVydmFsLnN0b3AgPSBEYXRlLm5vdygpO1xuICBcdH1cblxuICBcdHJldHVybiB0aGlzLnVwZGF0ZVRhc2soIHRhc2sgKS50aGVuKCB0ID0+IHtcbiAgXHRcdHRhc2sgPSB0O1xuICAgICAgdGhpcy50YXNrSW5Qcm9ncmVzcyA9IG51bGw7XG4gIFx0XHRyZXR1cm4gdDtcbiAgXHR9KTtcbiAgfVxuXG4gIHN0b3BBbGwoKSB7XG4gIFx0bGV0IHByb21zID0gW107XG5cbiAgXHR0aGlzLnRhc2tzLmZvckVhY2goIHQgPT4ge1xuICBcdFx0cHJvbXMucHVzaCggdGhpcy5zdG9wKHQpICk7XG4gIFx0fSk7XG5cbiAgXHRyZXR1cm4gUHJvbWlzZS5hbGwoIHByb21zICk7XG4gIH1cblxuICBhZGRUaW1lciggdGFzaywgZWxhcHNlZCApIHtcbiAgXHRpZiggIWVsYXBzZWQgKSB7XG4gIFx0XHRlbGFwc2VkID0gMDtcbiAgXHR9XG5cbiAgXHR0aGlzLnRpbWVyc1t0YXNrLl9pZF0gPSB7XG4gIFx0XHR0aW1lcjogbnVsbCxcbiAgXHRcdHNlY29uZHM6IGVsYXBzZWRcbiAgXHR9O1xuXG4gIFx0bGV0IHRpbWVyID0gd2luZG93LnNldEludGVydmFsKCAoKSA9PiB7XG4gIFx0XHR0aGlzLnRpbWVyc1t0YXNrLl9pZF0uc2Vjb25kcyArPSAxO1xuICBcdH0sIDEwMDAgKTtcbiAgXHR0aGlzLnRpbWVyc1t0YXNrLl9pZF0udGltZXIgPSB0aW1lcjtcbiAgfVxuXG4gIHJlbW92ZVRpbWVyKCB0YXNrICkge1xuICBcdGlmKCB0aGlzLnRpbWVyc1t0YXNrLl9pZF0gKSB7XG4gIFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbCggdGhpcy50aW1lcnNbdGFzay5faWRdLnRpbWVyICk7XG4gIFx0fVxuICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
