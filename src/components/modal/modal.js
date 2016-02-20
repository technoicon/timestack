import {customElement, bindable} from 'aurelia-framework';

@customElement('modal')
export class Modal {
	@bindable visible;

	constructor() {

	}

	hide() {
		this.visible = false;
	}

	show() {
		this.visible = true;
	}
}