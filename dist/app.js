System.register([], function (_export) {
  'use strict';

  var App;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      App = (function () {
        function App() {
          _classCallCheck(this, App);
        }

        _createClass(App, [{
          key: 'configureRouter',
          value: function configureRouter(config, router) {
            config.title = 'TimeStack';
            config.map([{
              route: ['', 'welcome'],
              name: 'welcome',
              moduleId: 'pages/welcome/welcome',
              nav: true,
              title: 'Welcome'
            }, {
              route: ['track'],
              name: 'track',
              moduleId: 'pages/track/track',
              nav: true,
              title: 'Track'
            }, {
              route: ['projects'],
              name: 'projects',
              moduleId: 'pages/projects/projects',
              nav: true,
              title: 'Projects'
            }, {
              route: ['history'],
              name: 'history',
              moduleId: 'pages/history/history',
              nav: true,
              title: 'History'
            }, {
              route: ['settings'],
              name: 'settings',
              moduleId: 'pages/settings/settings',
              nav: true,
              title: 'Settings'
            }]);

            this.router = router;
          }
        }]);

        return App;
      })();

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7TUE4QmEsR0FBRzs7Ozs7Ozs7O0FBQUgsU0FBRztpQkFBSCxHQUFHO2dDQUFILEdBQUc7OztxQkFBSCxHQUFHOztpQkFDQyx5QkFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQzlCLGtCQUFNLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztBQUMzQixrQkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUNUO0FBQ0MsbUJBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUM7QUFDdEIsa0JBQUksRUFBRSxTQUFTO0FBQ2Ysc0JBQVEsRUFBRSx1QkFBdUI7QUFDakMsaUJBQUcsRUFBRSxJQUFJO0FBQ1QsbUJBQUssRUFBRSxTQUFTO2FBQ2hCLEVBQ0Q7QUFDQyxtQkFBSyxFQUFFLENBQUMsT0FBTyxDQUFDO0FBQ2hCLGtCQUFJLEVBQUUsT0FBTztBQUNiLHNCQUFRLEVBQUUsbUJBQW1CO0FBQzdCLGlCQUFHLEVBQUUsSUFBSTtBQUNULG1CQUFLLEVBQUUsT0FBTzthQUNkLEVBQ0Q7QUFDQyxtQkFBSyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBQ25CLGtCQUFJLEVBQUUsVUFBVTtBQUNoQixzQkFBUSxFQUFFLHlCQUF5QjtBQUNuQyxpQkFBRyxFQUFFLElBQUk7QUFDVCxtQkFBSyxFQUFFLFVBQVU7YUFDakIsRUFDRDtBQUNDLG1CQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUM7QUFDbEIsa0JBQUksRUFBRSxTQUFTO0FBQ2Ysc0JBQVEsRUFBRSx1QkFBdUI7QUFDakMsaUJBQUcsRUFBRSxJQUFJO0FBQ1QsbUJBQUssRUFBRSxTQUFTO2FBQ2hCLEVBQ0Q7QUFDRSxtQkFBSyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBQ25CLGtCQUFJLEVBQUUsVUFBVTtBQUNoQixzQkFBUSxFQUFFLHlCQUF5QjtBQUNuQyxpQkFBRyxFQUFFLElBQUk7QUFDVCxtQkFBSyxFQUFFLFVBQVU7YUFDbEIsQ0FDRixDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1dBQ3RCOzs7ZUExQ1UsR0FBRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuXG5hY3RpdmUgdGFza1xuICB3aXRoIGludGVydmFscyBkaXNwbGF5XG5cbnBpZSBjaGFydCBieSB0YXNrXG5waWUgY2hhcnQgYnkgcHJvamVjdFxuXG5jaGFydHMgYnkgZGF5L3dlZWsvbW9udGgvYWxsIHRpbWVcblxuc2V0dGluZ3Ncbi0gc3RhcnQgdGFzayB1cG9uIGNyZWF0aW9uXG4tIGRlZmF1bHQgcHJvamVjdFxuLSByZW1vdmUgdGFza3MgYXNzb2NpYXRlZCB3aXRoIHByb2plY3Qgd2hlbiByZW1vdmluZyBwcm9qZWN0XG5cbi0gcHJlcG9wdWxhdGUgZXhhbXBsZSBkYXRhXG4tIGNsZWFyIGFsbCBkYXRhXG5cbmFuYWx5dGljcyBmb3IgZXZlbnRzIGFuZCBlcnJvcnNcblxuc3BsYXNoIGluc3RlYWQgb2Ygd2VsY29tZSBwYWdlXG5cblxuXG4rIGNvbXBsZXRlZCBwcm9wZXJ0eSBvbiB0YXNrc1xuKyBpZHMgc2hvdWxkIGJlIFVVSURzXG4rIG1hcCBmb3IgaW50ZXJ2YWxzIHdpdGggdXVpZHMgZm9yIGVhY2ggc3RhcnQvc3RvcCBzbyB0aGV5IGNhbiBiZSBlZGl0ZWRcblxuKi9cblxuZXhwb3J0IGNsYXNzIEFwcCB7XG4gIGNvbmZpZ3VyZVJvdXRlcihjb25maWcsIHJvdXRlcikge1xuICAgIGNvbmZpZy50aXRsZSA9ICdUaW1lU3RhY2snO1xuICAgIGNvbmZpZy5tYXAoW1xuICAgICAgeyBcbiAgICAgIFx0cm91dGU6IFsnJywgJ3dlbGNvbWUnXSwgXG4gICAgICBcdG5hbWU6ICd3ZWxjb21lJyxcbiAgICAgIFx0bW9kdWxlSWQ6ICdwYWdlcy93ZWxjb21lL3dlbGNvbWUnLCBcbiAgICAgIFx0bmF2OiB0cnVlLCBcbiAgICAgIFx0dGl0bGU6ICdXZWxjb21lJyBcbiAgICAgIH0sXG4gICAgICB7IFxuICAgICAgXHRyb3V0ZTogWyd0cmFjayddLCBcbiAgICAgIFx0bmFtZTogJ3RyYWNrJyxcbiAgICAgIFx0bW9kdWxlSWQ6ICdwYWdlcy90cmFjay90cmFjaycsXG4gICAgICBcdG5hdjogdHJ1ZSxcbiAgICAgIFx0dGl0bGU6ICdUcmFjaycgXG4gICAgICB9LFxuICAgICAgeyBcbiAgICAgIFx0cm91dGU6IFsncHJvamVjdHMnXSxcbiAgICAgIFx0bmFtZTogJ3Byb2plY3RzJyxcbiAgICAgIFx0bW9kdWxlSWQ6ICdwYWdlcy9wcm9qZWN0cy9wcm9qZWN0cycsXG4gICAgICBcdG5hdjogdHJ1ZSxcbiAgICAgIFx0dGl0bGU6ICdQcm9qZWN0cydcbiAgICAgIH0sXG4gICAgICB7IFxuICAgICAgXHRyb3V0ZTogWydoaXN0b3J5J10sXG4gICAgICBcdG5hbWU6ICdoaXN0b3J5JyxcbiAgICAgIFx0bW9kdWxlSWQ6ICdwYWdlcy9oaXN0b3J5L2hpc3RvcnknLFxuICAgICAgXHRuYXY6IHRydWUsXG4gICAgICBcdHRpdGxlOiAnSGlzdG9yeSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJvdXRlOiBbJ3NldHRpbmdzJ10sXG4gICAgICAgIG5hbWU6ICdzZXR0aW5ncycsXG4gICAgICAgIG1vZHVsZUlkOiAncGFnZXMvc2V0dGluZ3Mvc2V0dGluZ3MnLFxuICAgICAgICBuYXY6IHRydWUsXG4gICAgICAgIHRpdGxlOiAnU2V0dGluZ3MnXG4gICAgICB9XG4gICAgXSk7XG5cbiAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
