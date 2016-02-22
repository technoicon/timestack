import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

@inject(EventAggregator)
export default class History {
  heading = 'History';
  selectedDay = Date.now();

  constructor(events) {
  	this.events = events;
  }
}