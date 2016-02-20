import * as UUID from 'node-uuid';

export class Pouch {
	constructor() {
		this.db = null;

		this.init();
	}

	init() {
		//PouchDB.debug.enable('*');
		//PouchDB.debug.disable();

		this.db = new PouchDB('timestack');
		this.db.info().then( info => {
  			console.log('We have a database: ' + JSON.stringify(info));
		});
	}

	getUUID() {
		return UUID.v4();
	}

	createProject( name ) {
		return this.db.get('project-' + name).catch( err => {
		  	if (err.status === 404) {
		    	return {	
		      		_id: 'project-' + name,
		      		name: name,
		      		type: 'project'
		    	};
		  	} else {
		    	throw err;
		  	}
		}).then( projectDoc => {
		  	return this.db.put( projectDoc ).then( result => {
		  		return projectDoc;
		  	});
		}).catch( err => {
			console.error( err );
		  	return null;
		});
	}

	updateProject( project ) {
		return this.db.get('project-' + project.name).then( projectDoc => {
		  	return this.db.put( project ).then( result => {
		  		return project;
		  	});
		}).catch( err => {
			console.error( err );
		  	return null;
		});
	}

	removeProject( project ) {
		return this.db.get(project._id).then( doc => {
  			return this.db.remove(doc);
		});
	}

	getProjects() {
		return this.db.allDocs({include_docs: true}).then( result => {
			return result.rows.filter( row => {
				if( !row.doc.type ) {
					return false;
				} else {
					return row.doc.type === 'project';
				}
			});
		});
	}
}