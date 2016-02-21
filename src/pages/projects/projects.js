import {Pouch} from 'services/pouch/pouch.js';
import {inject} from 'aurelia-framework';
import * as Please from 'pleasejs';

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
  }

  activate() {
    this.init();
  }

  init() {
    Promise.all( [this.pouch.getProjects(), this.pouch.getTasks()] )
      .then( (result) => {
        result[0].forEach( p => {
          p.doc.num_tasks = 0;
          this.projects.push( p.doc );
        });

        result[1].forEach( t => {
          this.incrementTaskCounter( t.doc );
        });
      });
  }

  incrementTaskCounter( task ) {
    for( let i=0; i<this.projects.length; i++ ) {
      if( this.projects[i]._id === task.project_id ) {
        this.projects[i].num_tasks += 1;
        break;
      }
    }
  }

  createProject( name ) {
    if( !name ) return;

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

  updateColor( project ) {
    project.color = Please.make_color()[0];
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