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
						}, 150);
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
						}, 150);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYnJlYWtkb3duL2JyZWFrZG93bi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7c0VBUWEsU0FBUzs7Ozs7Ozs7OztxQ0FSZCxhQUFhO2dDQUFFLFFBQVE7OEJBRXZCLE1BQU07O2lDQUROLEtBQUs7Ozs7NkNBR0wsZUFBZTs7O0FBSVYsWUFBUzs7OzswQkFBVCxTQUFTOztrQkFDcEIsUUFBUTs7Ozs7a0JBQ1IsUUFBUTs7Ozs7a0JBQ1IsUUFBUTs7Ozs7QUFFRSxhQUxDLFNBQVMsQ0FLVCxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTs7Ozs7Ozs7Ozs7QUFDbkMsU0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsU0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsU0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0FBRXJCLFNBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLG9CQUFvQixFQUFFLFVBQUEsT0FBTyxFQUFJO0FBQzdDLFlBQUssV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO01BQzdCLENBQUMsQ0FBQzs7QUFFVCxTQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDWjs7MEJBZlcsU0FBUzs7WUFpQmIsb0JBQUcsRUFFVjs7O1lBRVEscUJBQUc7OztBQUNYLGdCQUFVLENBQUUsWUFBTTtBQUNqQixjQUFLLEdBQUcsR0FBRyxPQUFLLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JELGNBQUssS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLE9BQUssR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQUssU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQ2hFLEVBQUUsR0FBRyxDQUFFLENBQUM7TUFDVDs7O1lBRVUscUJBQUMsRUFBRSxFQUFFOzs7QUFDZixVQUFJLEVBQUUsRUFBRztBQUNSLFdBQUksQ0FBQyxH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QUksSUFBSSxDQUFDLENBQUM7U0FDOUM7UUFDRCxDQUFDLENBQUM7T0FDSDtBQUNELGFBQU8sSUFBSSxDQUFDO01BQ1o7OztZQUVzQixpQ0FBRSxLQUFLLEVBQUUsT0FBTyxFQUFHOzs7QUFDekMsVUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ2IsVUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFFLEtBQUssRUFBRSxPQUFPLENBQUUsQ0FBQzs7QUFFekQsY0FBUSxDQUFDLE9BQU8sQ0FBRSxVQUFBLENBQUMsRUFBSTtBQUN0QixXQUFJLElBQUksT0FBSyxtQkFBbUIsQ0FBRSxDQUFDLENBQUUsQ0FBQztPQUN0QyxDQUFDLENBQUM7O0FBRUgsYUFBTyxJQUFJLENBQUM7TUFDWjs7O3FCQWpOVyxTQUFTO0FBQVQsYUFBUyxHQURyQixNQUFNLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FDM0IsU0FBUyxLQUFULFNBQVM7QUFBVCxhQUFTLEdBRnJCLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FFZCxTQUFTLEtBQVQsU0FBUztXQUFULFNBQVMiLCJmaWxlIjoiY29tcG9uZW50cy9icmVha2Rvd24vYnJlYWtkb3duLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtjdXN0b21FbGVtZW50LCBiaW5kYWJsZX0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtQb3VjaH0gZnJvbSAnc2VydmljZXMvcG91Y2gvcG91Y2guanMnO1xuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCAqIGFzIFBsZWFzZSBmcm9tICdwbGVhc2Vqcyc7XG5pbXBvcnQge0V2ZW50QWdncmVnYXRvcn0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcblxuQGN1c3RvbUVsZW1lbnQoJ2JyZWFrZG93bicpXG5AaW5qZWN0KFBvdWNoLCBFbGVtZW50LCBFdmVudEFnZ3JlZ2F0b3IpXG5leHBvcnQgY2xhc3MgQnJlYWtkb3duIHtcblx0QGJpbmRhYmxlIHR5cGU7XG5cdEBiaW5kYWJsZSBwZXJpb2Q7XG5cdEBiaW5kYWJsZSBkYXk7XG5cblx0Y29uc3RydWN0b3IocG91Y2gsIGVsZW1lbnQsIGV2ZW50cykge1xuXHRcdHRoaXMucG91Y2ggPSBwb3VjaDtcblx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXHRcdHRoaXMuZXZlbnRzID0gZXZlbnRzO1xuXG5cdFx0dGhpcy5ldmVudHMuc3Vic2NyaWJlKCd0aW1lLXVwZGF0ZS1jaGFydHMnLCBwYXlsb2FkID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcnQocGF5bG9hZCk7XG4gICAgICAgIH0pO1xuXG5cdFx0dGhpcy5pbml0KCk7XG5cdH1cblxuXHRhY3RpdmF0ZSgpIHtcblx0XHQvL3RoaXMuaW5pdCgpO1xuXHR9XG5cblx0ZHJhd0NoYXJ0KCkge1xuXHRcdHNldFRpbWVvdXQoICgpID0+IHtcblx0XHRcdHRoaXMuY3R4ID0gdGhpcy5lbGVtZW50LmNoaWxkcmVuWzBdLmdldENvbnRleHQoXCIyZFwiKTtcblx0XHRcdHRoaXMuY2hhcnQgPSBuZXcgQ2hhcnQodGhpcy5jdHgpLkRvdWdobnV0KHRoaXMuYnJlYWtkb3duLml0ZW1zKTtcblx0XHR9LCAxNTAgKTtcblx0fVxuXG5cdHVwZGF0ZUNoYXJ0KG1zKSB7XG5cdFx0aWYoIG1zICkge1xuXHRcdFx0dGhpcy5kYXkgPSBtcztcblx0XHR9XG5cblx0XHRpZiggdGhpcy5jaGFydCApIHtcblx0XHRcdHRoaXMuY2hhcnQuZGVzdHJveSgpO1xuXHRcdH1cblx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHR9LCAxNTAgKTtcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0dGhpcy5icmVha2Rvd24gPSBudWxsO1xuXG5cdFx0UHJvbWlzZS5hbGwoIFt0aGlzLnBvdWNoLmdldFRhc2tzKHRydWUpLCB0aGlzLnBvdWNoLmdldFByb2plY3RzKCldIClcblx0XHRcdC50aGVuKCAocmVzdWx0KSA9PiB7XG5cblx0XHRcdFx0bGV0IHRhc2tzID0gcmVzdWx0WzBdLm1hcCggdCA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIHQuZG9jO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0bGV0IHByb2plY3RzID0gcmVzdWx0WzFdLm1hcCggcCA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIHAuZG9jO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiggdGhpcy50eXBlID09PSAndGFzaycgKSB7XG5cdFx0XHRcdFx0dGhpcy5icmVha2Rvd25CeVRhc2soIHRhc2tzLCBwcm9qZWN0cyApO1xuXHRcdFx0XHR9IGVsc2UgaWYoIHRoaXMudHlwZSA9PT0gJ3Byb2plY3QnICkge1xuXHRcdFx0XHRcdHRoaXMuYnJlYWtkb3duQnlQZXJpb2QoIHRhc2tzLCBwcm9qZWN0cyApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignVW5rbm93biBicmVha2Rvd24gdHlwZScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pO1xuXHR9XG5cblx0ZmlsdGVyVGFza3NCeURheSggdGFza3MsIG1zICkge1xuXHRcdGxldCB0YXJnZXQgPSBtb21lbnQobXMpO1xuXHRcdHJldHVybiB0YXNrcy5maWx0ZXIoIHQgPT4ge1xuXHRcdFx0aWYoICF0LmludGVydmFscyApIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yKCBsZXQgaT0wOyBpPHQuaW50ZXJ2YWxzLmxlbmd0aDsgaSsrICkge1xuXHRcdFx0XHRcdGlmKCB0LmludGVydmFsc1tpXS5zdGFydCAmJiB0LmludGVydmFsc1tpXS5zdG9wICkge1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5pbnRlcnZhbE9uRGF5KCB0YXJnZXQsIHQuaW50ZXJ2YWxzW2ldICk7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0aW50ZXJ2YWxPbkRheSggdGFyZ2V0LCBpbnRlcnZhbCApIHtcblx0XHRsZXQgc3RhcnQgPSBtb21lbnQoaW50ZXJ2YWwuc3RhcnQpO1xuXHRcdGxldCBzdG9wID0gbW9tZW50KGludGVydmFsLnN0b3ApO1xuXG5cdFx0bGV0IHN0YXJ0U2FtZSA9IHN0YXJ0LmlzU2FtZSggdGFyZ2V0LCAnZGF5JyApO1xuXHRcdGxldCBzdG9wU2FtZSA9IHN0b3AuaXNTYW1lKCB0YXJnZXQsICdkYXknICk7XG5cblx0XHRyZXR1cm4gc3RhcnRTYW1lIHx8IHN0b3BTYW1lO1xuXHR9XG5cblx0YnJlYWtkb3duQnlUYXNrKCB0YXNrcywgcHJvamVjdHMgKSB7XG5cdFx0dGhpcy5icmVha2Rvd24gPSB7XG5cdFx0XHR0aW1lOiAwLFxuXHRcdFx0aXRlbXM6IFtdXG5cdFx0fTtcblxuXHRcdHRhc2tzID0gdGhpcy5maWx0ZXJUYXNrc0J5RGF5KCB0YXNrcywgdGhpcy5kYXkgKTtcblx0XHRsZXQgdG90YWxUaW1lID0gdGhpcy5nZXRUb3RhbFRpbWUoIHRhc2tzICk7XG5cblx0XHR0aGlzLmJyZWFrZG93bi50aW1lID0gdG90YWxUaW1lO1xuXG5cdFx0dGFza3MuZm9yRWFjaCggdCA9PiB7XG5cdFx0XHRsZXQgdGltZSA9IHRoaXMuZ2V0VG90YWxUaW1lRm9yVGFzayggdCApO1xuXHRcdFx0dGhpcy5icmVha2Rvd24uaXRlbXMucHVzaCh7XG5cdFx0XHRcdGxhYmVsOiB0Lm5hbWUsXG5cdFx0XHRcdHZhbHVlOiBNYXRoLmZsb29yKCh0aW1lL3RvdGFsVGltZSkqMTAwKSxcblx0XHRcdFx0Y29sb3I6IFBsZWFzZS5tYWtlX2NvbG9yKClbMF0sXG5cdFx0XHRcdHRpbWU6IHRpbWUgXG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHRoaXMuZHJhd0NoYXJ0KCk7XG5cdH1cblxuXHRnZXRUb3RhbFRpbWUoIHRhc2tzICkge1xuXHRcdGxldCB0aW1lID0gMDtcblx0XHR0YXNrcy5mb3JFYWNoKCB0ID0+IHtcblx0XHRcdHRpbWUgKz0gdGhpcy5nZXRUb3RhbFRpbWVGb3JUYXNrKCB0ICk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRpbWU7XG5cdH1cblxuXHRicmVha2Rvd25CeVBlcmlvZCggdGFza3MsIHByb2plY3RzICkge1xuXHRcdHRoaXMuYnJlYWtkb3duID0ge1xuXHRcdFx0dGltZTogMCxcblx0XHRcdGl0ZW1zOiBbXVxuXHRcdH07XG5cblx0XHR0YXNrcyA9IHRoaXMuZmlsdGVyVGFza3NCeURheSggdGFza3MsIHRoaXMuZGF5ICk7XG5cdFx0bGV0IHRvdGFsVGltZSA9IHRoaXMuZ2V0VG90YWxUaW1lKCB0YXNrcyApO1xuXG5cdFx0dGhpcy5icmVha2Rvd24udGltZSA9IHRvdGFsVGltZTtcblxuXHRcdGxldCBieVByb2plY3QgPSB7fTtcblxuXHRcdHRhc2tzLmZvckVhY2goIHQgPT4ge1xuXHRcdFx0bGV0IHByb2plY3QgPSB0aGlzLmdldFByb2plY3RCeUlkKCB0LnByb2plY3RfaWQsIHByb2plY3RzICk7XG5cblx0XHRcdGlmKCBwcm9qZWN0ICkge1xuXHRcdFx0XHRpZiggIWJ5UHJvamVjdFtwcm9qZWN0Ll9pZF0gKSB7XG5cdFx0XHRcdFx0YnlQcm9qZWN0W3Byb2plY3QuX2lkXSA9IHtcblx0XHRcdFx0XHRcdHByb2plY3Q6IHByb2plY3QsXG5cdFx0XHRcdFx0XHR0YXNrczogW11cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gXG5cblx0XHRcdFx0YnlQcm9qZWN0W3Byb2plY3QuX2lkXS50YXNrcy5wdXNoKCB0ICk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRsZXQga2V5cyA9IE9iamVjdC5rZXlzKGJ5UHJvamVjdCk7XG5cdFx0a2V5cy5mb3JFYWNoKCBrZXkgPT4ge1xuXG5cdFx0XHRsZXQgdG90YWxGb3JUYXNrR3JvdXAgPSAwO1xuXHRcdFx0YnlQcm9qZWN0W2tleV0udGFza3MuZm9yRWFjaCggdHNrID0+IHtcblx0XHRcdFx0dG90YWxGb3JUYXNrR3JvdXAgKz0gdGhpcy5nZXRUb3RhbFRpbWVGb3JUYXNrKCB0c2sgKTtcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLmJyZWFrZG93bi5pdGVtcy5wdXNoKHtcblx0XHRcdFx0bGFiZWw6IGJ5UHJvamVjdFtrZXldLnByb2plY3QubmFtZSxcblx0XHRcdFx0dmFsdWU6IE1hdGguZmxvb3IoKHRvdGFsRm9yVGFza0dyb3VwL3RvdGFsVGltZSkqMTAwKSwgLyogc2Vjb25kcyAqL1xuXHRcdFx0XHRjb2xvcjogYnlQcm9qZWN0W2tleV0ucHJvamVjdC5jb2xvcixcblx0XHRcdFx0dGltZTogdG90YWxGb3JUYXNrR3JvdXBcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5kcmF3Q2hhcnQoKTtcblx0fVxuXG5cdGdldFByb2plY3RCeUlkKCBpZCwgcHJvamVjdHMgKSB7XG5cdFx0Zm9yKGxldCBpPTA7IGk8cHJvamVjdHMubGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRpZiggcHJvamVjdHNbaV0uX2lkID09PSBpZCApIHtcblx0XHRcdFx0cmV0dXJuIHByb2plY3RzW2ldO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGdldFRhc2tzRm9yUHJvamVjdCggdGFza3MsIHByb2plY3QgKSB7XG5cdFx0cmV0dXJuIHRhc2tzLmZpbHRlciggdCA9PiB7XG5cdFx0XHR0LnByb2plY3RfaWQgPT09IHByb2plY3QuX2lkO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0VG90YWxUaW1lRm9yVGFzayggdGFzayApIHtcblx0XHRsZXQgdGltZSA9IDA7XG5cdFx0aWYoIHRhc2suaW50ZXJ2YWxzICkge1xuXHRcdFx0dGFzay5pbnRlcnZhbHMuZm9yRWFjaCggaSA9PiB7XG5cdFx0XHRcdGlmKCBpLnN0YXJ0ICYmIGkuc3RvcCApIHtcblx0XHRcdFx0XHR0aW1lICs9IE1hdGguZmxvb3IoKGkuc3RvcCAtIGkuc3RhcnQpIC8gMTAwMCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGltZTsgLyogc2Vjb25kcyAqL1xuXHR9XG5cblx0Z2V0VG90YWxUaW1lRnJvbVByb2plY3QoIHRhc2tzLCBwcm9qZWN0ICkge1xuXHRcdGxldCB0aW1lID0gMDtcblx0XHRsZXQgZmlsdGVyZWQgPSB0aGlzLmdldFRhc2tzRm9yUHJvamVjdCggdGFza3MsIHByb2plY3QgKTtcblxuXHRcdGZpbHRlcmVkLmZvckVhY2goIHQgPT4ge1xuXHRcdFx0dGltZSArPSB0aGlzLmdldFRvdGFsVGltZUZvclRhc2soIHQgKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiB0aW1lOyAvKiBzZWNvbmRzICovXG5cdH1cbn1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
