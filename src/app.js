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
      	route: ['setup'],
      	name: 'setup',
      	moduleId: 'pages/setup/setup',
      	nav: true,
      	title: 'Setup'
      }
    ]);

    this.router = router;
  }
}
