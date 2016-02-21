System.register(['aurelia-framework'], function (_export) {
	'use strict';

	var customElement, bindable, Modal;

	var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

	return {
		setters: [function (_aureliaFramework) {
			customElement = _aureliaFramework.customElement;
			bindable = _aureliaFramework.bindable;
		}],
		execute: function () {
			Modal = (function () {
				var _instanceInitializers = {};
				var _instanceInitializers = {};

				_createDecoratedClass(Modal, [{
					key: 'visible',
					decorators: [bindable],
					initializer: null,
					enumerable: true
				}], null, _instanceInitializers);

				function Modal() {
					_classCallCheck(this, _Modal);

					_defineDecoratedPropertyDescriptor(this, 'visible', _instanceInitializers);
				}

				_createDecoratedClass(Modal, [{
					key: 'hide',
					value: function hide() {
						this.visible = false;
					}
				}, {
					key: 'show',
					value: function show() {
						this.visible = true;
					}
				}], null, _instanceInitializers);

				var _Modal = Modal;
				Modal = customElement('modal')(Modal) || Modal;
				return Modal;
			})();

			_export('Modal', Modal);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbW9kYWwvbW9kYWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzhCQUdhLEtBQUs7Ozs7Ozs7Ozs7cUNBSFYsYUFBYTtnQ0FBRSxRQUFROzs7QUFHbEIsUUFBSzs7OzswQkFBTCxLQUFLOztrQkFDaEIsUUFBUTs7Ozs7QUFFRSxhQUhDLEtBQUssR0FHSDs7OztLQUViOzswQkFMVyxLQUFLOztZQU9iLGdCQUFHO0FBQ04sVUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7TUFDckI7OztZQUVHLGdCQUFHO0FBQ04sVUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7TUFDcEI7OztpQkFiVyxLQUFLO0FBQUwsU0FBSyxHQURqQixhQUFhLENBQUMsT0FBTyxDQUFDLENBQ1YsS0FBSyxLQUFMLEtBQUs7V0FBTCxLQUFLIiwiZmlsZSI6ImNvbXBvbmVudHMvbW9kYWwvbW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2N1c3RvbUVsZW1lbnQsIGJpbmRhYmxlfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5cbkBjdXN0b21FbGVtZW50KCdtb2RhbCcpXG5leHBvcnQgY2xhc3MgTW9kYWwge1xuXHRAYmluZGFibGUgdmlzaWJsZTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblxuXHR9XG5cblx0aGlkZSgpIHtcblx0XHR0aGlzLnZpc2libGUgPSBmYWxzZTtcblx0fVxuXG5cdHNob3coKSB7XG5cdFx0dGhpcy52aXNpYmxlID0gdHJ1ZTtcblx0fVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
