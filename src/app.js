export class App {
  configureRouter(config, router) {
    config.title = 'TimeStack';
    config.map([
      { 
      	route: ['', 'welcome'], 
      	name: 'welcome',
      	moduleId: 'pages/welcome/welcome', 
      	nav: true, 
      	title: 'Welcome' 
      },
      { 
      	route: ['track'], 
      	name: 'track',
      	moduleId: 'pages/track/track',
      	nav: true,
      	title: 'Track' 
      },
      { 
      	route: ['projects'],
      	name: 'projects',
      	moduleId: 'pages/projects/projects',
      	nav: true,
      	title: 'Projects'
      },
      { 
      	route: ['history'],
      	name: 'history',
      	moduleId: 'pages/history/history',
      	nav: true,
      	title: 'History'
      }
    ]);

    this.router = router;
  }
}
