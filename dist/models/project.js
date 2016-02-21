System.register([], function (_export) {
	"use strict";

	var Project;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	return {
		setters: [],
		execute: function () {
			Project = (function () {
				function Project() {
					_classCallCheck(this, Project);

					this.name = null;
					this.desc = null;
					this.tasks = [];
				}

				_createClass(Project, [{
					key: "addTask",
					value: function addTask(task) {
						this.tasks.push(task);
					}
				}, {
					key: "removeTask",
					value: function removeTask(task) {}
				}]);

				return Project;
			})();

			_export("Project", Project);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVscy9wcm9qZWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztLQUNhLE9BQU87Ozs7Ozs7OztBQUFQLFVBQU87QUFLUixhQUxDLE9BQU8sR0FLTDsyQkFMRixPQUFPOztVQUNuQixJQUFJLEdBQUcsSUFBSTtVQUNYLElBQUksR0FBRyxJQUFJO1VBQ1gsS0FBSyxHQUFHLEVBQUU7S0FJVDs7aUJBUFcsT0FBTzs7WUFTWixpQkFBRSxJQUFJLEVBQUc7QUFDZixVQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUUsQ0FBQztNQUN4Qjs7O1lBRVMsb0JBQUUsSUFBSSxFQUFHLEVBRWxCOzs7V0FmVyxPQUFPIiwiZmlsZSI6Im1vZGVscy9wcm9qZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XG5cdG5hbWUgPSBudWxsO1xuXHRkZXNjID0gbnVsbDtcblx0dGFza3MgPSBbXTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblxuXHR9XG5cblx0YWRkVGFzayggdGFzayApIHtcblx0XHR0aGlzLnRhc2tzLnB1c2goIHRhc2sgKTtcblx0fVxuXG5cdHJlbW92ZVRhc2soIHRhc2sgKSB7XG5cblx0fVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
