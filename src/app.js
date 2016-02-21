/*

active task
  with intervals display

pie chart by task
pie chart by project

charts by day/week/month/all time

settings
- start task upon creation
- default project
- remove tasks associated with project when removing project

- prepopulate example data
- clear all data

analytics for events and errors

splash instead of welcome page



+ completed property on tasks
+ ids should be UUIDs
+ map for intervals with uuids for each start/stop so they can be edited

*/

export class App {
  configureRouter(config, router) {
    config.title = 'TimeStack';
    config.map([
      {
        route: [''],
        name: 'landing',
        moduleId: 'pages/landing/landing',
        nav: false,
        title: 'Landing'
      },
      { 
        route: ['projects'],
        name: 'projects',
        moduleId: 'pages/projects/projects',
        nav: true,
        title: 'Projects'
      },
      { 
      	route: ['track'], 
      	name: 'track',
      	moduleId: 'pages/track/track',
      	nav: true,
      	title: 'Track' 
      },
      { 
      	route: ['history'],
      	name: 'history',
      	moduleId: 'pages/history/history',
      	nav: true,
      	title: 'History'
      },
      {
        route: ['settings'],
        name: 'settings',
        moduleId: 'pages/settings/settings',
        nav: true,
        title: 'Settings'
      }
    ]);

    this.router = router;
  }
}
