import {Pouch} from 'services/pouch/pouch.js';
import {inject} from 'aurelia-framework';

@inject(Pouch)
export default class Projects {
  heading = 'Projects';
  item_type = 'Project';
  projects = [];
  newProjectName = null;
  isEditing = false;
  isWarning = false;
  editingProject = null;

  constructor( pouch ) {
  	this.pouch = pouch;
  	this.init();
  }

  init() {
  	this.pouch.getProjects().then( projects => {
  		projects.forEach( p => {
  			this.projects.push( p.doc );
  		});
  	});
  }

  createProject( name ) {
  	this.pouch.createProject( name ).then( proj => {
  		let projExists = false;
  		this.projects.forEach( p => {
  			if( p._id === proj._id ) {
  				projExists = true;
  			}
  		});

  		if( projExists ) {
  			this.warn();
  		} else {
  			this.projects.push( proj );
  			this.newProjectName = null;
  		}

  	});
  }

  warn() {
    this.isWarning = true;
  }

  cancelWarn() {
    this.isWarning = false;
  }

  updateProject( project ) {
  	this.pouch.updateProject( project ).then( proj => {
  		this.editingProject = null;
  		this.isEditing = false;
  	});
  }

  editProject( project ) {
  	this.editingProject = project;
	this.isEditing = true;
  }

  cancelEdit() {
  	this.isEditing = false;
  	this.editingProject = null;
  }

  removeProject( project ) {
  	//let sure = window.confirm('Are you sure you want to delete this project?');
  	//if( sure ) {
	  	this.pouch.removeProject( project ).then( proj => {
	  		this.projects = this.projects.filter( p => {
	  			return p._id !== project._id;
	  		});
	  	});
  	//}
  }
}