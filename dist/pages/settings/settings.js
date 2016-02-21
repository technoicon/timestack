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
				}], null, _instanceInitializers);

				var _Settings = Settings;
				Settings = inject(Pouch)(Settings) || Settings;
				return Settings;
			})();

			_export('Settings', Settings);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL3NldHRpbmdzL3NldHRpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs4QkFLYSxRQUFROzs7Ozs7Ozs7O2lDQUxiLEtBQUs7OzhCQUNMLE1BQU07Z0NBQ04sUUFBUTs7O0FBR0gsV0FBUTs7OzswQkFBUixRQUFROztrQkFNbkIsUUFBUTs7YUFBYyxLQUFLOzs7OztrQkFHM0IsUUFBUTs7YUFBbUIsSUFBSTs7Ozs7a0JBRy9CLFFBQVE7O2FBQWtCLElBQUk7Ozs7O0FBRXBCLGFBZEMsUUFBUSxDQWNQLEtBQUssRUFBRzs7O1VBYnJCLE9BQU8sR0FBRyxVQUFVO1VBQ3BCLFFBQVEsR0FBRyxFQUFFO1VBQ2IsTUFBTSxHQUFHLEtBQUs7Ozs7Ozs7O0FBWWIsU0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDbkI7OzBCQWhCVyxRQUFROztZQWtCWixvQkFBRztBQUNWLFVBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztNQUNaOzs7WUFFRyxnQkFBRzs7O0FBQ04sVUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUUsVUFBQSxDQUFDLEVBQUk7QUFDbkMsV0FBSSxDQUFDLEVBQUc7QUFDUCxjQUFLLGVBQWUsQ0FBRSxDQUFDLENBQUUsQ0FBQztRQUMxQixNQUFNO0FBQ04sZUFBTyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBQzFDLGNBQUssS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBRSxVQUFBLENBQUMsRUFBSTtBQUN0QyxlQUFLLGVBQWUsQ0FBRSxDQUFDLENBQUUsQ0FBQztTQUMxQixDQUFDLENBQUM7UUFDSDtPQUNELENBQUMsQ0FBQzs7QUFFRCxVQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBRSxVQUFBLFFBQVEsRUFBSTtBQUMxQyxlQUFRLENBQUMsT0FBTyxDQUFFLFVBQUEsQ0FBQyxFQUFJO0FBQ3RCLGNBQUssUUFBUSxDQUFDLElBQUksQ0FBRSxDQUFDLENBQUMsR0FBRyxDQUFFLENBQUM7UUFDNUIsQ0FBQyxDQUFDO09BQ0gsQ0FBQyxDQUFDO01BQ0w7OztZQUVnQiwyQkFBRSxPQUFPLEVBQUc7QUFDNUIsVUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO01BQ25DOzs7WUFFZ0IsNkJBQUc7QUFDbkIsVUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO01BQ3RCOzs7WUFFcUIsa0NBQUc7QUFDeEIsVUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO01BQ3RCOzs7WUFFb0IsaUNBQUc7QUFDdkIsVUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO01BQ3RCOzs7WUFFYSwwQkFBRztBQUNoQixVQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRyxPQUFPO0FBQzFCLFVBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBRSxDQUFDLElBQUksQ0FBRSxVQUFBLE1BQU0sRUFBSSxFQUVqRSxDQUFDLENBQUM7TUFDSDs7O1lBRVkseUJBQUc7QUFDZixhQUFPO0FBQ04saUJBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtBQUMzQixzQkFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO0FBQ3JDLHFCQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7T0FDbkMsQ0FBQztNQUNGOzs7WUFFYyx5QkFBRSxNQUFNLEVBQUc7OztBQUN6QixVQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7QUFDcEMsVUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDO0FBQzlDLFVBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQzs7QUFNNUMsZ0JBQVUsQ0FBRSxZQUFNO0FBQ2pCLGNBQUssTUFBTSxHQUFHLElBQUksQ0FBQztPQUNuQixDQUFDLENBQUM7TUFDSDs7O29CQXBGVyxRQUFRO0FBQVIsWUFBUSxHQURwQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQ0QsUUFBUSxLQUFSLFFBQVE7V0FBUixRQUFRIiwiZmlsZSI6InBhZ2VzL3NldHRpbmdzL3NldHRpbmdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQb3VjaH0gZnJvbSAnc2VydmljZXMvcG91Y2gvcG91Y2guanMnO1xuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7YmluZGFibGV9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcblxuQGluamVjdChQb3VjaClcbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyB7XG5cdGhlYWRpbmcgPSAnU2V0dGluZ3MnO1xuXHRwcm9qZWN0cyA9IFtdO1xuXHRsYXRlc3QgPSBmYWxzZTtcblxuXHQvKiBBdXRvbWF0aWNhbGx5IHN0YXJ0IHRpbWVyIHdoZW4gY3JlYXRpbmcgYSBuZXcgdGFzayAqL1xuXHRAYmluZGFibGUgYXV0b19zdGFydCA9IGZhbHNlO1xuXHRcblx0LyogRGVmYXVsdCBwcm9qZWN0IHRvIGJlIGFzc29jaWF0ZWQgd2l0aCBhIG5ldyB0YXNrICovXG5cdEBiaW5kYWJsZSBkZWZhdWx0X3Byb2plY3QgPSBudWxsO1xuXG5cdC8qIFJlbW92ZSByZWxhdGVkIHRhc2tzIHdoZW4gcmVtb3ZpbmcgYSBwcm9qZWN0ICovXG5cdEBiaW5kYWJsZSByZW1vdmVfcmVsYXRlZCA9IHRydWU7XG5cblx0Y29uc3RydWN0b3IoIHBvdWNoICkge1xuXHRcdHRoaXMucG91Y2ggPSBwb3VjaDtcblx0fVxuXG5cdGFjdGl2YXRlKCkge1xuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblx0aW5pdCgpIHtcblx0XHR0aGlzLnBvdWNoLmdldFNldHRpbmdzKCkudGhlbiggcyA9PiB7XG5cdFx0XHRpZiggcyApIHtcblx0XHRcdFx0dGhpcy5tYXBTZXR0aW5nc0Zyb20oIHMgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybignQ3JlYXRpbmcgZGVmYXVsdCBzZXR0aW5ncycpO1xuXHRcdFx0XHR0aGlzLnBvdWNoLmNyZWF0ZVNldHRpbmdzKCkudGhlbiggcyA9PiB7XG5cdFx0XHRcdFx0dGhpcy5tYXBTZXR0aW5nc0Zyb20oIHMgKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0ICBcdHRoaXMucG91Y2guZ2V0UHJvamVjdHMoKS50aGVuKCBwcm9qZWN0cyA9PiB7XG5cdCAgXHRcdHByb2plY3RzLmZvckVhY2goIHAgPT4ge1xuXHQgIFx0XHRcdHRoaXMucHJvamVjdHMucHVzaCggcC5kb2MgKTtcblx0ICBcdFx0fSk7XG5cdCAgXHR9KTtcblx0fVxuXG5cdHNldERlZmF1bHRQcm9qZWN0KCBwcm9qZWN0ICkge1xuXHRcdHRoaXMuZGVmYXVsdF9wcm9qZWN0ID0gcHJvamVjdC5faWQ7XG5cdH1cblxuXHRhdXRvX3N0YXJ0Q2hhbmdlZCgpIHtcblx0XHR0aGlzLnVwZGF0ZVNldHRpbmdzKCk7XG5cdH1cblxuXHRkZWZhdWx0X3Byb2plY3RDaGFuZ2VkKCkge1xuXHRcdHRoaXMudXBkYXRlU2V0dGluZ3MoKTtcblx0fVxuXG5cdHJlbW92ZV9yZWxhdGVkQ2hhbmdlZCgpIHtcblx0XHR0aGlzLnVwZGF0ZVNldHRpbmdzKCk7XG5cdH1cblxuXHR1cGRhdGVTZXR0aW5ncygpIHtcblx0XHRpZiggIXRoaXMubGF0ZXN0ICkgcmV0dXJuO1xuXHRcdHRoaXMucG91Y2gudXBkYXRlU2V0dGluZ3MoIHRoaXMubWFwU2V0dGluZ3NUbygpICkudGhlbiggcmVzdWx0ID0+IHtcblx0XHRcdC8qICovXG5cdFx0fSk7XG5cdH1cblxuXHRtYXBTZXR0aW5nc1RvKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRhdXRvX3N0YXJ0OiB0aGlzLmF1dG9fc3RhcnQsXG5cdFx0XHRkZWZhdWx0X3Byb2plY3Q6IHRoaXMuZGVmYXVsdF9wcm9qZWN0LFxuXHRcdFx0cmVtb3ZlX3JlbGF0ZWQ6IHRoaXMucmVtb3ZlX3JlbGF0ZWRcblx0XHR9O1xuXHR9XG5cblx0bWFwU2V0dGluZ3NGcm9tKCByZW1vdGUgKSB7XG5cdFx0dGhpcy5hdXRvX3N0YXJ0ID0gcmVtb3RlLmF1dG9fc3RhcnQ7XG5cdFx0dGhpcy5kZWZhdWx0X3Byb2plY3QgPSByZW1vdGUuZGVmYXVsdF9wcm9qZWN0O1xuXHRcdHRoaXMucmVtb3ZlX3JlbGF0ZWQgPSByZW1vdGUucmVtb3ZlX3JlbGF0ZWQ7XG5cblx0XHQvKiBcblx0XHRcdGhhY2tpc2hcblx0XHRcdGRvbid0IGF0dGVtcGx0ZSB0byB1cGRhdGUgc2V0dGluZ3MgdW50aWwgd2UgaGF2ZSB0aGUgbGF0ZXN0IHJldiBmcm9tIHBvdWNoXG5cdFx0Ki9cblx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XG5cdFx0XHR0aGlzLmxhdGVzdCA9IHRydWU7XG5cdFx0fSk7XG5cdH1cblxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
