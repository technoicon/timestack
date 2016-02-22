import {customElement, bindable} from 'aurelia-framework';
import {Pouch} from 'services/pouch/pouch.js';
import {inject} from 'aurelia-framework';
import * as Please from 'pleasejs';
import {EventAggregator} from 'aurelia-event-aggregator';

@customElement('breakdown')
@inject(Pouch, Element, EventAggregator)
export class Breakdown {
	@bindable type;
	@bindable period;
	@bindable day;

	constructor(pouch, element, events) {
		this.pouch = pouch;
		this.element = element;
		this.events = events;

		this.events.subscribe('time-update-charts', payload => {
            this.updateChart(payload);
        });

		this.init();
	}

	activate() {
		//this.init();
	}

	drawChart() {
		setTimeout( () => {
			this.ctx = this.element.children[0].getContext("2d");
			this.chart = new Chart(this.ctx).Doughnut(this.breakdown.items);
		}, 10 );
	}

	updateChart(ms) {
		if( ms ) {
			this.day = ms;
		}

		if( this.chart ) {
			this.chart.destroy();
		}
		setTimeout( () => {
			this.init();
		}, 10 );
	}

	init() {
		this.breakdown = null;

		Promise.all( [this.pouch.getTasks(true), this.pouch.getProjects()] )
			.then( (result) => {

				let tasks = result[0].map( t => {
					return t.doc;
				});
				let projects = result[1].map( p => {
					return p.doc;
				});

				if( this.type === 'task' ) {
					this.breakdownByTask( tasks, projects );
				} else if( this.type === 'project' ) {
					this.breakdownByPeriod( tasks, projects );
				} else {
					throw new Error('Unknown breakdown type');
				}

			});
	}

	filterTasksByDay( tasks, ms ) {
		let target = moment(ms);
		return tasks.filter( t => {
			if( !t.intervals ) {
				return false;
			} else {
				for( let i=0; i<t.intervals.length; i++ ) {
					if( t.intervals[i].start && t.intervals[i].stop ) {

						return this.intervalOnDay( target, t.intervals[i] );

					} else {
						return false;
					}
				}
			}
		});
	}

	intervalOnDay( target, interval ) {
		let start = moment(interval.start);
		let stop = moment(interval.stop);

		let startSame = start.isSame( target, 'day' );
		let stopSame = stop.isSame( target, 'day' );

		return startSame || stopSame;
	}

	breakdownByTask( tasks, projects ) {
		this.breakdown = {
			time: 0,
			items: []
		};

		tasks = this.filterTasksByDay( tasks, this.day );
		let totalTime = this.getTotalTime( tasks );

		this.breakdown.time = totalTime;

		tasks.forEach( t => {
			let time = this.getTotalTimeForTask( t );
			this.breakdown.items.push({
				label: t.name,
				value: Math.floor((time/totalTime)*100),
				color: Please.make_color()[0],
				time: time 
			});
		});

		this.drawChart();
	}

	getTotalTime( tasks ) {
		let time = 0;
		tasks.forEach( t => {
			time += this.getTotalTimeForTask( t );
		});
		return time;
	}

	breakdownByPeriod( tasks, projects ) {
		this.breakdown = {
			time: 0,
			items: []
		};

		tasks = this.filterTasksByDay( tasks, this.day );
		let totalTime = this.getTotalTime( tasks );

		this.breakdown.time = totalTime;

		let byProject = {};

		tasks.forEach( t => {
			let project = this.getProjectById( t.project_id, projects );

			if( project ) {
				if( !byProject[project._id] ) {
					byProject[project._id] = {
						project: project,
						tasks: []
					}
				} 

				byProject[project._id].tasks.push( t );
			}
		});

		let keys = Object.keys(byProject);
		keys.forEach( key => {

			let totalForTaskGroup = 0;
			byProject[key].tasks.forEach( tsk => {
				totalForTaskGroup += this.getTotalTimeForTask( tsk );
			});

			this.breakdown.items.push({
				label: byProject[key].project.name,
				value: Math.floor((totalForTaskGroup/totalTime)*100), /* seconds */
				color: byProject[key].project.color,
				time: totalForTaskGroup
			});
		});

		this.drawChart();
	}

	getProjectById( id, projects ) {
		for(let i=0; i<projects.length; i++ ) {
			if( projects[i]._id === id ) {
				return projects[i];
			}
		}
		return null;
	}

	getTasksForProject( tasks, project ) {
		return tasks.filter( t => {
			t.project_id === project._id;
		});
	}

	getTotalTimeForTask( task ) {
		let time = 0;
		if( task.intervals ) {
			task.intervals.forEach( i => {
				if( i.start && i.stop ) {
					time += Math.floor((i.stop - i.start) / 1000);
				}
			});
		}
		return time; /* seconds */
	}

	getTotalTimeFromProject( tasks, project ) {
		let time = 0;
		let filtered = this.getTasksForProject( tasks, project );

		filtered.forEach( t => {
			time += this.getTotalTimeForTask( t );
		});

		return time; /* seconds */
	}
}
















