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
  	this.pouch.updateTask( task ).then( t => {
  		this.editingTask = null;
  		this.isEditing = false;
  	});
  }

  getProjectName( task ) {
  	return task.project_id.substring(8);
  }
}