import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {Pouch} from 'services/pouch/pouch.js';

@inject(Pouch,EventAggregator)
export default class History {
  heading = 'History';
  selectedDay = Date.now();
  dayTasks = null;

  constructor(pouch,events) {
  	this.pouch = pouch;
  	this.events = events;
  }

  activate() {
  	this.init();
  }

  init() {

  }

  getTotalTime( task, includeRunning ) {
    let ret = 0;
    let runningInterval = 0;

    try {
      runningInterval = this.timers[task._id].seconds;
    } catch(ex) {/* shhh...i'm in a hurry */}

    let previousIntervals = 0;

    if( task.intervals ) {
      task.intervals.forEach( i => {
        if( i.start && i.stop ) {
          previousIntervals += Math.floor((i.stop - i.start) / 1000);
        }
      });
    }

    if( includeRunning ) {
      return previousIntervals + runningInterval;
    } else {
      return previousIntervals;  
    }
  }
}