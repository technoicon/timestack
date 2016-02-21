import {customElement, bindable} from 'aurelia-framework';

@customElement('task-interval')
export class TaskInterval {
	@bindable interval = null;

	constructor() {

	}

	activate() {
		this.init();
	}

	init() {

	}
}