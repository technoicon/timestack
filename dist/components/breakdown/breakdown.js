System.register(['aurelia-framework', 'services/pouch/pouch.js', 'pleasejs', 'aurelia-event-aggregator'], function (_export) {
	'use strict';

	var customElement, bindable, inject, Pouch, Please, EventAggregator, Breakdown;

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
		}, function (_pleasejs) {
			Please = _pleasejs;
		}, function (_aureliaEventAggregator) {
			EventAggregator = _aureliaEventAggregator.EventAggregator;
		}],
		execute: function () {
			Breakdown = (function () {
				var _instanceInitializers = {};
				var _instanceInitializers = {};

				_createDecoratedClass(Breakdown, [{
					key: 'type',
					decorators: [bindable],
					initializer: null,
					enumerable: true
				}, {
					key: 'period',
					decorators: [bindable],
					initializer: null,
					enumerable: true
				}, {
					key: 'day',
					decorators: [bindable],
					initializer: null,
					enumerable: true
				}], null, _instanceInitializers);

				function Breakdown(pouch, element, events) {
					var _this = this;

					_classCallCheck(this, _Breakdown);

					_defineDecoratedPropertyDescriptor(this, 'type', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'period', _instanceInitializers);

					_defineDecoratedPropertyDescriptor(this, 'day', _instanceInitializers);

					this.pouch = pouch;
					this.element = element;
					this.events = events;

					this.events.subscribe('time-update-charts', function (payload) {
						_this.updateChart(payload);
					});

					this.init();
				}

				_createDecoratedClass(Breakdown, [{
					key: 'activate',
					value: function activate() {}
				}, {
					key: 'drawChart',
					value: function drawChart() {
						var _this2 = this;

						setTimeout(function () {
							_this2.ctx = _this2.element.children[0].getContext("2d");
							_this2.chart = new Chart(_this2.ctx).Doughnut(_this2.breakdown.items);
						}, 10);
					}
				}, {
					key: 'updateChart',
					value: function updateChart(ms) {
						var _this3 = this;

						if (ms) {
							this.day = ms;
						}

						if (this.chart) {
							this.chart.destroy();
						}
						setTimeout(function () {
							_this3.init();
						}, 10);
					}
				}, {
					key: 'init',
					value: function init() {
						var _this4 = this;

						this.breakdown = null;

						Promise.all([this.pouch.getTasks(true), this.pouch.getProjects()]).then(function (result) {

							var tasks = result[0].map(function (t) {
								return t.doc;
							});
							var projects = result[1].map(function (p) {
								return p.doc;
							});

							if (_this4.type === 'task') {
								_this4.breakdownByTask(tasks, projects);
							} else if (_this4.type === 'project') {
								_this4.breakdownByPeriod(tasks, projects);
							} else {
								throw new Error('Unknown breakdown type');
							}
						});
					}
				}, {
					key: 'filterTasksByDay',
					value: function filterTasksByDay(tasks, ms) {
						var _this5 = this;

						var target = moment(ms);
						return tasks.filter(function (t) {
							if (!t.intervals) {
								return false;
							} else {
								for (var i = 0; i < t.intervals.length; i++) {
									if (t.intervals[i].start && t.intervals[i].stop) {

										return _this5.intervalOnDay(target, t.intervals[i]);
									} else {
										return false;
									}
								}
							}
						});
					}
				}, {
					key: 'intervalOnDay',
					value: function intervalOnDay(target, interval) {
						var start = moment(interval.start);
						var stop = moment(interval.stop);

						var startSame = start.isSame(target, 'day');
						var stopSame = stop.isSame(target, 'day');

						return startSame || stopSame;
					}
				}, {
					key: 'breakdownByTask',
					value: function breakdownByTask(tasks, projects) {
						var _this6 = this;

						this.breakdown = {
							time: 0,
							items: []
						};

						tasks = this.filterTasksByDay(tasks, this.day);
						var totalTime = this.getTotalTime(tasks);

						this.breakdown.time = totalTime;

						tasks.forEach(function (t) {
							var time = _this6.getTotalTimeForTask(t);
							_this6.breakdown.items.push({
								label: t.name,
								value: Math.floor(time / totalTime * 100),
								color: Please.make_color()[0],
								time: time
							});
						});

						this.drawChart();
					}
				}, {
					key: 'getTotalTime',
					value: function getTotalTime(tasks) {
						var _this7 = this;

						var time = 0;
						tasks.forEach(function (t) {
							time += _this7.getTotalTimeForTask(t);
						});
						return time;
					}
				}, {
					key: 'breakdownByPeriod',
					value: function breakdownByPeriod(tasks, projects) {
						var _this8 = this;

						this.breakdown = {
							time: 0,
							items: []
						};

						tasks = this.filterTasksByDay(tasks, this.day);
						var totalTime = this.getTotalTime(tasks);

						this.breakdown.time = totalTime;

						var byProject = {};

						tasks.forEach(function (t) {
							var project = _this8.getProjectById(t.project_id, projects);

							if (project) {
								if (!byProject[project._id]) {
									byProject[project._id] = {
										project: project,
										tasks: []
									};
								}

								byProject[project._id].tasks.push(t);
							}
						});

						var keys = Object.keys(byProject);
						keys.forEach(function (key) {

							var totalForTaskGroup = 0;
							byProject[key].tasks.forEach(function (tsk) {
								totalForTaskGroup += _this8.getTotalTimeForTask(tsk);
							});

							_this8.breakdown.items.push({
								label: byProject[key].project.name,
								value: Math.floor(totalForTaskGroup / totalTime * 100),
								color: byProject[key].project.color,
								time: totalForTaskGroup
							});
						});

						this.drawChart();
					}
				}, {
					key: 'getProjectById',
					value: function getProjectById(id, projects) {
						for (var i = 0; i < projects.length; i++) {
							if (projects[i]._id === id) {
								return projects[i];
							}
						}
						return null;
					}
				}, {
					key: 'getTasksForProject',
					value: function getTasksForProject(tasks, project) {
						return tasks.filter(function (t) {
							t.project_id === project._id;
						});
					}
				}, {
					key: 'getTotalTimeForTask',
					value: function getTotalTimeForTask(task) {
						var time = 0;
						if (task.intervals) {
							task.intervals.forEach(function (i) {
								if (i.start && i.stop) {
									time += Math.floor((i.stop - i.start) / 1000);
								}
							});
						}
						return time;
					}
				}, {
					key: 'getTotalTimeFromProject',
					value: function getTotalTimeFromProject(tasks, project) {
						var _this9 = this;

						var time = 0;
						var filtered = this.getTasksForProject(tasks, project);

						filtered.forEach(function (t) {
							time += _this9.getTotalTimeForTask(t);
						});

						return time;
					}
				}], null, _instanceInitializers);

				var _Breakdown = Breakdown;
				Breakdown = inject(Pouch, Element, EventAggregator)(Breakdown) || Breakdown;
				Breakdown = customElement('breakdown')(Breakdown) || Breakdown;
				return Breakdown;
			})();

			_export('Breakdown', Breakdown);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYnJlYWtkb3duL2JyZWFrZG93bi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7c0VBUWEsU0FBUzs7Ozs7Ozs7OztxQ0FSZCxhQUFhO2dDQUFFLFFBQVE7OEJBRXZCLE1BQU07O2lDQUROLEtBQUs7Ozs7NkNBR0wsZUFBZTs7O0FBSVYsWUFBUzs7OzswQkFBVCxTQUFTOztrQkFDcEIsUUFBUTs7Ozs7a0JBQ1IsUUFBUTs7Ozs7a0JBQ1IsUUFBUTs7Ozs7QUFFRSxhQUxDLFNBQVMsQ0FLVCxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTs7Ozs7Ozs7Ozs7QUFDbkMsU0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsU0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsU0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0FBRXJCLFNBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLG9CQUFvQixFQUFFLFVBQUEsT0FBTyxFQUFJO0FBQzdDLFlBQUssV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO01BQzdCLENBQUMsQ0FBQzs7QUFFVCxTQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDWjs7MEJBZlcsU0FBUzs7WUFpQmIsb0JBQUcsRUFFVjs7O1lBRVEscUJBQUc7OztBQUNYLGdCQUFVLENBQUUsWUFBTTtBQUNqQixjQUFLLEdBQUcsR0FBRyxPQUFLLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JELGNBQUssS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLE9BQUssR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQUssU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQ2hFLEVBQUUsRUFBRSxDQUFFLENBQUM7TUFDUjs7O1lBRVUscUJBQUMsRUFBRSxFQUFFOzs7QUFDZixVQUFJLEVBQUUsRUFBRztBQUNSLFdBQUksQ0FBQyxH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QUksSUFBSSxDQUFDLENBQUM7U0FDOUM7UUFDRCxDQUFDLENBQUM7T0FDSDtBQUNELGFBQU8sSUFBSSxDQUFDO01BQ1o7OztZQUVzQixpQ0FBRSxLQUFLLEVBQUUsT0FBTyxFQUFHOzs7QUFDekMsVUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ2IsVUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFFLEtBQUssRUFBRSxPQUFPLENBQUUsQ0FBQzs7QUFFekQsY0FBUSxDQUFDLE9BQU8sQ0FBRSxVQUFBLENBQUMsRUFBSTtBQUN0QixXQUFJLElBQUksT0FBSyxtQkFBbUIsQ0FBRSxDQUFDLENBQUUsQ0FBQztPQUN0QyxDQUFDLENBQUM7O0FBRUgsYUFBTyxJQUFJLENBQUM7TUFDWjs7O3FCQWpOVyxTQUFTO0FBQVQsYUFBUyxHQURyQixNQUFNLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FDM0IsU0FBUyxLQUFULFNBQVM7QUFBVCxhQUFTLEdBRnJCLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FFZCxTQUFTLEtBQVQsU0FBUztXQUFULFNBQVMiLCJmaWxlIjoiY29tcG9uZW50cy9icmVha2Rvd24vYnJlYWtkb3duLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtjdXN0b21FbGVtZW50LCBiaW5kYWJsZX0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtQb3VjaH0gZnJvbSAnc2VydmljZXMvcG91Y2gvcG91Y2guanMnO1xuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCAqIGFzIFBsZWFzZSBmcm9tICdwbGVhc2Vqcyc7XG5pbXBvcnQge0V2ZW50QWdncmVnYXRvcn0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcblxuQGN1c3RvbUVsZW1lbnQoJ2JyZWFrZG93bicpXG5AaW5qZWN0KFBvdWNoLCBFbGVtZW50LCBFdmVudEFnZ3JlZ2F0b3IpXG5leHBvcnQgY2xhc3MgQnJlYWtkb3duIHtcblx0QGJpbmRhYmxlIHR5cGU7XG5cdEBiaW5kYWJsZSBwZXJpb2Q7XG5cdEBiaW5kYWJsZSBkYXk7XG5cblx0Y29uc3RydWN0b3IocG91Y2gsIGVsZW1lbnQsIGV2ZW50cykge1xuXHRcdHRoaXMucG91Y2ggPSBwb3VjaDtcblx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXHRcdHRoaXMuZXZlbnRzID0gZXZlbnRzO1xuXG5cdFx0dGhpcy5ldmVudHMuc3Vic2NyaWJlKCd0aW1lLXVwZGF0ZS1jaGFydHMnLCBwYXlsb2FkID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcnQocGF5bG9hZCk7XG4gICAgICAgIH0pO1xuXG5cdFx0dGhpcy5pbml0KCk7XG5cdH1cblxuXHRhY3RpdmF0ZSgpIHtcblx0XHQvL3RoaXMuaW5pdCgpO1xuXHR9XG5cblx0ZHJhd0NoYXJ0KCkge1xuXHRcdHNldFRpbWVvdXQoICgpID0+IHtcblx0XHRcdHRoaXMuY3R4ID0gdGhpcy5lbGVtZW50LmNoaWxkcmVuWzBdLmdldENvbnRleHQoXCIyZFwiKTtcblx0XHRcdHRoaXMuY2hhcnQgPSBuZXcgQ2hhcnQodGhpcy5jdHgpLkRvdWdobnV0KHRoaXMuYnJlYWtkb3duLml0ZW1zKTtcblx0XHR9LCAxMCApO1xuXHR9XG5cblx0dXBkYXRlQ2hhcnQobXMpIHtcblx0XHRpZiggbXMgKSB7XG5cdFx0XHR0aGlzLmRheSA9IG1zO1xuXHRcdH1cblxuXHRcdGlmKCB0aGlzLmNoYXJ0ICkge1xuXHRcdFx0dGhpcy5jaGFydC5kZXN0cm95KCk7XG5cdFx0fVxuXHRcdHNldFRpbWVvdXQoICgpID0+IHtcblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH0sIDEwICk7XG5cdH1cblxuXHRpbml0KCkge1xuXHRcdHRoaXMuYnJlYWtkb3duID0gbnVsbDtcblxuXHRcdFByb21pc2UuYWxsKCBbdGhpcy5wb3VjaC5nZXRUYXNrcyh0cnVlKSwgdGhpcy5wb3VjaC5nZXRQcm9qZWN0cygpXSApXG5cdFx0XHQudGhlbiggKHJlc3VsdCkgPT4ge1xuXG5cdFx0XHRcdGxldCB0YXNrcyA9IHJlc3VsdFswXS5tYXAoIHQgPT4ge1xuXHRcdFx0XHRcdHJldHVybiB0LmRvYztcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGxldCBwcm9qZWN0cyA9IHJlc3VsdFsxXS5tYXAoIHAgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBwLmRvYztcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYoIHRoaXMudHlwZSA9PT0gJ3Rhc2snICkge1xuXHRcdFx0XHRcdHRoaXMuYnJlYWtkb3duQnlUYXNrKCB0YXNrcywgcHJvamVjdHMgKTtcblx0XHRcdFx0fSBlbHNlIGlmKCB0aGlzLnR5cGUgPT09ICdwcm9qZWN0JyApIHtcblx0XHRcdFx0XHR0aGlzLmJyZWFrZG93bkJ5UGVyaW9kKCB0YXNrcywgcHJvamVjdHMgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gYnJlYWtkb3duIHR5cGUnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblx0fVxuXG5cdGZpbHRlclRhc2tzQnlEYXkoIHRhc2tzLCBtcyApIHtcblx0XHRsZXQgdGFyZ2V0ID0gbW9tZW50KG1zKTtcblx0XHRyZXR1cm4gdGFza3MuZmlsdGVyKCB0ID0+IHtcblx0XHRcdGlmKCAhdC5pbnRlcnZhbHMgKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvciggbGV0IGk9MDsgaTx0LmludGVydmFscy5sZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0XHRpZiggdC5pbnRlcnZhbHNbaV0uc3RhcnQgJiYgdC5pbnRlcnZhbHNbaV0uc3RvcCApIHtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuaW50ZXJ2YWxPbkRheSggdGFyZ2V0LCB0LmludGVydmFsc1tpXSApO1xuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGludGVydmFsT25EYXkoIHRhcmdldCwgaW50ZXJ2YWwgKSB7XG5cdFx0bGV0IHN0YXJ0ID0gbW9tZW50KGludGVydmFsLnN0YXJ0KTtcblx0XHRsZXQgc3RvcCA9IG1vbWVudChpbnRlcnZhbC5zdG9wKTtcblxuXHRcdGxldCBzdGFydFNhbWUgPSBzdGFydC5pc1NhbWUoIHRhcmdldCwgJ2RheScgKTtcblx0XHRsZXQgc3RvcFNhbWUgPSBzdG9wLmlzU2FtZSggdGFyZ2V0LCAnZGF5JyApO1xuXG5cdFx0cmV0dXJuIHN0YXJ0U2FtZSB8fCBzdG9wU2FtZTtcblx0fVxuXG5cdGJyZWFrZG93bkJ5VGFzayggdGFza3MsIHByb2plY3RzICkge1xuXHRcdHRoaXMuYnJlYWtkb3duID0ge1xuXHRcdFx0dGltZTogMCxcblx0XHRcdGl0ZW1zOiBbXVxuXHRcdH07XG5cblx0XHR0YXNrcyA9IHRoaXMuZmlsdGVyVGFza3NCeURheSggdGFza3MsIHRoaXMuZGF5ICk7XG5cdFx0bGV0IHRvdGFsVGltZSA9IHRoaXMuZ2V0VG90YWxUaW1lKCB0YXNrcyApO1xuXG5cdFx0dGhpcy5icmVha2Rvd24udGltZSA9IHRvdGFsVGltZTtcblxuXHRcdHRhc2tzLmZvckVhY2goIHQgPT4ge1xuXHRcdFx0bGV0IHRpbWUgPSB0aGlzLmdldFRvdGFsVGltZUZvclRhc2soIHQgKTtcblx0XHRcdHRoaXMuYnJlYWtkb3duLml0ZW1zLnB1c2goe1xuXHRcdFx0XHRsYWJlbDogdC5uYW1lLFxuXHRcdFx0XHR2YWx1ZTogTWF0aC5mbG9vcigodGltZS90b3RhbFRpbWUpKjEwMCksXG5cdFx0XHRcdGNvbG9yOiBQbGVhc2UubWFrZV9jb2xvcigpWzBdLFxuXHRcdFx0XHR0aW1lOiB0aW1lIFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLmRyYXdDaGFydCgpO1xuXHR9XG5cblx0Z2V0VG90YWxUaW1lKCB0YXNrcyApIHtcblx0XHRsZXQgdGltZSA9IDA7XG5cdFx0dGFza3MuZm9yRWFjaCggdCA9PiB7XG5cdFx0XHR0aW1lICs9IHRoaXMuZ2V0VG90YWxUaW1lRm9yVGFzayggdCApO1xuXHRcdH0pO1xuXHRcdHJldHVybiB0aW1lO1xuXHR9XG5cblx0YnJlYWtkb3duQnlQZXJpb2QoIHRhc2tzLCBwcm9qZWN0cyApIHtcblx0XHR0aGlzLmJyZWFrZG93biA9IHtcblx0XHRcdHRpbWU6IDAsXG5cdFx0XHRpdGVtczogW11cblx0XHR9O1xuXG5cdFx0dGFza3MgPSB0aGlzLmZpbHRlclRhc2tzQnlEYXkoIHRhc2tzLCB0aGlzLmRheSApO1xuXHRcdGxldCB0b3RhbFRpbWUgPSB0aGlzLmdldFRvdGFsVGltZSggdGFza3MgKTtcblxuXHRcdHRoaXMuYnJlYWtkb3duLnRpbWUgPSB0b3RhbFRpbWU7XG5cblx0XHRsZXQgYnlQcm9qZWN0ID0ge307XG5cblx0XHR0YXNrcy5mb3JFYWNoKCB0ID0+IHtcblx0XHRcdGxldCBwcm9qZWN0ID0gdGhpcy5nZXRQcm9qZWN0QnlJZCggdC5wcm9qZWN0X2lkLCBwcm9qZWN0cyApO1xuXG5cdFx0XHRpZiggcHJvamVjdCApIHtcblx0XHRcdFx0aWYoICFieVByb2plY3RbcHJvamVjdC5faWRdICkge1xuXHRcdFx0XHRcdGJ5UHJvamVjdFtwcm9qZWN0Ll9pZF0gPSB7XG5cdFx0XHRcdFx0XHRwcm9qZWN0OiBwcm9qZWN0LFxuXHRcdFx0XHRcdFx0dGFza3M6IFtdXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IFxuXG5cdFx0XHRcdGJ5UHJvamVjdFtwcm9qZWN0Ll9pZF0udGFza3MucHVzaCggdCApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyhieVByb2plY3QpO1xuXHRcdGtleXMuZm9yRWFjaCgga2V5ID0+IHtcblxuXHRcdFx0bGV0IHRvdGFsRm9yVGFza0dyb3VwID0gMDtcblx0XHRcdGJ5UHJvamVjdFtrZXldLnRhc2tzLmZvckVhY2goIHRzayA9PiB7XG5cdFx0XHRcdHRvdGFsRm9yVGFza0dyb3VwICs9IHRoaXMuZ2V0VG90YWxUaW1lRm9yVGFzayggdHNrICk7XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5icmVha2Rvd24uaXRlbXMucHVzaCh7XG5cdFx0XHRcdGxhYmVsOiBieVByb2plY3Rba2V5XS5wcm9qZWN0Lm5hbWUsXG5cdFx0XHRcdHZhbHVlOiBNYXRoLmZsb29yKCh0b3RhbEZvclRhc2tHcm91cC90b3RhbFRpbWUpKjEwMCksIC8qIHNlY29uZHMgKi9cblx0XHRcdFx0Y29sb3I6IGJ5UHJvamVjdFtrZXldLnByb2plY3QuY29sb3IsXG5cdFx0XHRcdHRpbWU6IHRvdGFsRm9yVGFza0dyb3VwXG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHRoaXMuZHJhd0NoYXJ0KCk7XG5cdH1cblxuXHRnZXRQcm9qZWN0QnlJZCggaWQsIHByb2plY3RzICkge1xuXHRcdGZvcihsZXQgaT0wOyBpPHByb2plY3RzLmxlbmd0aDsgaSsrICkge1xuXHRcdFx0aWYoIHByb2plY3RzW2ldLl9pZCA9PT0gaWQgKSB7XG5cdFx0XHRcdHJldHVybiBwcm9qZWN0c1tpXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRnZXRUYXNrc0ZvclByb2plY3QoIHRhc2tzLCBwcm9qZWN0ICkge1xuXHRcdHJldHVybiB0YXNrcy5maWx0ZXIoIHQgPT4ge1xuXHRcdFx0dC5wcm9qZWN0X2lkID09PSBwcm9qZWN0Ll9pZDtcblx0XHR9KTtcblx0fVxuXG5cdGdldFRvdGFsVGltZUZvclRhc2soIHRhc2sgKSB7XG5cdFx0bGV0IHRpbWUgPSAwO1xuXHRcdGlmKCB0YXNrLmludGVydmFscyApIHtcblx0XHRcdHRhc2suaW50ZXJ2YWxzLmZvckVhY2goIGkgPT4ge1xuXHRcdFx0XHRpZiggaS5zdGFydCAmJiBpLnN0b3AgKSB7XG5cdFx0XHRcdFx0dGltZSArPSBNYXRoLmZsb29yKChpLnN0b3AgLSBpLnN0YXJ0KSAvIDEwMDApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0cmV0dXJuIHRpbWU7IC8qIHNlY29uZHMgKi9cblx0fVxuXG5cdGdldFRvdGFsVGltZUZyb21Qcm9qZWN0KCB0YXNrcywgcHJvamVjdCApIHtcblx0XHRsZXQgdGltZSA9IDA7XG5cdFx0bGV0IGZpbHRlcmVkID0gdGhpcy5nZXRUYXNrc0ZvclByb2plY3QoIHRhc2tzLCBwcm9qZWN0ICk7XG5cblx0XHRmaWx0ZXJlZC5mb3JFYWNoKCB0ID0+IHtcblx0XHRcdHRpbWUgKz0gdGhpcy5nZXRUb3RhbFRpbWVGb3JUYXNrKCB0ICk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGltZTsgLyogc2Vjb25kcyAqL1xuXHR9XG59XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
