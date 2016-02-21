import {customElement, bindable} from 'aurelia-framework';
import {Pouch} from 'services/pouch/pouch.js';
import {inject} from 'aurelia-framework';

@customElement('color-box')
@inject(Pouch)
export class ColorBox {
	@bindable project_id = null;
	@bindable project = null;

	constructor(pouch) {
		this.pouch = pouch;
	}

	activate() {
		this.setColor( this.project_id );
	}

	project_idChanged(newVal, oldVal) {
		this.setColor( newVal );
	}

	setColor( id ) {
		this.pouch.getProject( id ).then( result => {
			this.project = result;
		});
	}
}