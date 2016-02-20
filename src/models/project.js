
export class Project {
	name = null;
	desc = null;
	tasks = [];

	constructor() {

	}

	addTask( task ) {
		this.tasks.push( task );
	}

	removeTask( task ) {

	}
}