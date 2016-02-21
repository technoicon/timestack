System.register(['services/pouch/pouch.js', 'aurelia-framework'], function (_export) {
	'use strict';

	var Pouch, inject, bindable, Settings;

	var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

	return {
		setters: [function (_servicesPouchPouchJs) {
			Pouch = _servicesPouchPouchJs.Pouch;
		}, function (_aureliaFramework) {
			inject = _aureliaFramework.inject;
			bindable = _aureliaFramework.bindable;
		}],
		execute: function () {
			Settings = (function () {
				var _instanceInitializers = {};
				var _instanceInitializers = {};

				_createDecoratedClass(Settings, [{
					key: 'auto_start',
					decorators: [bindable],
					initializer: function initializer() {
						return false;
					},
					enumerable: true
				}, {
					key: 'default_project',
					decorators: [bindable],
					initializer: function initializer() {
						return null;
					},
					enumerable: true
				}, {
					key: 'remove_related',
					decorators: [bindable],
					initializer: function initializer() {
						return true;
					},
					enumerable: true
				}], null, _instanceInitializers);

				function Settings(pouch) {
					_classCallCheck(this, _Settings);

					this.heading = 'Settings';
					this.projects = [];
					this.latest = false;

					_defineDecoratedPropertyDescriptor(this, 'auto_start', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'default_project', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'remove_related', _instanceInitializers);

					this.pouch = pouch;
				}

				_createDecoratedClass(Settings, [{
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
								_this.mapSettingsFrom(s);
							} else {
								console.warn('Creating default settings');
								_this.pouch.createSettings().then(function (s) {
									_this.mapSettingsFrom(s);
								});
							}
						});

						this.pouch.getProjects().then(function (projects) {
							projects.forEach(function (p) {
								_this.projects.push(p.doc);
							});
						});
					}
				}, {
					key: 'setDefaultProject',
					value: function setDefaultProject(project) {
						this.default_project = project._id;
					}
				}, {
					key: 'auto_startChanged',
					value: function auto_startChanged() {
						this.updateSettings();
					}
				}, {
					key: 'default_projectChanged',
					value: function default_projectChanged() {
						this.updateSettings();
					}
				}, {
					key: 'remove_relatedChanged',
					value: function remove_relatedChanged() {
						this.updateSettings();
					}
				}, {
					key: 'updateSettings',
					value: function updateSettings() {
						if (!this.latest) return;
						this.pouch.updateSettings(this.mapSettingsTo()).then(function (result) {});
					}
				}, {
					key: 'mapSettingsTo',
					value: function mapSettingsTo() {
						return {
							auto_start: this.auto_start,
							default_project: this.default_project,
							remove_related: this.remove_related
						};
					}
				}, {
					key: 'mapSettingsFrom',
					value: function mapSettingsFrom(remote) {
						var _this2 = this;

						this.auto_start = remote.auto_start;
						this.default_project = remote.default_project;
						this.remove_related = remote.remove_related;

						setTimeout(function () {
							_this2.latest = true;
						});
					}
				}, {
					key: 'deleteAll',
					value: function deleteAll() {
						this.pouch.nuke().then(function (done) {
							window.location.href = '/';
						});
					}
				}], null, _instanceInitializers);

				var _Settings = Settings;
				Settings = inject(Pouch)(Settings) || Settings;
				return Settings;
			})();

			_export('Settings', Settings);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL3NldHRpbmdzL3NldHRpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs4QkFLYSxRQUFROzs7Ozs7Ozs7O2lDQUxiLEtBQUs7OzhCQUNMLE1BQU07Z0NBQ04sUUFBUTs7O0FBR0gsV0FBUTs7OzswQkFBUixRQUFROztrQkFNbkIsUUFBUTs7YUFBYyxLQUFLOzs7OztrQkFHM0IsUUFBUTs7YUFBbUIsSUFBSTs7Ozs7a0JBRy9CLFFBQVE7O2FBQWtCLElBQUk7Ozs7O0FBRXBCLGFBZEMsUUFBUSxDQWNQLEtBQUssRUFBRzs7O1VBYnJCLE9BQU8sR0FBRyxVQUFVO1VBQ3BCLFFBQVEsR0FBRyxFQUFFO1VBQ2IsTUFBTSxHQUFHLEtBQUs7Ozs7Ozs7O0FBWWIsU0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDbkI7OzBCQWhCVyxRQUFROztZQWtCWixvQkFBRztBQUNWLFVBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztNQUNaOzs7WUFFRyxnQkFBRzs7O0FBQ04sVUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUUsVUFBQSxDQUFDLEVBQUk7QUFDbkMsV0FBSSxDQUFDLEVBQUc7QUFDUCxjQUFLLGVBQWUsQ0FBRSxDQUFDLENBQUUsQ0FBQztRQUMxQixNQUFNO0FBQ04sZUFBTyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBQzFDLGNBQUssS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBRSxVQUFBLENBQUMsRUFBSTtBQUN0QyxlQUFLLGVBQWUsQ0FBRSxDQUFDLENBQUUsQ0FBQztTQUMxQixDQUFDLENBQUM7UUFDSDtPQUNELENBQUMsQ0FBQzs7QUFFRCxVQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBRSxVQUFBLFFBQVEsRUFBSTtBQUMxQyxlQUFRLENBQUMsT0FBTyxDQUFFLFVBQUEsQ0FBQyxFQUFJO0FBQ3RCLGNBQUssUUFBUSxDQUFDLElBQUksQ0FBRSxDQUFDLENBQUMsR0FBRyxDQUFFLENBQUM7UUFDNUIsQ0FBQyxDQUFDO09BQ0gsQ0FBQyxDQUFDO01BQ0w7OztZQUVnQiwyQkFBRSxPQUFPLEVBQUc7QUFDNUIsVUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO01BQ25DOzs7WUFFZ0IsNkJBQUc7QUFDbkIsVUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO01BQ3RCOzs7WUFFcUIsa0NBQUc7QUFDeEIsVUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO01BQ3RCOzs7WUFFb0IsaUNBQUc7QUFDdkIsVUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO01BQ3RCOzs7WUFFYSwwQkFBRztBQUNoQixVQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRyxPQUFPO0FBQzFCLFVBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBRSxDQUFDLElBQUksQ0FBRSxVQUFBLE1BQU0sRUFBSSxFQUVqRSxDQUFDLENBQUM7TUFDSDs7O1lBRVkseUJBQUc7QUFDZixhQUFPO0FBQ04saUJBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtBQUMzQixzQkFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO0FBQ3JDLHFCQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7T0FDbkMsQ0FBQztNQUNGOzs7WUFFYyx5QkFBRSxNQUFNLEVBQUc7OztBQUN6QixVQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7QUFDcEMsVUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDO0FBQzlDLFVBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQzs7QUFNNUMsZ0JBQVUsQ0FBRSxZQUFNO0FBQ2pCLGNBQUssTUFBTSxHQUFHLElBQUksQ0FBQztPQUNuQixDQUFDLENBQUM7TUFDSDs7O1lBRVEscUJBQUc7QUFDWCxVQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBRSxVQUFBLElBQUksRUFBSTtBQUMvQixhQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7T0FDM0IsQ0FBQyxDQUFDO01BQ0g7OztvQkExRlcsUUFBUTtBQUFSLFlBQVEsR0FEcEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUNELFFBQVEsS0FBUixRQUFRO1dBQVIsUUFBUSIsImZpbGUiOiJwYWdlcy9zZXR0aW5ncy9zZXR0aW5ncy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UG91Y2h9IGZyb20gJ3NlcnZpY2VzL3BvdWNoL3BvdWNoLmpzJztcbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge2JpbmRhYmxlfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5cbkBpbmplY3QoUG91Y2gpXG5leHBvcnQgY2xhc3MgU2V0dGluZ3Mge1xuXHRoZWFkaW5nID0gJ1NldHRpbmdzJztcblx0cHJvamVjdHMgPSBbXTtcblx0bGF0ZXN0ID0gZmFsc2U7XG5cblx0LyogQXV0b21hdGljYWxseSBzdGFydCB0aW1lciB3aGVuIGNyZWF0aW5nIGEgbmV3IHRhc2sgKi9cblx0QGJpbmRhYmxlIGF1dG9fc3RhcnQgPSBmYWxzZTtcblx0XG5cdC8qIERlZmF1bHQgcHJvamVjdCB0byBiZSBhc3NvY2lhdGVkIHdpdGggYSBuZXcgdGFzayAqL1xuXHRAYmluZGFibGUgZGVmYXVsdF9wcm9qZWN0ID0gbnVsbDtcblxuXHQvKiBSZW1vdmUgcmVsYXRlZCB0YXNrcyB3aGVuIHJlbW92aW5nIGEgcHJvamVjdCAqL1xuXHRAYmluZGFibGUgcmVtb3ZlX3JlbGF0ZWQgPSB0cnVlO1xuXG5cdGNvbnN0cnVjdG9yKCBwb3VjaCApIHtcblx0XHR0aGlzLnBvdWNoID0gcG91Y2g7XG5cdH1cblxuXHRhY3RpdmF0ZSgpIHtcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0dGhpcy5wb3VjaC5nZXRTZXR0aW5ncygpLnRoZW4oIHMgPT4ge1xuXHRcdFx0aWYoIHMgKSB7XG5cdFx0XHRcdHRoaXMubWFwU2V0dGluZ3NGcm9tKCBzICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oJ0NyZWF0aW5nIGRlZmF1bHQgc2V0dGluZ3MnKTtcblx0XHRcdFx0dGhpcy5wb3VjaC5jcmVhdGVTZXR0aW5ncygpLnRoZW4oIHMgPT4ge1xuXHRcdFx0XHRcdHRoaXMubWFwU2V0dGluZ3NGcm9tKCBzICk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdCAgXHR0aGlzLnBvdWNoLmdldFByb2plY3RzKCkudGhlbiggcHJvamVjdHMgPT4ge1xuXHQgIFx0XHRwcm9qZWN0cy5mb3JFYWNoKCBwID0+IHtcblx0ICBcdFx0XHR0aGlzLnByb2plY3RzLnB1c2goIHAuZG9jICk7XG5cdCAgXHRcdH0pO1xuXHQgIFx0fSk7XG5cdH1cblxuXHRzZXREZWZhdWx0UHJvamVjdCggcHJvamVjdCApIHtcblx0XHR0aGlzLmRlZmF1bHRfcHJvamVjdCA9IHByb2plY3QuX2lkO1xuXHR9XG5cblx0YXV0b19zdGFydENoYW5nZWQoKSB7XG5cdFx0dGhpcy51cGRhdGVTZXR0aW5ncygpO1xuXHR9XG5cblx0ZGVmYXVsdF9wcm9qZWN0Q2hhbmdlZCgpIHtcblx0XHR0aGlzLnVwZGF0ZVNldHRpbmdzKCk7XG5cdH1cblxuXHRyZW1vdmVfcmVsYXRlZENoYW5nZWQoKSB7XG5cdFx0dGhpcy51cGRhdGVTZXR0aW5ncygpO1xuXHR9XG5cblx0dXBkYXRlU2V0dGluZ3MoKSB7XG5cdFx0aWYoICF0aGlzLmxhdGVzdCApIHJldHVybjtcblx0XHR0aGlzLnBvdWNoLnVwZGF0ZVNldHRpbmdzKCB0aGlzLm1hcFNldHRpbmdzVG8oKSApLnRoZW4oIHJlc3VsdCA9PiB7XG5cdFx0XHQvKiAqL1xuXHRcdH0pO1xuXHR9XG5cblx0bWFwU2V0dGluZ3NUbygpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0YXV0b19zdGFydDogdGhpcy5hdXRvX3N0YXJ0LFxuXHRcdFx0ZGVmYXVsdF9wcm9qZWN0OiB0aGlzLmRlZmF1bHRfcHJvamVjdCxcblx0XHRcdHJlbW92ZV9yZWxhdGVkOiB0aGlzLnJlbW92ZV9yZWxhdGVkXG5cdFx0fTtcblx0fVxuXG5cdG1hcFNldHRpbmdzRnJvbSggcmVtb3RlICkge1xuXHRcdHRoaXMuYXV0b19zdGFydCA9IHJlbW90ZS5hdXRvX3N0YXJ0O1xuXHRcdHRoaXMuZGVmYXVsdF9wcm9qZWN0ID0gcmVtb3RlLmRlZmF1bHRfcHJvamVjdDtcblx0XHR0aGlzLnJlbW92ZV9yZWxhdGVkID0gcmVtb3RlLnJlbW92ZV9yZWxhdGVkO1xuXG5cdFx0LyogXG5cdFx0XHRoYWNraXNoXG5cdFx0XHRkb24ndCBhdHRlbXBsdGUgdG8gdXBkYXRlIHNldHRpbmdzIHVudGlsIHdlIGhhdmUgdGhlIGxhdGVzdCByZXYgZnJvbSBwb3VjaFxuXHRcdCovXG5cdFx0c2V0VGltZW91dCggKCkgPT4ge1xuXHRcdFx0dGhpcy5sYXRlc3QgPSB0cnVlO1xuXHRcdH0pO1xuXHR9XG5cblx0ZGVsZXRlQWxsKCkge1xuXHRcdHRoaXMucG91Y2gubnVrZSgpLnRoZW4oIGRvbmUgPT4ge1xuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLyc7XG5cdFx0fSk7XG5cdH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
