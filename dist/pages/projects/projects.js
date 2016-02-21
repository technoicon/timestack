System.register(['services/pouch/pouch.js', 'aurelia-framework', 'pleasejs'], function (_export) {
  'use strict';

  var Pouch, inject, Please, Projects;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_servicesPouchPouchJs) {
      Pouch = _servicesPouchPouchJs.Pouch;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_pleasejs) {
      Please = _pleasejs;
    }],
    execute: function () {
      Projects = (function () {
        function Projects(pouch) {
          _classCallCheck(this, _Projects);

          this.heading = 'Projects';
          this.item_type = 'Project';
          this.projects = [];
          this.newProjectName = null;
          this.isEditing = false;
          this.isWarning = false;
          this.editingProject = null;

          this.pouch = pouch;
        }

        _createClass(Projects, [{
          key: 'activate',
          value: function activate() {
            this.init();
          }
        }, {
          key: 'init',
          value: function init() {
            var _this = this;

            this.pouch.getSettings().then(function (s) {
              if (s) {
                _this.settings = s;
              } else {
                _this.pouch.createSettings().then(function (created) {
                  _this.settings = created;
                });
              }
            });

            Promise.all([this.pouch.getProjects(), this.pouch.getTasks()]).then(function (result) {
              result[0].forEach(function (p) {
                p.doc.num_tasks = 0;
                _this.projects.push(p.doc);
              });

              result[1].forEach(function (t) {
                _this.incrementTaskCounter(t.doc);
              });
            });
          }
        }, {
          key: 'incrementTaskCounter',
          value: function incrementTaskCounter(task) {
            for (var i = 0; i < this.projects.length; i++) {
              if (this.projects[i]._id === task.project_id) {
                this.projects[i].num_tasks += 1;
                break;
              }
            }
          }
        }, {
          key: 'createProject',
          value: function createProject(name) {
            var _this2 = this;

            if (!name) return;

            this.pouch.createProject(name).then(function (proj) {
              var projExists = false;
              _this2.projects.forEach(function (p) {
                if (p._id === proj._id) {
                  projExists = true;
                }
              });

              if (projExists) {
                _this2.warn();
              } else {
                _this2.projects.push(proj);
                _this2.newProjectName = null;
              }
            });
          }
        }, {
          key: 'warn',
          value: function warn() {
            this.isWarning = true;
          }
        }, {
          key: 'cancelWarn',
          value: function cancelWarn() {
            this.isWarning = false;
          }
        }, {
          key: 'updateProject',
          value: function updateProject(project) {
            var _this3 = this;

            this.pouch.updateProject(project).then(function (proj) {
              _this3.editingProject = null;
              _this3.isEditing = false;
            });
          }
        }, {
          key: 'editProject',
          value: function editProject(project) {
            this.editingProject = project;
            this.isEditing = true;
          }
        }, {
          key: 'updateColor',
          value: function updateColor(project) {
            project.color = Please.make_color()[0];
          }
        }, {
          key: 'cancelEdit',
          value: function cancelEdit() {
            this.isEditing = false;
            this.editingProject = null;
          }
        }, {
          key: 'removeProject',
          value: function removeProject(project) {
            var _this4 = this;

            this.pouch.removeProject(project).then(function (proj) {
              _this4.projects = _this4.projects.filter(function (p) {
                return p._id !== project._id;
              });
            });
          }
        }]);

        var _Projects = Projects;
        Projects = inject(Pouch)(Projects) || Projects;
        return Projects;
      })();

      _export('default', Projects);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL3Byb2plY3RzL3Byb2plY3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs2QkFLcUIsUUFBUTs7Ozs7Ozs7b0NBTHJCLEtBQUs7O2lDQUNMLE1BQU07Ozs7O0FBSU8sY0FBUTtBQVNoQixpQkFUUSxRQUFRLENBU2QsS0FBSyxFQUFHOzs7ZUFSckIsT0FBTyxHQUFHLFVBQVU7ZUFDcEIsU0FBUyxHQUFHLFNBQVM7ZUFDckIsUUFBUSxHQUFHLEVBQUU7ZUFDYixjQUFjLEdBQUcsSUFBSTtlQUNyQixTQUFTLEdBQUcsS0FBSztlQUNqQixTQUFTLEdBQUcsS0FBSztlQUNqQixjQUFjLEdBQUcsSUFBSTs7QUFHcEIsY0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDbkI7O3FCQVhrQixRQUFROztpQkFhbkIsb0JBQUc7QUFDVCxnQkFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1dBQ2I7OztpQkFFRyxnQkFBRzs7O0FBQ0wsZ0JBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFFLFVBQUEsQ0FBQyxFQUFJO0FBQ2xDLGtCQUFJLENBQUMsRUFBRztBQUNOLHNCQUFLLFFBQVEsR0FBRyxDQUFDLENBQUM7ZUFDbkIsTUFBTTtBQUNMLHNCQUFLLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUUsVUFBQSxPQUFPLEVBQUk7QUFDM0Msd0JBQUssUUFBUSxHQUFHLE9BQU8sQ0FBQztpQkFDekIsQ0FBQyxDQUFDO2VBQ0o7YUFDRixDQUFDLENBQUM7O0FBRUgsbUJBQU8sQ0FBQyxHQUFHLENBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBRSxDQUM3RCxJQUFJLENBQUUsVUFBQyxNQUFNLEVBQUs7QUFDakIsb0JBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUUsVUFBQSxDQUFDLEVBQUk7QUFDdEIs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QUFHLEtBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQztlQUM3QixDQUFDLENBQUM7YUFDSCxDQUFDLENBQUM7V0FFSjs7O3dCQTdHa0IsUUFBUTtBQUFSLGdCQUFRLEdBRDVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FDTyxRQUFRLEtBQVIsUUFBUTtlQUFSLFFBQVE7Ozt5QkFBUixRQUFRIiwiZmlsZSI6InBhZ2VzL3Byb2plY3RzL3Byb2plY3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQb3VjaH0gZnJvbSAnc2VydmljZXMvcG91Y2gvcG91Y2guanMnO1xuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCAqIGFzIFBsZWFzZSBmcm9tICdwbGVhc2Vqcyc7XG5cbkBpbmplY3QoUG91Y2gpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0cyB7XG4gIGhlYWRpbmcgPSAnUHJvamVjdHMnO1xuICBpdGVtX3R5cGUgPSAnUHJvamVjdCc7XG4gIHByb2plY3RzID0gW107XG4gIG5ld1Byb2plY3ROYW1lID0gbnVsbDtcbiAgaXNFZGl0aW5nID0gZmFsc2U7XG4gIGlzV2FybmluZyA9IGZhbHNlO1xuICBlZGl0aW5nUHJvamVjdCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoIHBvdWNoICkge1xuICBcdHRoaXMucG91Y2ggPSBwb3VjaDtcdFxuICB9XG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMucG91Y2guZ2V0U2V0dGluZ3MoKS50aGVuKCBzID0+IHtcbiAgICAgIGlmKCBzICkge1xuICAgICAgICB0aGlzLnNldHRpbmdzID0gcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucG91Y2guY3JlYXRlU2V0dGluZ3MoKS50aGVuKCBjcmVhdGVkID0+IHtcbiAgICAgICAgICB0aGlzLnNldHRpbmdzID0gY3JlYXRlZDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBQcm9taXNlLmFsbCggW3RoaXMucG91Y2guZ2V0UHJvamVjdHMoKSwgdGhpcy5wb3VjaC5nZXRUYXNrcygpXSApXG4gICAgICAudGhlbiggKHJlc3VsdCkgPT4ge1xuICAgICAgICByZXN1bHRbMF0uZm9yRWFjaCggcCA9PiB7XG4gICAgICAgICAgcC5kb2MubnVtX3Rhc2tzID0gMDtcbiAgICAgICAgICB0aGlzLnByb2plY3RzLnB1c2goIHAuZG9jICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlc3VsdFsxXS5mb3JFYWNoKCB0ID0+IHtcbiAgICAgICAgICB0aGlzLmluY3JlbWVudFRhc2tDb3VudGVyKCB0LmRvYyApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgaW5jcmVtZW50VGFza0NvdW50ZXIoIHRhc2sgKSB7XG4gICAgZm9yKCBsZXQgaT0wOyBpPHRoaXMucHJvamVjdHMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBpZiggdGhpcy5wcm9qZWN0c1tpXS5faWQgPT09IHRhc2sucHJvamVjdF9pZCApIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0c1tpXS5udW1fdGFza3MgKz0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlUHJvamVjdCggbmFtZSApIHtcbiAgICBpZiggIW5hbWUgKSByZXR1cm47XG5cbiAgXHR0aGlzLnBvdWNoLmNyZWF0ZVByb2plY3QoIG5hbWUgKS50aGVuKCBwcm9qID0+IHtcbiAgXHRcdGxldCBwcm9qRXhpc3RzID0gZmFsc2U7XG4gIFx0XHR0aGlzLnByb2plY3RzLmZvckVhY2goIHAgPT4ge1xuICBcdFx0XHRpZiggcC5faWQgPT09IHByb2ouX2lkICkge1xuICBcdFx0XHRcdHByb2pFeGlzdHMgPSB0cnVlO1xuICBcdFx0XHR9XG4gIFx0XHR9KTtcblxuICBcdFx0aWYoIHByb2pFeGlzdHMgKSB7XG4gIFx0XHRcdHRoaXMud2FybigpO1xuICBcdFx0fSBlbHNlIHtcbiAgXHRcdFx0dGhpcy5wcm9qZWN0cy5wdXNoKCBwcm9qICk7XG4gIFx0XHRcdHRoaXMubmV3UHJvamVjdE5hbWUgPSBudWxsO1xuICBcdFx0fVxuXG4gIFx0fSk7XG4gIH1cblxuICB3YXJuKCkge1xuICAgIHRoaXMuaXNXYXJuaW5nID0gdHJ1ZTtcbiAgfVxuXG4gIGNhbmNlbFdhcm4oKSB7XG4gICAgdGhpcy5pc1dhcm5pbmcgPSBmYWxzZTtcbiAgfVxuXG4gIHVwZGF0ZVByb2plY3QoIHByb2plY3QgKSB7XG4gIFx0dGhpcy5wb3VjaC51cGRhdGVQcm9qZWN0KCBwcm9qZWN0ICkudGhlbiggcHJvaiA9PiB7XG4gIFx0XHR0aGlzLmVkaXRpbmdQcm9qZWN0ID0gbnVsbDtcbiAgXHRcdHRoaXMuaXNFZGl0aW5nID0gZmFsc2U7XG4gIFx0fSk7XG4gIH1cblxuICBlZGl0UHJvamVjdCggcHJvamVjdCApIHtcbiAgXHR0aGlzLmVkaXRpbmdQcm9qZWN0ID0gcHJvamVjdDtcblx0ICB0aGlzLmlzRWRpdGluZyA9IHRydWU7XG4gIH1cblxuICB1cGRhdGVDb2xvciggcHJvamVjdCApIHtcbiAgICBwcm9qZWN0LmNvbG9yID0gUGxlYXNlLm1ha2VfY29sb3IoKVswXTtcbiAgfVxuXG4gIGNhbmNlbEVkaXQoKSB7XG4gIFx0dGhpcy5pc0VkaXRpbmcgPSBmYWxzZTtcbiAgXHR0aGlzLmVkaXRpbmdQcm9qZWN0ID0gbnVsbDtcbiAgfVxuXG4gIHJlbW92ZVByb2plY3QoIHByb2plY3QgKSB7XG4gIFx0Ly9sZXQgc3VyZSA9IHdpbmRvdy5jb25maXJtKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgcHJvamVjdD8nKTtcbiAgXHQvL2lmKCBzdXJlICkge1xuXHQgIFx0dGhpcy5wb3VjaC5yZW1vdmVQcm9qZWN0KCBwcm9qZWN0ICkudGhlbiggcHJvaiA9PiB7XG5cdCAgXHRcdHRoaXMucHJvamVjdHMgPSB0aGlzLnByb2plY3RzLmZpbHRlciggcCA9PiB7XG5cdCAgXHRcdFx0cmV0dXJuIHAuX2lkICE9PSBwcm9qZWN0Ll9pZDtcblx0ICBcdFx0fSk7XG5cdCAgXHR9KTtcbiAgXHQvL31cbiAgfVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
