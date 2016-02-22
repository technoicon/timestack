import {customElement, bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@customElement('pikaday')
@inject(Element, EventAggregator)
export class PikadayThing {
	@bindable day;

	constructor(element, events) {
		this.element = element;
		this.events = events;
	}

	attached() {
		let el = this.element.querySelector("input[type=text]");

		if( el ) {
			this.pik = new Pikaday({
				field: el,
				onSelect: (date) => {
					this.selectDate( date );
				}
			});
		}
	}

	selectDate( date ) {
		this.day = date.getTime();
		this.events.publish('time-update-charts', this.day);
	}
}