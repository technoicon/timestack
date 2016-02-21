System.register(['aurelia-framework'], function (_export) {
	'use strict';

	var customElement, bindable, TaskInterval;

	var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

	return {
		setters: [function (_aureliaFramework) {
			customElement = _aureliaFramework.customElement;
			bindable = _aureliaFramework.bindable;
		}],
		execute: function () {
			TaskInterval = (function () {
				var _instanceInitializers = {};
				var _instanceInitializers = {};

				_createDecoratedClass(TaskInterval, [{
					key: 'interval',
					decorators: [bindable],
					initializer: function initializer() {
						return null;
					},
					enumerable: true
				}], null, _instanceInitializers);

				function TaskInterval() {
					_classCallCheck(this, _TaskInterval);

					_defineDecoratedPropertyDescriptor(this, 'interval', _instanceInitializers);
				}

				_createDecoratedClass(TaskInterval, [{
					key: 'activate',
					value: function activate() {
						this.init();
					}
				}, {
					key: 'init',
					value: function init() {}
				}], null, _instanceInitializers);

				var _TaskInterval = TaskInterval;
				TaskInterval = customElement('task-interval')(TaskInterval) || TaskInterval;
				return TaskInterval;
			})();

			_export('TaskInterval', TaskInterval);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGFzay1pbnRlcnZhbC90YXNrLWludGVydmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs4QkFHYSxZQUFZOzs7Ozs7Ozs7O3FDQUhqQixhQUFhO2dDQUFFLFFBQVE7OztBQUdsQixlQUFZOzs7OzBCQUFaLFlBQVk7O2tCQUN2QixRQUFROzthQUFZLElBQUk7Ozs7O0FBRWQsYUFIQyxZQUFZLEdBR1Y7Ozs7S0FFYjs7MEJBTFcsWUFBWTs7WUFPaEIsb0JBQUc7QUFDVixVQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7TUFDWjs7O1lBRUcsZ0JBQUcsRUFFTjs7O3dCQWJXLFlBQVk7QUFBWixnQkFBWSxHQUR4QixhQUFhLENBQUMsZUFBZSxDQUFDLENBQ2xCLFlBQVksS0FBWixZQUFZO1dBQVosWUFBWSIsImZpbGUiOiJjb21wb25lbnRzL3Rhc2staW50ZXJ2YWwvdGFzay1pbnRlcnZhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3VzdG9tRWxlbWVudCwgYmluZGFibGV9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcblxuQGN1c3RvbUVsZW1lbnQoJ3Rhc2staW50ZXJ2YWwnKVxuZXhwb3J0IGNsYXNzIFRhc2tJbnRlcnZhbCB7XG5cdEBiaW5kYWJsZSBpbnRlcnZhbCA9IG51bGw7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cblx0fVxuXG5cdGFjdGl2YXRlKCkge1xuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblx0aW5pdCgpIHtcblxuXHR9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
