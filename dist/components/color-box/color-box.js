System.register(['aurelia-framework', 'services/pouch/pouch.js'], function (_export) {
	'use strict';

	var customElement, bindable, inject, Pouch, ColorBox;

	var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

	return {
		setters: [function (_aureliaFramework) {
			customElement = _aureliaFramework.customElement;
			bindable = _aureliaFramework.bindable;
			inject = _aureliaFramework.inject;
		}, function (_servicesPouchPouchJs) {
			Pouch = _servicesPouchPouchJs.Pouch;
		}],
		execute: function () {
			ColorBox = (function () {
				var _instanceInitializers = {};
				var _instanceInitializers = {};

				_createDecoratedClass(ColorBox, [{
					key: 'project_id',
					decorators: [bindable],
					initializer: function initializer() {
						return null;
					},
					enumerable: true
				}, {
					key: 'project',
					decorators: [bindable],
					initializer: function initializer() {
						return null;
					},
					enumerable: true
				}], null, _instanceInitializers);

				function ColorBox(pouch) {
					_classCallCheck(this, _ColorBox);

					_defineDecoratedPropertyDescriptor(this, 'project_id', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'project', _instanceInitializers);

					this.pouch = pouch;
				}

				_createDecoratedClass(ColorBox, [{
					key: 'activate',
					value: function activate() {
						this.setColor(this.project_id);
					}
				}, {
					key: 'project_idChanged',
					value: function project_idChanged(newVal, oldVal) {
						this.setColor(newVal);
					}
				}, {
					key: 'setColor',
					value: function setColor(id) {
						var _this = this;

						if (!id) return;

						this.pouch.getProject(id).then(function (result) {
							_this.project = result;
						});
					}
				}], null, _instanceInitializers);

				var _ColorBox = ColorBox;
				ColorBox = inject(Pouch)(ColorBox) || ColorBox;
				ColorBox = customElement('color-box')(ColorBox) || ColorBox;
				return ColorBox;
			})();

			_export('ColorBox', ColorBox);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29sb3ItYm94L2NvbG9yLWJveC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7NkNBTWEsUUFBUTs7Ozs7Ozs7OztxQ0FOYixhQUFhO2dDQUFFLFFBQVE7OEJBRXZCLE1BQU07O2lDQUROLEtBQUs7OztBQUtBLFdBQVE7Ozs7MEJBQVIsUUFBUTs7a0JBQ25CLFFBQVE7O2FBQWMsSUFBSTs7Ozs7a0JBQzFCLFFBQVE7O2FBQVcsSUFBSTs7Ozs7QUFFYixhQUpDLFFBQVEsQ0FJUixLQUFLLEVBQUU7Ozs7Ozs7QUFDbEIsU0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDbkI7OzBCQU5XLFFBQVE7O1lBUVosb0JBQUc7QUFDVixVQUFJLENBQUMsUUFBUSxDQUFFLElBQUksQ0FBQyxVQUFVLENBQUUsQ0FBQztNQUNqQzs7O1lBRWdCLDJCQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDakMsVUFBSSxDQUFDLFFBQVEsQ0FBRSxNQUFNLENBQUUsQ0FBQztNQUN4Qjs7O1lBRU8sa0JBQUUsRUFBRSxFQUFHOzs7QUFDZCxVQUFJLENBQUMsRUFBRSxFQUFHLE9BQU87O0FBRWpCLFVBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFFLEVBQUUsQ0FBRSxDQUFDLElBQUksQ0FBRSxVQUFBLE1BQU0sRUFBSTtBQUMzQyxhQUFLLE9BQU8sR0FBRyxNQUFNLENBQUM7T0FDdEIsQ0FBQyxDQUFDO01BQ0g7OztvQkF0QlcsUUFBUTtBQUFSLFlBQVEsR0FEcEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUNELFFBQVEsS0FBUixRQUFRO0FBQVIsWUFBUSxHQUZwQixhQUFhLENBQUMsV0FBVyxDQUFDLENBRWQsUUFBUSxLQUFSLFFBQVE7V0FBUixRQUFRIiwiZmlsZSI6ImNvbXBvbmVudHMvY29sb3ItYm94L2NvbG9yLWJveC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3VzdG9tRWxlbWVudCwgYmluZGFibGV9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7UG91Y2h9IGZyb20gJ3NlcnZpY2VzL3BvdWNoL3BvdWNoLmpzJztcbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5cbkBjdXN0b21FbGVtZW50KCdjb2xvci1ib3gnKVxuQGluamVjdChQb3VjaClcbmV4cG9ydCBjbGFzcyBDb2xvckJveCB7XG5cdEBiaW5kYWJsZSBwcm9qZWN0X2lkID0gbnVsbDtcblx0QGJpbmRhYmxlIHByb2plY3QgPSBudWxsO1xuXG5cdGNvbnN0cnVjdG9yKHBvdWNoKSB7XG5cdFx0dGhpcy5wb3VjaCA9IHBvdWNoO1xuXHR9XG5cblx0YWN0aXZhdGUoKSB7XG5cdFx0dGhpcy5zZXRDb2xvciggdGhpcy5wcm9qZWN0X2lkICk7XG5cdH1cblxuXHRwcm9qZWN0X2lkQ2hhbmdlZChuZXdWYWwsIG9sZFZhbCkge1xuXHRcdHRoaXMuc2V0Q29sb3IoIG5ld1ZhbCApO1xuXHR9XG5cblx0c2V0Q29sb3IoIGlkICkge1xuXHRcdGlmKCAhaWQgKSByZXR1cm47XG5cblx0XHR0aGlzLnBvdWNoLmdldFByb2plY3QoIGlkICkudGhlbiggcmVzdWx0ID0+IHtcblx0XHRcdHRoaXMucHJvamVjdCA9IHJlc3VsdDtcblx0XHR9KTtcblx0fVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
