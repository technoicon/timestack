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
				}, {
					key: 'dayTasks',
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

					_defineDecoratedPropertyDescriptor(this, 'dayTasks', _instanceInitializers);

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

						this.dayTasks = tasks;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYnJlYWtkb3duL2JyZWFrZG93bi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7c0VBUWEsU0FBUzs7Ozs7Ozs7OztxQ0FSZCxhQUFhO2dDQUFFLFFBQVE7OEJBRXZCLE1BQU07O2lDQUROLEtBQUs7Ozs7NkNBR0wsZUFBZTs7O0FBSVYsWUFBUzs7OzswQkFBVCxTQUFTOztrQkFDcEIsUUFBUTs7Ozs7a0JBQ1IsUUFBUTs7Ozs7a0JBQ1IsUUFBUTs7Ozs7a0JBQ1IsUUFBUTs7Ozs7QUFFRSxhQU5DLFNBQVMsQ0FNVCxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTs7Ozs7Ozs7Ozs7OztBQUNuQyxTQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixTQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUN2QixTQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7QUFFckIsU0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsb0JBQW9CLEVBQUUsVUFBQSxPQUFPLEVBQUk7QUFDN0MsWUFBSyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7TUFDN0IsQ0FBQyxDQUFDOztBQUVULFNBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNaOzswQkFoQlcsU0FBUzs7WUFrQmIsb0JBQUcsRUFFVjs7O1lBRVEscUJBQUc7OztBQUNYLGdCQUFVLENBQUUsWUFBTTtBQUNqQixjQUFLLEdBQUcsR0FBRyxPQUFLLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JELGNBQUssS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLE9BQUssR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQUssU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQ2hFLEVBQUUsRUFBRSxDQUFFLENBQUM7TUFDUjs7O1lBRVUscUJBQUMsRUFBRSxFQUFFOzs7QUFDZixVQUFJLEVBQUUsRUFB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QUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUEsR0FBSSxJQUFJLENBQUMsQ0FBQztTQUM5QztRQUNELENBQUMsQ0FBQztPQUNIO0FBQ0QsYUFBTyxJQUFJLENBQUM7TUFDWjs7O1lBRXNCLGlDQUFFLEtBQUssRUFBRSxPQUFPLEVBQUc7OztBQUN6QyxVQUFJLElBQUksR0FBRyxDQUFDLENBQUM7QUFDYixVQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBRSxDQUFDOztBQUV6RCxjQUFRLENBQUMsT0FBTyxDQUFFLFVBQUEsQ0FBQyxFQUFJO0FBQ3RCLFdBQUksSUFBSSxPQUFLLG1CQUFtQixDQUFFLENBQUMsQ0FBRSxDQUFDO09BQ3RDLENBQUMsQ0FBQzs7QUFFSCxhQUFPLElBQUksQ0FBQztNQUNaOzs7cUJBck5XLFNBQVM7QUFBVCxhQUFTLEdBRHJCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUMzQixTQUFTLEtBQVQsU0FBUztBQUFULGFBQVMsR0FGckIsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUVkLFNBQVMsS0FBVCxTQUFTO1dBQVQsU0FBUyIsImZpbGUiOiJjb21wb25lbnRzL2JyZWFrZG93bi9icmVha2Rvd24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2N1c3RvbUVsZW1lbnQsIGJpbmRhYmxlfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge1BvdWNofSBmcm9tICdzZXJ2aWNlcy9wb3VjaC9wb3VjaC5qcyc7XG5pbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0ICogYXMgUGxlYXNlIGZyb20gJ3BsZWFzZWpzJztcbmltcG9ydCB7RXZlbnRBZ2dyZWdhdG9yfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xuXG5AY3VzdG9tRWxlbWVudCgnYnJlYWtkb3duJylcbkBpbmplY3QoUG91Y2gsIEVsZW1lbnQsIEV2ZW50QWdncmVnYXRvcilcbmV4cG9ydCBjbGFzcyBCcmVha2Rvd24ge1xuXHRAYmluZGFibGUgdHlwZTtcblx0QGJpbmRhYmxlIHBlcmlvZDtcblx0QGJpbmRhYmxlIGRheTtcblx0QGJpbmRhYmxlIGRheVRhc2tzO1xuXG5cdGNvbnN0cnVjdG9yKHBvdWNoLCBlbGVtZW50LCBldmVudHMpIHtcblx0XHR0aGlzLnBvdWNoID0gcG91Y2g7XG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblx0XHR0aGlzLmV2ZW50cyA9IGV2ZW50cztcblxuXHRcdHRoaXMuZXZlbnRzLnN1YnNjcmliZSgndGltZS11cGRhdGUtY2hhcnRzJywgcGF5bG9hZCA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJ0KHBheWxvYWQpO1xuICAgICAgICB9KTtcblxuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblx0YWN0aXZhdGUoKSB7XG5cdFx0Ly90aGlzLmluaXQoKTtcblx0fVxuXG5cdGRyYXdDaGFydCgpIHtcblx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XG5cdFx0XHR0aGlzLmN0eCA9IHRoaXMuZWxlbWVudC5jaGlsZHJlblswXS5nZXRDb250ZXh0KFwiMmRcIik7XG5cdFx0XHR0aGlzLmNoYXJ0ID0gbmV3IENoYXJ0KHRoaXMuY3R4KS5Eb3VnaG51dCh0aGlzLmJyZWFrZG93bi5pdGVtcyk7XG5cdFx0fSwgMTAgKTtcblx0fVxuXG5cdHVwZGF0ZUNoYXJ0KG1zKSB7XG5cdFx0aWYoIG1zICkge1xuXHRcdFx0dGhpcy5kYXkgPSBtcztcblx0XHR9XG5cblx0XHRpZiggdGhpcy5jaGFydCApIHtcblx0XHRcdHRoaXMuY2hhcnQuZGVzdHJveSgpO1xuXHRcdH1cblx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHR9LCAxMCApO1xuXHR9XG5cblx0aW5pdCgpIHtcblx0XHR0aGlzLmJyZWFrZG93biA9IG51bGw7XG5cblx0XHRQcm9taXNlLmFsbCggW3RoaXMucG91Y2guZ2V0VGFza3ModHJ1ZSksIHRoaXMucG91Y2guZ2V0UHJvamVjdHMoKV0gKVxuXHRcdFx0LnRoZW4oIChyZXN1bHQpID0+IHtcblxuXHRcdFx0XHRsZXQgdGFza3MgPSByZXN1bHRbMF0ubWFwKCB0ID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gdC5kb2M7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRsZXQgcHJvamVjdHMgPSByZXN1bHRbMV0ubWFwKCBwID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gcC5kb2M7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmKCB0aGlzLnR5cGUgPT09ICd0YXNrJyApIHtcblx0XHRcdFx0XHR0aGlzLmJyZWFrZG93bkJ5VGFzayggdGFza3MsIHByb2plY3RzICk7XG5cdFx0XHRcdH0gZWxzZSBpZiggdGhpcy50eXBlID09PSAncHJvamVjdCcgKSB7XG5cdFx0XHRcdFx0dGhpcy5icmVha2Rvd25CeVBlcmlvZCggdGFza3MsIHByb2plY3RzICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGJyZWFrZG93biB0eXBlJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSk7XG5cdH1cblxuXHRmaWx0ZXJUYXNrc0J5RGF5KCB0YXNrcywgbXMgKSB7XG5cdFx0bGV0IHRhcmdldCA9IG1vbWVudChtcyk7XG5cdFx0cmV0dXJuIHRhc2tzLmZpbHRlciggdCA9PiB7XG5cdFx0XHRpZiggIXQuaW50ZXJ2YWxzICkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IoIGxldCBpPTA7IGk8dC5pbnRlcnZhbHMubGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdFx0aWYoIHQuaW50ZXJ2YWxzW2ldLnN0YXJ0ICYmIHQuaW50ZXJ2YWxzW2ldLnN0b3AgKSB7XG5cblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmludGVydmFsT25EYXkoIHRhcmdldCwgdC5pbnRlcnZhbHNbaV0gKTtcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRpbnRlcnZhbE9uRGF5KCB0YXJnZXQsIGludGVydmFsICkge1xuXHRcdGxldCBzdGFydCA9IG1vbWVudChpbnRlcnZhbC5zdGFydCk7XG5cdFx0bGV0IHN0b3AgPSBtb21lbnQoaW50ZXJ2YWwuc3RvcCk7XG5cblx0XHRsZXQgc3RhcnRTYW1lID0gc3RhcnQuaXNTYW1lKCB0YXJnZXQsICdkYXknICk7XG5cdFx0bGV0IHN0b3BTYW1lID0gc3RvcC5pc1NhbWUoIHRhcmdldCwgJ2RheScgKTtcblxuXHRcdHJldHVybiBzdGFydFNhbWUgfHwgc3RvcFNhbWU7XG5cdH1cblxuXHRicmVha2Rvd25CeVRhc2soIHRhc2tzLCBwcm9qZWN0cyApIHtcblx0XHR0aGlzLmJyZWFrZG93biA9IHtcblx0XHRcdHRpbWU6IDAsXG5cdFx0XHRpdGVtczogW11cblx0XHR9O1xuXG5cdFx0dGFza3MgPSB0aGlzLmZpbHRlclRhc2tzQnlEYXkoIHRhc2tzLCB0aGlzLmRheSApO1xuXG5cdFx0dGhpcy5kYXlUYXNrcyA9IHRhc2tzO1xuXG5cdFx0bGV0IHRvdGFsVGltZSA9IHRoaXMuZ2V0VG90YWxUaW1lKCB0YXNrcyApO1xuXG5cdFx0dGhpcy5icmVha2Rvd24udGltZSA9IHRvdGFsVGltZTtcblxuXHRcdHRhc2tzLmZvckVhY2goIHQgPT4ge1xuXHRcdFx0bGV0IHRpbWUgPSB0aGlzLmdldFRvdGFsVGltZUZvclRhc2soIHQgKTtcblx0XHRcdHRoaXMuYnJlYWtkb3duLml0ZW1zLnB1c2goe1xuXHRcdFx0XHRsYWJlbDogdC5uYW1lLFxuXHRcdFx0XHR2YWx1ZTogTWF0aC5mbG9vcigodGltZS90b3RhbFRpbWUpKjEwMCksXG5cdFx0XHRcdGNvbG9yOiBQbGVhc2UubWFrZV9jb2xvcigpWzBdLFxuXHRcdFx0XHR0aW1lOiB0aW1lIFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLmRyYXdDaGFydCgpO1xuXHR9XG5cblx0Z2V0VG90YWxUaW1lKCB0YXNrcyApIHtcblx0XHRsZXQgdGltZSA9IDA7XG5cdFx0dGFza3MuZm9yRWFjaCggdCA9PiB7XG5cdFx0XHR0aW1lICs9IHRoaXMuZ2V0VG90YWxUaW1lRm9yVGFzayggdCApO1xuXHRcdH0pO1xuXHRcdHJldHVybiB0aW1lO1xuXHR9XG5cblx0YnJlYWtkb3duQnlQZXJpb2QoIHRhc2tzLCBwcm9qZWN0cyApIHtcblx0XHR0aGlzLmJyZWFrZG93biA9IHtcblx0XHRcdHRpbWU6IDAsXG5cdFx0XHRpdGVtczogW11cblx0XHR9O1xuXG5cdFx0dGFza3MgPSB0aGlzLmZpbHRlclRhc2tzQnlEYXkoIHRhc2tzLCB0aGlzLmRheSApO1xuXHRcdGxldCB0b3RhbFRpbWUgPSB0aGlzLmdldFRvdGFsVGltZSggdGFza3MgKTtcblxuXHRcdHRoaXMuYnJlYWtkb3duLnRpbWUgPSB0b3RhbFRpbWU7XG5cblx0XHRsZXQgYnlQcm9qZWN0ID0ge307XG5cblx0XHR0YXNrcy5mb3JFYWNoKCB0ID0+IHtcblx0XHRcdGxldCBwcm9qZWN0ID0gdGhpcy5nZXRQcm9qZWN0QnlJZCggdC5wcm9qZWN0X2lkLCBwcm9qZWN0cyApO1xuXG5cdFx0XHRpZiggcHJvamVjdCApIHtcblx0XHRcdFx0aWYoICFieVByb2plY3RbcHJvamVjdC5faWRdICkge1xuXHRcdFx0XHRcdGJ5UHJvamVjdFtwcm9qZWN0Ll9pZF0gPSB7XG5cdFx0XHRcdFx0XHRwcm9qZWN0OiBwcm9qZWN0LFxuXHRcdFx0XHRcdFx0dGFza3M6IFtdXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IFxuXG5cdFx0XHRcdGJ5UHJvamVjdFtwcm9qZWN0Ll9pZF0udGFza3MucHVzaCggdCApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyhieVByb2plY3QpO1xuXHRcdGtleXMuZm9yRWFjaCgga2V5ID0+IHtcblxuXHRcdFx0bGV0IHRvdGFsRm9yVGFza0dyb3VwID0gMDtcblx0XHRcdGJ5UHJvamVjdFtrZXldLnRhc2tzLmZvckVhY2goIHRzayA9PiB7XG5cdFx0XHRcdHRvdGFsRm9yVGFza0dyb3VwICs9IHRoaXMuZ2V0VG90YWxUaW1lRm9yVGFzayggdHNrICk7XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5icmVha2Rvd24uaXRlbXMucHVzaCh7XG5cdFx0XHRcdGxhYmVsOiBieVByb2plY3Rba2V5XS5wcm9qZWN0Lm5hbWUsXG5cdFx0XHRcdHZhbHVlOiBNYXRoLmZsb29yKCh0b3RhbEZvclRhc2tHcm91cC90b3RhbFRpbWUpKjEwMCksIC8qIHNlY29uZHMgKi9cblx0XHRcdFx0Y29sb3I6IGJ5UHJvamVjdFtrZXldLnByb2plY3QuY29sb3IsXG5cdFx0XHRcdHRpbWU6IHRvdGFsRm9yVGFza0dyb3VwXG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHRoaXMuZHJhd0NoYXJ0KCk7XG5cdH1cblxuXHRnZXRQcm9qZWN0QnlJZCggaWQsIHByb2plY3RzICkge1xuXHRcdGZvcihsZXQgaT0wOyBpPHByb2plY3RzLmxlbmd0aDsgaSsrICkge1xuXHRcdFx0aWYoIHByb2plY3RzW2ldLl9pZCA9PT0gaWQgKSB7XG5cdFx0XHRcdHJldHVybiBwcm9qZWN0c1tpXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRnZXRUYXNrc0ZvclByb2plY3QoIHRhc2tzLCBwcm9qZWN0ICkge1xuXHRcdHJldHVybiB0YXNrcy5maWx0ZXIoIHQgPT4ge1xuXHRcdFx0dC5wcm9qZWN0X2lkID09PSBwcm9qZWN0Ll9pZDtcblx0XHR9KTtcblx0fVxuXG5cdGdldFRvdGFsVGltZUZvclRhc2soIHRhc2sgKSB7XG5cdFx0bGV0IHRpbWUgPSAwO1xuXHRcdGlmKCB0YXNrLmludGVydmFscyApIHtcblx0XHRcdHRhc2suaW50ZXJ2YWxzLmZvckVhY2goIGkgPT4ge1xuXHRcdFx0XHRpZiggaS5zdGFydCAmJiBpLnN0b3AgKSB7XG5cdFx0XHRcdFx0dGltZSArPSBNYXRoLmZsb29yKChpLnN0b3AgLSBpLnN0YXJ0KSAvIDEwMDApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0cmV0dXJuIHRpbWU7IC8qIHNlY29uZHMgKi9cblx0fVxuXG5cdGdldFRvdGFsVGltZUZyb21Qcm9qZWN0KCB0YXNrcywgcHJvamVjdCApIHtcblx0XHRsZXQgdGltZSA9IDA7XG5cdFx0bGV0IGZpbHRlcmVkID0gdGhpcy5nZXRUYXNrc0ZvclByb2plY3QoIHRhc2tzLCBwcm9qZWN0ICk7XG5cblx0XHRmaWx0ZXJlZC5mb3JFYWNoKCB0ID0+IHtcblx0XHRcdHRpbWUgKz0gdGhpcy5nZXRUb3RhbFRpbWVGb3JUYXNrKCB0ICk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGltZTsgLyogc2Vjb25kcyAqL1xuXHR9XG59XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
