System.register(['node-uuid', 'pleasejs'], function (_export) {
	'use strict';

	var UUID, Please, Pouch;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_nodeUuid) {
			UUID = _nodeUuid;
		}, function (_pleasejs) {
			Please = _pleasejs;
		}],
		execute: function () {
			Pouch = (function () {
				function Pouch() {
					_classCallCheck(this, Pouch);

					this.db = null;
					this.init();
				}

				_createClass(Pouch, [{
					key: 'init',
					value: function init() {

						this.db = new PouchDB('timestack');
						this.db.info().then(function (info) {
							console.log('We have a database: ' + JSON.stringify(info));
						});
					}
				}, {
					key: 'getUUID',
					value: function getUUID() {
						return UUID.v4();
					}
				}, {
					key: 'createProject',
					value: function createProject(name) {
						var _this = this;

						return this.db.get('project-' + name)['catch'](function (err) {
							if (err.status === 404) {
								return {
									_id: 'project-' + name,
									name: name,
									type: 'project',
									color: Please.make_color()[0]
								};
							} else {
								throw err;
							}
						}).then(function (projectDoc) {
							return _this.db.put(projectDoc).then(function (result) {
								return projectDoc;
							});
						})['catch'](function (err) {
							console.error(err);
							return null;
						});
					}
				}, {
					key: 'updateProject',
					value: function updateProject(project) {
						var _this2 = this;

						return this.db.get(project._id).then(function (projectDoc) {
							project._rev = projectDoc._rev;
							return _this2.db.put(project).then(function (result) {
								return project;
							});
						})['catch'](function (err) {
							console.error(err);
							return null;
						});
					}
				}, {
					key: 'removeProject',
					value: function removeProject(project) {
						var _this3 = this;

						return this.db.get(project._id).then(function (doc) {
							return _this3.db.remove(doc);
						});
					}
				}, {
					key: 'getProjects',
					value: function getProjects() {
						return this.db.allDocs({ include_docs: true }).then(function (result) {
							return result.rows.filter(function (row) {
								if (!row.doc.type) {
									return false;
								} else {
									return row.doc.type === 'project';
								}
							});
						});
					}
				}, {
					key: 'getProject',
					value: function getProject(id) {
						return this.db.get(id).then(function (result) {
							return result;
						})['catch'](function (error) {
							console.error(error);
						});
					}
				}, {
					key: 'getTasks',
					value: function getTasks(include_completed) {
						return this.db.allDocs({ include_docs: true }).then(function (result) {
							return result.rows.filter(function (row) {
								if (!row.doc.type) {
									return false;
								} else {
									var isTask = row.doc.type === 'task';
									var completed = row.doc.completed;

									if (include_completed) {
										return isTask;
									} else {
										return isTask && !completed;
									}
								}
							});
						});
					}
				}, {
					key: 'removeTask',
					value: function removeTask(task) {
						var _this4 = this;

						return this.db.get(task._id).then(function (doc) {
							return _this4.db.remove(doc);
						});
					}
				}, {
					key: 'updateTask',
					value: function updateTask(task) {
						var _this5 = this;

						return this.db.get(task._id).then(function (taskDoc) {
							task._rev = taskDoc._rev;
							return _this5.db.put(task).then(function (result) {
								return task;
							});
						})['catch'](function (err) {
							console.error(err);
							return null;
						});
					}
				}, {
					key: 'createTask',
					value: function createTask(name, desc, project_id, start_time) {
						var _this6 = this;

						if (!name) {
							throw new Error('New tasks require a name');
						}

						return this.db.get('task-' + name)['catch'](function (err) {
							if (err.status === 404) {
								return {
									_id: UUID.v4(),
									name: name,
									type: 'task',
									desc: desc,
									status: 'paused',
									created_at: Date.now(),
									project_id: project_id,
									completed: false,
									intervals: []
								};
							} else {
								throw err;
							}
						}).then(function (taskDoc) {
							return _this6.db.put(taskDoc).then(function (result) {
								return taskDoc;
							});
						})['catch'](function (err) {
							console.error(err);
							return null;
						});
					}
				}, {
					key: 'getTask',
					value: function getTask(id) {
						return this.db.get(id).then(function (result) {
							return result;
						})['catch'](function (error) {
							console.error(error);
						});
					}
				}, {
					key: 'getSettings',
					value: function getSettings() {
						return this.db.get('settings').then(function (result) {
							return result;
						})['catch'](function (error) {
							console.warn('Settings do not exist yet');
						});
					}
				}, {
					key: 'updateSettings',
					value: function updateSettings(settings) {
						var _this7 = this;

						return this.db.get('settings').then(function (settingsDoc) {
							settings._rev = settingsDoc._rev;
							settings._id = 'settings';
							return _this7.db.put(settings).then(function (result) {
								return settings;
							});
						})['catch'](function (err) {
							console.error(err);
							return null;
						});
					}
				}, {
					key: 'createSettings',
					value: function createSettings() {
						var _this8 = this;

						return this.db.get('settings')['catch'](function (err) {
							if (err.status === 404) {
								return {
									_id: 'settings',
									auto_start: false,
									default_project: null,
									remove_related: true
								};
							} else {
								throw err;
							}
						}).then(function (set) {
							return _this8.db.put(set).then(function (result) {
								return set;
							});
						})['catch'](function (err) {
							console.error(err);
							return null;
						});
					}
				}]);

				return Pouch;
			})();

			_export('Pouch', Pouch);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3BvdWNoL3BvdWNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OzttQkFTYSxLQUFLOzs7Ozs7Ozs7Ozs7O0FBQUwsUUFBSztBQUNOLGFBREMsS0FBSyxHQUNIOzJCQURGLEtBQUs7O0FBRWhCLFNBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQ2YsU0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ1o7O2lCQUpXLEtBQUs7O1lBTWIsZ0JBQUc7O0FBSU4sVUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNuQyxVQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBRSxVQUFBLElBQUksRUFBSTtBQUMxQixjQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztPQUM3RCxDQUFDLENBQUM7TUFDSDs7O1lBRU0sbUJBQUc7QUFDVCxhQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztNQUNqQjs7O1lBUVksdUJBQUUsSUFBSSxFQUFHOzs7QUFDckIsYUFBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQU0sQ0FBRSxVQUFBLEdBQUcsRUFBSTtBQUNqRCxXQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO0FBQ3RCLGVBQU87QUFDSixZQUFHLEVBQUUsVUFBVSxHQUFHLElBQUk7QUFDdEIsYUFBSSxFQUFFLElBQUk7QUFDVixhQUFJLEVBQUUsU0FBUztBQUNmLGNBQUssRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQy9CLENBQUM7UUFDSCxNQUFNO0FBQ0wsY0FBTSxHQUFHLENBQUM7UUFDWDtPQUNILENBQUMsQ0FBQyxJQUFJLENBQUUsVUFBQSxVQUFVLEVBQUk7QUFDcEIsY0FBTyxNQUFLLEVB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O1FBQ1gsQ0FBQyxDQUFDO09BQ0wsQ0FBQyxTQUFNLENBQUUsVUFBQSxHQUFHLEVBQUk7QUFDaEIsY0FBTyxDQUFDLEtBQUssQ0FBRSxHQUFHLENBQUUsQ0FBQztBQUNuQixjQUFPLElBQUksQ0FBQztPQUNkLENBQUMsQ0FBQztNQUNIOzs7V0F4TlcsS0FBSyIsImZpbGUiOiJzZXJ2aWNlcy9wb3VjaC9wb3VjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFVVSUQgZnJvbSAnbm9kZS11dWlkJztcbmltcG9ydCAqIGFzIFBsZWFzZSBmcm9tICdwbGVhc2Vqcyc7XG5cbi8qXG5cdFRPRE86IFxuXHQtIHNwbGl0IG91dCBpbnRvIGRpc2NyZXRlIHNlcnZpY2VzXG5cdC0gcHJvcGVybHkgcXVlcnkgdHlwZXNcbiovXG5cbmV4cG9ydCBjbGFzcyBQb3VjaCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuZGIgPSBudWxsO1xuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblx0aW5pdCgpIHtcblx0XHQvL1BvdWNoREIuZGVidWcuZW5hYmxlKCcqJyk7XG5cdFx0Ly9Qb3VjaERCLmRlYnVnLmRpc2FibGUoKTtcblxuXHRcdHRoaXMuZGIgPSBuZXcgUG91Y2hEQigndGltZXN0YWNrJyk7XG5cdFx0dGhpcy5kYi5pbmZvKCkudGhlbiggaW5mbyA9PiB7XG4gIFx0XHRcdGNvbnNvbGUubG9nKCdXZSBoYXZlIGEgZGF0YWJhc2U6ICcgKyBKU09OLnN0cmluZ2lmeShpbmZvKSk7XG5cdFx0fSk7XG5cdH1cblxuXHRnZXRVVUlEKCkge1xuXHRcdHJldHVybiBVVUlELnY0KCk7XG5cdH1cblxuXG5cdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cblx0XHRcdFx0XHRcdFBST0pFQ1RTXG5cblx0KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGNyZWF0ZVByb2plY3QoIG5hbWUgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZGIuZ2V0KCdwcm9qZWN0LScgKyBuYW1lKS5jYXRjaCggZXJyID0+IHtcblx0XHQgIFx0aWYgKGVyci5zdGF0dXMgPT09IDQwNCkge1xuXHRcdCAgICBcdHJldHVybiB7XHRcblx0XHQgICAgICBcdFx0X2lkOiAncHJvamVjdC0nICsgbmFtZSxcblx0XHQgICAgICBcdFx0bmFtZTogbmFtZSxcblx0XHQgICAgICBcdFx0dHlwZTogJ3Byb2plY3QnLFxuXHRcdCAgICAgIFx0XHRjb2xvcjogUGxlYXNlLm1ha2VfY29sb3IoKVswXVxuXHRcdCAgICBcdH07XG5cdFx0ICBcdH0gZWxzZSB7XG5cdFx0ICAgIFx0dGhyb3cgZXJyO1xuXHRcdCAgXHR9XG5cdFx0fSkudGhlbiggcHJvamVjdERvYyA9PiB7XG5cdFx0ICBcdHJldHVybiB0aGlzLmRiLnB1dCggcHJvamVjdERvYyApLnRoZW4oIHJlc3VsdCA9PiB7XG5cdFx0ICBcdFx0cmV0dXJuIHByb2plY3REb2M7XG5cdFx0ICBcdH0pO1xuXHRcdH0pLmNhdGNoKCBlcnIgPT4ge1xuXHRcdFx0Y29uc29sZS5lcnJvciggZXJyICk7XG5cdFx0ICBcdHJldHVybiBudWxsO1xuXHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlUHJvamVjdCggcHJvamVjdCApIHtcblx0XHRyZXR1cm4gdGhpcy5kYi5nZXQocHJvamVjdC5faWQpLnRoZW4oIHByb2plY3REb2MgPT4ge1xuXHRcdFx0cHJvamVjdC5fcmV2ID0gcHJvamVjdERvYy5fcmV2O1xuXHRcdCAgXHRyZXR1cm4gdGhpcy5kYi5wdXQoIHByb2plY3QgKS50aGVuKCByZXN1bHQgPT4ge1xuXHRcdCAgXHRcdHJldHVybiBwcm9qZWN0O1xuXHRcdCAgXHR9KTtcblx0XHR9KS5jYXRjaCggZXJyID0+IHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoIGVyciApO1xuXHRcdCAgXHRyZXR1cm4gbnVsbDtcblx0XHR9KTtcblx0fVxuXG5cdHJlbW92ZVByb2plY3QoIHByb2plY3QgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZGIuZ2V0KHByb2plY3QuX2lkKS50aGVuKCBkb2MgPT4ge1xuICBcdFx0XHRyZXR1cm4gdGhpcy5kYi5yZW1vdmUoZG9jKTtcblx0XHR9KTtcblx0fVxuXG5cdGdldFByb2plY3RzKCkge1xuXHRcdHJldHVybiB0aGlzLmRiLmFsbERvY3Moe2luY2x1ZGVfZG9jczogdHJ1ZX0pLnRoZW4oIHJlc3VsdCA9PiB7XG5cdFx0XHRyZXR1cm4gcmVzdWx0LnJvd3MuZmlsdGVyKCByb3cgPT4ge1xuXHRcdFx0XHRpZiggIXJvdy5kb2MudHlwZSApIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJvdy5kb2MudHlwZSA9PT0gJ3Byb2plY3QnO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGdldFByb2plY3QoIGlkICkge1xuXHRcdHJldHVybiB0aGlzLmRiLmdldChpZCkudGhlbiggcmVzdWx0ID0+IHtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSkuY2F0Y2goIGVycm9yID0+IHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoIGVycm9yICk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5cdFx0XHRcdFx0XHRUQVNLU1xuXG5cdCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRnZXRUYXNrcyggaW5jbHVkZV9jb21wbGV0ZWQgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZGIuYWxsRG9jcyh7aW5jbHVkZV9kb2NzOiB0cnVlfSkudGhlbiggcmVzdWx0ID0+IHtcblx0XHRcdHJldHVybiByZXN1bHQucm93cy5maWx0ZXIoIHJvdyA9PiB7XG5cdFx0XHRcdGlmKCAhcm93LmRvYy50eXBlICkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRsZXQgaXNUYXNrID0gcm93LmRvYy50eXBlID09PSAndGFzayc7XG5cdFx0XHRcdFx0bGV0IGNvbXBsZXRlZCA9IHJvdy5kb2MuY29tcGxldGVkO1xuXG5cdFx0XHRcdFx0aWYoIGluY2x1ZGVfY29tcGxldGVkICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGlzVGFzaztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGlzVGFzayAmJiAhY29tcGxldGVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRyZW1vdmVUYXNrKCB0YXNrICkge1xuXHRcdHJldHVybiB0aGlzLmRiLmdldCh0YXNrLl9pZCkudGhlbiggZG9jID0+IHtcbiAgXHRcdFx0cmV0dXJuIHRoaXMuZGIucmVtb3ZlKGRvYyk7XG5cdFx0fSk7XG5cdH1cblxuXHR1cGRhdGVUYXNrKCB0YXNrICkge1xuXHRcdHJldHVybiB0aGlzLmRiLmdldCh0YXNrLl9pZCkudGhlbiggdGFza0RvYyA9PiB7XG5cdFx0XHR0YXNrLl9yZXYgPSB0YXNrRG9jLl9yZXY7XG5cdFx0ICBcdHJldHVybiB0aGlzLmRiLnB1dCggdGFzayApLnRoZW4oIHJlc3VsdCA9PiB7XG5cdFx0ICBcdFx0cmV0dXJuIHRhc2s7XG5cdFx0ICBcdH0pO1xuXHRcdH0pLmNhdGNoKCBlcnIgPT4ge1xuXHRcdFx0Y29uc29sZS5lcnJvciggZXJyICk7XG5cdFx0ICBcdHJldHVybiBudWxsO1xuXHRcdH0pO1xuXHR9XG5cblx0Y3JlYXRlVGFzayggbmFtZSwgZGVzYywgcHJvamVjdF9pZCwgc3RhcnRfdGltZSApIHtcblx0XHRpZiggIW5hbWUgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ05ldyB0YXNrcyByZXF1aXJlIGEgbmFtZScpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmRiLmdldCgndGFzay0nICsgbmFtZSkuY2F0Y2goIGVyciA9PiB7XG5cdFx0ICBcdGlmIChlcnIuc3RhdHVzID09PSA0MDQpIHtcblx0XHQgICAgXHRyZXR1cm4ge1x0XG5cdFx0ICAgICAgXHRcdF9pZDogVVVJRC52NCgpLFxuXHRcdCAgICAgIFx0XHRuYW1lOiBuYW1lLFxuXHRcdCAgICAgIFx0XHR0eXBlOiAndGFzaycsXG5cdFx0ICAgICAgXHRcdGRlc2M6IGRlc2MsXG5cdFx0ICAgICAgXHRcdHN0YXR1czogJ3BhdXNlZCcsXG5cdFx0ICAgICAgXHRcdGNyZWF0ZWRfYXQ6IERhdGUubm93KCksXG5cdFx0ICAgICAgXHRcdHByb2plY3RfaWQ6IHByb2plY3RfaWQsXG5cdFx0ICAgICAgXHRcdGNvbXBsZXRlZDogZmFsc2UsXG5cdFx0ICAgICAgXHRcdGludGVydmFsczogW11cblx0XHQgICAgXHR9O1xuXHRcdCAgXHR9IGVsc2Uge1xuXHRcdCAgICBcdHRocm93IGVycjtcblx0XHQgIFx0fVxuXHRcdH0pLnRoZW4oIHRhc2tEb2MgPT4ge1xuXHRcdCAgXHRyZXR1cm4gdGhpcy5kYi5wdXQoIHRhc2tEb2MgKS50aGVuKCByZXN1bHQgPT4ge1xuXHRcdCAgXHRcdHJldHVybiB0YXNrRG9jO1xuXHRcdCAgXHR9KTtcblx0XHR9KS5jYXRjaCggZXJyID0+IHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoIGVyciApO1xuXHRcdCAgXHRyZXR1cm4gbnVsbDtcblx0XHR9KTtcblx0fVxuXG5cdGdldFRhc2soIGlkICkge1xuXHRcdHJldHVybiB0aGlzLmRiLmdldChpZCkudGhlbiggcmVzdWx0ID0+IHtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSkuY2F0Y2goIGVycm9yID0+IHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoIGVycm9yICk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5cdFx0XHRcdFx0XHRTRVRUSU5HU1xuXG5cdCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdGdldFNldHRpbmdzKCkge1xuXHRcdHJldHVybiB0aGlzLmRiLmdldCgnc2V0dGluZ3MnKS50aGVuKCByZXN1bHQgPT4ge1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9KS5jYXRjaCggZXJyb3IgPT4ge1xuXHRcdFx0Y29uc29sZS53YXJuKCdTZXR0aW5ncyBkbyBub3QgZXhpc3QgeWV0Jyk7XG5cblx0XHR9KTtcblx0fVxuXG5cdHVwZGF0ZVNldHRpbmdzKCBzZXR0aW5ncyApIHtcblx0XHRyZXR1cm4gdGhpcy5kYi5nZXQoJ3NldHRpbmdzJykudGhlbiggc2V0dGluZ3NEb2MgPT4ge1xuXHRcdFx0c2V0dGluZ3MuX3JldiA9IHNldHRpbmdzRG9jLl9yZXY7XG5cdFx0XHRzZXR0aW5ncy5faWQgPSAnc2V0dGluZ3MnO1xuXHRcdCAgXHRyZXR1cm4gdGhpcy5kYi5wdXQoIHNldHRpbmdzICkudGhlbiggcmVzdWx0ID0+IHtcblx0XHQgIFx0XHRyZXR1cm4gc2V0dGluZ3M7XG5cdFx0ICBcdH0pO1xuXHRcdH0pLmNhdGNoKCBlcnIgPT4ge1xuXHRcdFx0Y29uc29sZS5lcnJvciggZXJyICk7XG5cdFx0ICBcdHJldHVybiBudWxsO1xuXHRcdH0pO1xuXHR9XG5cblx0Y3JlYXRlU2V0dGluZ3MoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZGIuZ2V0KCdzZXR0aW5ncycpLmNhdGNoKCBlcnIgPT4ge1xuXHRcdCAgXHQvLyBkZWZhdWx0IHNldHRpbmdzXG5cdFx0ICBcdGlmIChlcnIuc3RhdHVzID09PSA0MDQpIHtcblx0XHQgICAgXHRyZXR1cm4ge1x0XG5cdFx0ICAgICAgXHRcdF9pZDogJ3NldHRpbmdzJyxcblx0XHQgICAgICBcdFx0YXV0b19zdGFydDogZmFsc2UsXG5cdFx0ICAgICAgXHRcdGRlZmF1bHRfcHJvamVjdDogbnVsbCxcblx0XHQgICAgICBcdFx0cmVtb3ZlX3JlbGF0ZWQ6IHRydWVcblx0XHQgICAgXHR9O1xuXHRcdCAgXHR9IGVsc2Uge1xuXHRcdCAgICBcdHRocm93IGVycjtcblx0XHQgIFx0fVxuXHRcdH0pLnRoZW4oIHNldCA9PiB7XG5cdFx0ICBcdHJldHVybiB0aGlzLmRiLnB1dCggc2V0ICkudGhlbiggcmVzdWx0ID0+IHtcblx0XHQgIFx0XHRyZXR1cm4gc2V0O1xuXHRcdCAgXHR9KTtcblx0XHR9KS5jYXRjaCggZXJyID0+IHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoIGVyciApO1xuXHRcdCAgXHRyZXR1cm4gbnVsbDtcblx0XHR9KTtcblx0fVxuXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
