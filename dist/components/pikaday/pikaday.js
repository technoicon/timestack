System.register(['aurelia-framework', 'aurelia-event-aggregator'], function (_export) {
	'use strict';

	var customElement, bindable, inject, EventAggregator, PikadayThing;

	var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

	return {
		setters: [function (_aureliaFramework) {
			customElement = _aureliaFramework.customElement;
			bindable = _aureliaFramework.bindable;
			inject = _aureliaFramework.inject;
		}, function (_aureliaEventAggregator) {
			EventAggregator = _aureliaEventAggregator.EventAggregator;
		}],
		execute: function () {
			PikadayThing = (function () {
				var _instanceInitializers = {};
				var _instanceInitializers = {};

				_createDecoratedClass(PikadayThing, [{
					key: 'day',
					decorators: [bindable],
					initializer: null,
					enumerable: true
				}], null, _instanceInitializers);

				function PikadayThing(element, events) {
					_classCallCheck(this, _PikadayThing);

					_defineDecoratedPropertyDescriptor(this, 'day', _instanceInitializers);

					this.element = element;
					this.events = events;
				}

				_createDecoratedClass(PikadayThing, [{
					key: 'attached',
					value: function attached() {
						var _this = this;

						var el = this.element.querySelector("input[type=text]");

						if (el) {
							this.pik = new Pikaday({
								field: el,
								onSelect: function onSelect(date) {
									_this.selectDate(date);
								}
							});
						}
					}
				}, {
					key: 'selectDate',
					value: function selectDate(date) {
						this.day = date.getTime();
						this.events.publish('time-update-charts', this.day);
					}
				}], null, _instanceInitializers);

				var _PikadayThing = PikadayThing;
				PikadayThing = inject(Element, EventAggregator)(PikadayThing) || PikadayThing;
				PikadayThing = customElement('pikaday')(PikadayThing) || PikadayThing;
				return PikadayThing;
			})();

			_export('PikadayThing', PikadayThing);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcGlrYWRheS9waWthZGF5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt1REFNYSxZQUFZOzs7Ozs7Ozs7O3FDQU5qQixhQUFhO2dDQUFFLFFBQVE7OEJBQ3ZCLE1BQU07OzZDQUNOLGVBQWU7OztBQUlWLGVBQVk7Ozs7MEJBQVosWUFBWTs7a0JBQ3ZCLFFBQVE7Ozs7O0FBRUUsYUFIQyxZQUFZLENBR1osT0FBTyxFQUFFLE1BQU0sRUFBRTs7Ozs7QUFDNUIsU0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsU0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7S0FDckI7OzBCQU5XLFlBQVk7O1lBUWhCLG9CQUFHOzs7QUFDVixVQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztBQUV4RCxVQUFJLEVBQUUsRUFBRztBQUNSLFdBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxPQUFPLENBQUM7QUFDdEIsYUFBSyxFQUFFLEVBQUU7QUFDVCxnQkFBUSxFQUFFLGtCQUFDLElBQUksRUFBSztBQUNuQixlQUFLLFVBQVUsQ0FBRSxJQUFJLENBQUUsQ0FBQztTQUN4QjtRQUNELENBQUMsQ0FBQztPQUNIO01BQ0Q7OztZQUVTLG9CQUFFLElBQUksRUFBRztBQUNsQixVQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUMxQixVQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7TUFDcEQ7Ozt3QkF4QlcsWUFBWTtBQUFaLGdCQUFZLEdBRHhCLE1BQU0sQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQ3BCLFlBQVksS0FBWixZQUFZO0FBQVosZ0JBQVksR0FGeEIsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUVaLFlBQVksS0FBWixZQUFZO1dBQVosWUFBWSIsImZpbGUiOiJjb21wb25lbnRzL3Bpa2FkYXkvcGlrYWRheS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3VzdG9tRWxlbWVudCwgYmluZGFibGV9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge0V2ZW50QWdncmVnYXRvcn0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcblxuQGN1c3RvbUVsZW1lbnQoJ3Bpa2FkYXknKVxuQGluamVjdChFbGVtZW50LCBFdmVudEFnZ3JlZ2F0b3IpXG5leHBvcnQgY2xhc3MgUGlrYWRheVRoaW5nIHtcblx0QGJpbmRhYmxlIGRheTtcblxuXHRjb25zdHJ1Y3RvcihlbGVtZW50LCBldmVudHMpIHtcblx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXHRcdHRoaXMuZXZlbnRzID0gZXZlbnRzO1xuXHR9XG5cblx0YXR0YWNoZWQoKSB7XG5cdFx0bGV0IGVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPXRleHRdXCIpO1xuXG5cdFx0aWYoIGVsICkge1xuXHRcdFx0dGhpcy5waWsgPSBuZXcgUGlrYWRheSh7XG5cdFx0XHRcdGZpZWxkOiBlbCxcblx0XHRcdFx0b25TZWxlY3Q6IChkYXRlKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5zZWxlY3REYXRlKCBkYXRlICk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHNlbGVjdERhdGUoIGRhdGUgKSB7XG5cdFx0dGhpcy5kYXkgPSBkYXRlLmdldFRpbWUoKTtcblx0XHR0aGlzLmV2ZW50cy5wdWJsaXNoKCd0aW1lLXVwZGF0ZS1jaGFydHMnLCB0aGlzLmRheSk7XG5cdH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
