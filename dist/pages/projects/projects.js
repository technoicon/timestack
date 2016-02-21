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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL3Byb2plY3RzL3Byb2plY3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs2QkFLcUIsUUFBUTs7Ozs7Ozs7b0NBTHJCLEtBQUs7O2lDQUNMLE1BQU07Ozs7O0FBSU8sY0FBUTtBQVNoQixpQkFUUSxRQUFRLENBU2QsS0FBSyxFQUFHOzs7ZUFSckIsT0FBTyxHQUFHLFVBQVU7ZUFDcEIsU0FBUyxHQUFHLFNBQVM7ZUFDckIsUUFBUSxHQUFHLEVBQUU7ZUFDYixjQUFjLEdBQUcsSUFBSTtlQUNyQixTQUFTLEdBQUcsS0FBSztlQUNqQixTQUFTLEdBQUcsS0FBSztlQUNqQixjQUFjLEdBQUcsSUFBSTs7QUFHcEIsY0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDbkI7O3FCQVhrQixRQUFROztpQkFhbkIsb0JBQUc7QUFDVCxnQkFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1dBQ2I7OztpQkFFRyxnQkFBRzs7O0FBQ0wsbUJBQU8sQ0FBQyxHQUFHLENBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBRSxDQUM3RCxJQUFJLENBQUUsVUFBQyxNQUFNLEVBQUs7QUFDakIsb0JBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUUsVUFBQSxDQUFDLEVBQUk7QUFDdEIsaUJBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztBQUNwQixzQkFBSyxRQUFRLENBQUMsSUFBSSxDQUFFLENBQUMsQ0FBQyxHQUFHLENBQUUsQ0FBQztlQUM3QixDQUFDLENBQUM7O0FBRUgsb0JBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUUsVUFBQSxDQUFDLEVBQUk7QUFDdEIsc0JBQUssb0JBQW9CLENBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBRSxDQUFDO2VBQ3BDLENBQUMsQ0FBQzthQUNKLENBQUMsQ0FBQztXQUNOOzs7aUJBRW1CLDhCQUFFLElBQUksRUFBRztBQUMzQixpQkFBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFHO0FBQzFDLGtCQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxVQUFVLEVBQUc7QUFDN0Msb0JBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztBQUNoQyxzQkFBTTtlQUNQO2FBQ0Y7V0FDRjs7O2lCQUVZLHVCQUFFLElBQUksRUFBRzs7O0FBQ3BCLGdCQUFJLENBQUMsSUFBSSxFQUFHLE9BQU87O0FBRXBCLGdCQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBRSxJQUFJLENBQUUsQ0FBQyxJQUFJLENBQUUsVUFBQSxJQUFJLEVBQUk7QUFDOUMsa0JBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztBQUN2QixxQkFBSyxRQUFRLENBQUMsT0FBTyxDQUFFLFVBQUEsQ0FBQyxFQUFJO0FBQzNCLG9CQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRztBQUN4Qiw0QkFBVSxHQUFHLElBQUksQ0FBQztpQkFDbEI7ZUFDRCxDQUFDLENBQUM7O0FBRUgsa0JBQUksVUFBVSxFQUFHO0FBQ2hCLHVCQUFLLElBQUksRUFBRSxDQUFDO2VBQ1osTUFBTTtBQUNOLHVCQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFFLENBQUM7QUFDM0IsdUJBQUssY0FBYyxHQUFHLElBQUksQ0FBQztlQUMzQjthQUVELENBQUMsQ0FBQztXQUNIOzs7aUJBRUcsZ0JBQUc7QUFDTCxnQkFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7V0FDdkI7OztpQkFFUyxzQkFBRztBQUNYLGdCQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztXQUN4Qjs7O2lCQUVZLHVCQUFFLE9BQU8sRUFBRzs7O0FBQ3hCLGdCQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBRSxPQUFPLENBQUUsQ0FBQyxJQUFJLENBQUUsVUFBQSxJQUFJLEVBQUk7QUFDakQscUJBQUssY0FBYyxHQUFHLElBQUksQ0FBQztBQUMzQixxQkFBSyxTQUFTLEdBQUcsS0FBSyxDQUFDO2FBQ3ZCLENBQUMsQ0FBQztXQUNIOzs7aUJBRVUscUJBQUUsT0FBTyxFQUFHO0FBQ3RCLGdCQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztBQUM5QixnQkFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7V0FDdEI7OztpQkFFVSxxQkFBRSxPQUFPLEVBQUc7QUFDckIsbUJBQU8sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1dBQ3hDOzs7aUJBRVMsc0JBQUc7QUFDWixnQkFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDdkIsZ0JBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1dBQzNCOzs7aUJBRVksdUJBQUUsT0FBTyxFQUFHOzs7QUFHdkIsZ0JBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFFLE9BQU8sQ0FBRSxDQUFDLElBQUksQ0FBRSxVQUFBLElBQUksRUFBSTtBQUNqRCxxQkFBSyxRQUFRLEdBQUcsT0FBSyxRQUFRLENBQUMsTUFBTSxDQUFFLFVBQUEsQ0FBQyxFQUFJO0FBQzFDLHVCQUFPLENBQUMsQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQztlQUM3QixDQUFDLENBQUM7YUFDSCxDQUFDLENBQUM7V0FFSjs7O3dCQW5Ha0IsUUFBUTtBQUFSLGdCQUFRLEdBRDVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FDTyxRQUFRLEtBQVIsUUFBUTtlQUFSLFFBQVE7Ozt5QkFBUixRQUFRIiwiZmlsZSI6InBhZ2VzL3Byb2plY3RzL3Byb2plY3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQb3VjaH0gZnJvbSAnc2VydmljZXMvcG91Y2gvcG91Y2guanMnO1xuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCAqIGFzIFBsZWFzZSBmcm9tICdwbGVhc2Vqcyc7XG5cbkBpbmplY3QoUG91Y2gpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0cyB7XG4gIGhlYWRpbmcgPSAnUHJvamVjdHMnO1xuICBpdGVtX3R5cGUgPSAnUHJvamVjdCc7XG4gIHByb2plY3RzID0gW107XG4gIG5ld1Byb2plY3ROYW1lID0gbnVsbDtcbiAgaXNFZGl0aW5nID0gZmFsc2U7XG4gIGlzV2FybmluZyA9IGZhbHNlO1xuICBlZGl0aW5nUHJvamVjdCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoIHBvdWNoICkge1xuICBcdHRoaXMucG91Y2ggPSBwb3VjaDtcdFxuICB9XG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIFByb21pc2UuYWxsKCBbdGhpcy5wb3VjaC5nZXRQcm9qZWN0cygpLCB0aGlzLnBvdWNoLmdldFRhc2tzKCldIClcbiAgICAgIC50aGVuKCAocmVzdWx0KSA9PiB7XG4gICAgICAgIHJlc3VsdFswXS5mb3JFYWNoKCBwID0+IHtcbiAgICAgICAgICBwLmRvYy5udW1fdGFza3MgPSAwO1xuICAgICAgICAgIHRoaXMucHJvamVjdHMucHVzaCggcC5kb2MgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzdWx0WzFdLmZvckVhY2goIHQgPT4ge1xuICAgICAgICAgIHRoaXMuaW5jcmVtZW50VGFza0NvdW50ZXIoIHQuZG9jICk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBpbmNyZW1lbnRUYXNrQ291bnRlciggdGFzayApIHtcbiAgICBmb3IoIGxldCBpPTA7IGk8dGhpcy5wcm9qZWN0cy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGlmKCB0aGlzLnByb2plY3RzW2ldLl9pZCA9PT0gdGFzay5wcm9qZWN0X2lkICkge1xuICAgICAgICB0aGlzLnByb2plY3RzW2ldLm51bV90YXNrcyArPSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjcmVhdGVQcm9qZWN0KCBuYW1lICkge1xuICAgIGlmKCAhbmFtZSApIHJldHVybjtcblxuICBcdHRoaXMucG91Y2guY3JlYXRlUHJvamVjdCggbmFtZSApLnRoZW4oIHByb2ogPT4ge1xuICBcdFx0bGV0IHByb2pFeGlzdHMgPSBmYWxzZTtcbiAgXHRcdHRoaXMucHJvamVjdHMuZm9yRWFjaCggcCA9PiB7XG4gIFx0XHRcdGlmKCBwLl9pZCA9PT0gcHJvai5faWQgKSB7XG4gIFx0XHRcdFx0cHJvakV4aXN0cyA9IHRydWU7XG4gIFx0XHRcdH1cbiAgXHRcdH0pO1xuXG4gIFx0XHRpZiggcHJvakV4aXN0cyApIHtcbiAgXHRcdFx0dGhpcy53YXJuKCk7XG4gIFx0XHR9IGVsc2Uge1xuICBcdFx0XHR0aGlzLnByb2plY3RzLnB1c2goIHByb2ogKTtcbiAgXHRcdFx0dGhpcy5uZXdQcm9qZWN0TmFtZSA9IG51bGw7XG4gIFx0XHR9XG5cbiAgXHR9KTtcbiAgfVxuXG4gIHdhcm4oKSB7XG4gICAgdGhpcy5pc1dhcm5pbmcgPSB0cnVlO1xuICB9XG5cbiAgY2FuY2VsV2FybigpIHtcbiAgICB0aGlzLmlzV2FybmluZyA9IGZhbHNlO1xuICB9XG5cbiAgdXBkYXRlUHJvamVjdCggcHJvamVjdCApIHtcbiAgXHR0aGlzLnBvdWNoLnVwZGF0ZVByb2plY3QoIHByb2plY3QgKS50aGVuKCBwcm9qID0+IHtcbiAgXHRcdHRoaXMuZWRpdGluZ1Byb2plY3QgPSBudWxsO1xuICBcdFx0dGhpcy5pc0VkaXRpbmcgPSBmYWxzZTtcbiAgXHR9KTtcbiAgfVxuXG4gIGVkaXRQcm9qZWN0KCBwcm9qZWN0ICkge1xuICBcdHRoaXMuZWRpdGluZ1Byb2plY3QgPSBwcm9qZWN0O1xuXHQgIHRoaXMuaXNFZGl0aW5nID0gdHJ1ZTtcbiAgfVxuXG4gIHVwZGF0ZUNvbG9yKCBwcm9qZWN0ICkge1xuICAgIHByb2plY3QuY29sb3IgPSBQbGVhc2UubWFrZV9jb2xvcigpWzBdO1xuICB9XG5cbiAgY2FuY2VsRWRpdCgpIHtcbiAgXHR0aGlzLmlzRWRpdGluZyA9IGZhbHNlO1xuICBcdHRoaXMuZWRpdGluZ1Byb2plY3QgPSBudWxsO1xuICB9XG5cbiAgcmVtb3ZlUHJvamVjdCggcHJvamVjdCApIHtcbiAgXHQvL2xldCBzdXJlID0gd2luZG93LmNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBwcm9qZWN0PycpO1xuICBcdC8vaWYoIHN1cmUgKSB7XG5cdCAgXHR0aGlzLnBvdWNoLnJlbW92ZVByb2plY3QoIHByb2plY3QgKS50aGVuKCBwcm9qID0+IHtcblx0ICBcdFx0dGhpcy5wcm9qZWN0cyA9IHRoaXMucHJvamVjdHMuZmlsdGVyKCBwID0+IHtcblx0ICBcdFx0XHRyZXR1cm4gcC5faWQgIT09IHByb2plY3QuX2lkO1xuXHQgIFx0XHR9KTtcblx0ICBcdH0pO1xuICBcdC8vfVxuICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
