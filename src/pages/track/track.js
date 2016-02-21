import {Pouch} from 'services/pouch/pouch.js';
import {inject} from 'aurelia-framework';
import {computedFrom} from 'aurelia-binding'

@inject(Pouch)
export default class Track {
  heading = 'Track';
  item_type = 'Task';
  isCreating = false;
  isEditing = false;
  editingTask = null;
  tasks = [];
  projects = [];
  timers = {};
  taskInProgress = null;

  constructor( pouch ) {
  	this.pouch = pouch;
  }

  init() {
  	this.projects = [];
  	this.tasks = [];

  	this.pouch.getTasks().then( tasks => {
		tasks.forEach( t => {
  			this.tasks.push( t.doc );	
  		});

  		this.startTimersOnRunningTasks();
  	});

  	this.pouch.getProjects().then( projects => {
  		projects.forEach( p => {
  			this.projects.push( p.doc );
  		});
  	});
  }

  activate() {
  	this.init();
  }

  startTimersOnRunningTasks() {
  	this.tasks.forEach( t => {
  		if( t.status === 'running' ) {
  			this.initRunningTimer( t );
  		}
  	});
  }

  initRunningTimer( task ) {
  	let elapsed = Math.floor((Date.now() - task.intervals[ task.intervals.length - 1 ].start) / 1000);
  	this.addTimer( task, elapsed );
    this.taskInProgress = task;
  }

  getBlankTask() {
  	return {
  		name: null,
  		desc: null,
  		project_id: null,
  		start_time: null,
  		end_time: null
  	}
  }

  createTask() {
  	this.editingTask = this.getBlankTask();
  	this.isCreating = true;
  }

  editTask( task ) {
  	this.editingTask = task;
  	this.isEditing = true;
  }

  cancelCreate() {
  	console.log( this.tasks );
  	this.isCreating = false;
  }

  removeTask( task ) {
  	this.pouch.removeProject( task ).then( t => {
  		this.tasks = this.tasks.filter( p => {
  			return p._id !== task._id;
  		});
  	});
  }

  newTask( task ) {
  	this.pouch.createTask( task.name, task.desc, task.project_id ).then( task => {
  		this.tasks.push( task );
  		this.editingTask = null;
  		this.isCreating = false;
  	});
  }

  updateTask( task ) {
  	return this.pouch.updateTask( task ).then( t => {
  		this.editingTask = null;
  		this.isEditing = false;
  		return t;
  	});
  }

  start( task ) {
  	this.stopAll().then( () => {
	  	this.addTimer( task );

	  	task.status = 'running';
	  	let interval = {
	  		start: Date.now(),
	  		stop: null
	  	};

	  	task.intervals.push( interval );

	  	this.updateTask( task ).then( t => {
	  		task = t;
	  		this.taskInProgress = task;
	  	});
  	});
  }

  stop( task ) {
  	this.removeTimer( task );

  	task.status = 'paused';
  	
  	let lastInterval = task.intervals[ task.intervals.length - 1 ];

  	if( !lastInterval.stop ) {
  		lastInterval.stop = Date.now();
  	}

  	return this.updateTask( task ).then( t => {
  		task = t;
      this.taskInProgress = null;
  		return t;
  	});
  }

  stopAll() {
  	let proms = [];

  	this.tasks.forEach( t => {
  		proms.push( this.stop(t) );
  	});

  	return Promise.all( proms );
  }

  addTimer( task, elapsed ) {
  	if( !elapsed ) {
  		elapsed = 0;
  	}

  	this.timers[task._id] = {
  		timer: null,
  		seconds: elapsed
  	};

  	let timer = window.setInterval( () => {
  		this.timers[task._id].seconds += 1;
  	}, 1000 );
  	this.timers[task._id].timer = timer;
  }

  removeTimer( task ) {
  	if( this.timers[task._id] ) {
  		window.clearInterval( this.timers[task._id].timer );
  	}
  }
}