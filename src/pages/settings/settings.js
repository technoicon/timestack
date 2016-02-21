import {Pouch} from 'services/pouch/pouch.js';
import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';

@inject(Pouch)
export class Settings {
	heading = 'Settings';
	projects = [];
	latest = false;

	/* Automatically start timer when creating a new task */
	@bindable auto_start = false;
	
	/* Default project to be associated with a new task */
	@bindable default_project = null;

	/* Remove related tasks when removing a project */
	@bindable remove_related = true;

	constructor( pouch ) {
		this.pouch = pouch;
	}

	activate() {
		this.init();
	}

	init() {
		this.pouch.getSettings().then( s => {
			if( s ) {
				this.mapSettingsFrom( s );
			} else {
				console.warn('Creating default settings');
				this.pouch.createSettings().then( s => {
					this.mapSettingsFrom( s );
				});
			}
		});

	  	this.pouch.getProjects().then( projects => {
	  		projects.forEach( p => {
	  			this.projects.push( p.doc );
	  		});
	  	});
	}

	setDefaultProject( project ) {
		this.default_project = project._id;
	}

	auto_startChanged() {
		this.updateSettings();
	}

	default_projectChanged() {
		this.updateSettings();
	}

	remove_relatedChanged() {
		this.updateSettings();
	}

	updateSettings() {
		if( !this.latest ) return;
		this.pouch.updateSettings( this.mapSettingsTo() ).then( result => {
			/* */
		});
	}

	mapSettingsTo() {
		return {
			auto_start: this.auto_start,
			default_project: this.default_project,
			remove_related: this.remove_related
		};
	}

	mapSettingsFrom( remote ) {
		this.auto_start = remote.auto_start;
		this.default_project = remote.default_project;
		this.remove_related = remote.remove_related;

		/* 
			hackish
			don't attemplte to update settings until we have the latest rev from pouch
		*/
		setTimeout( () => {
			this.latest = true;
		});
	}

}