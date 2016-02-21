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
              route: [''],
              name: 'landing',
              moduleId: 'pages/landing/landing',
              nav: false,
              title: 'Landing'
            }, {
              route: ['projects'],
              name: 'projects',
              moduleId: 'pages/projects/projects',
              nav: true,
              title: 'Projects'
            }, {
              route: ['track'],
              name: 'track',
              moduleId: 'pages/track/track',
              nav: true,
              title: 'Track'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7TUE4QmEsR0FBRzs7Ozs7Ozs7O0FBQUgsU0FBRztpQkFBSCxHQUFHO2dDQUFILEdBQUc7OztxQkFBSCxHQUFHOztpQkFDQyx5QkFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQzlCLGtCQUFNLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztBQUMzQixrQkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUNUO0FBQ0UsbUJBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUNYLGtCQUFJLEVBQUUsU0FBUztBQUNmLHNCQUFRLEVBQUUsdUJBQXVCO0FBQ2pDLGlCQUFHLEVBQUUsS0FBSztBQUNWLG1CQUFLLEVBQUUsU0FBUzthQUNqQixFQUNEO0FBQ0UsbUJBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUNuQixrQkFBSSxFQUFFLFVBQVU7QUFDaEIsc0JBQVEsRUFBRSx5QkFBeUI7QUFDbkMsaUJBQUcsRUFBRSxJQUFJO0FBQ1QsbUJBQUssRUFBRSxVQUFVO2FBQ2xCLEVBQ0Q7QUFDQyxtQkFBSyxFQUFFLENBQUMsT0FBTyxDQUFDO0FBQ2hCLGtCQUFJLEVBQUUsT0FBTztBQUNiLHNCQUFRLEVBQUUsbUJBQW1CO0FBQzdCLGlCQUFHLEVBQUUsSUFBSTtBQUNULG1CQUFLLEVBQUUsT0FBTzthQUNkLEVBQ0Q7QUFDQyxtQkFBSyxFQUFFLENBQUMsU0FBUyxDQUFDO0FBQ2xCLGtCQUFJLEVBQUUsU0FBUztBQUNmLHNCQUFRLEVBQUUsdUJBQXVCO0FBQ2pDLGlCQUFHLEVBQUUsSUFBSTtBQUNULG1CQUFLLEVBQUUsU0FBUzthQUNoQixFQUNEO0FBQ0UsbUJBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUNuQixrQkFBSSxFQUFFLFVBQVU7QUFDaEIsc0JBQVEsRUFBRSx5QkFBeUI7QUFDbkMsaUJBQUcsRUFBRSxJQUFJO0FBQ1QsbUJBQUssRUFBRSxVQUFVO2FBQ2xCLENBQ0YsQ0FBQyxDQUFDOztBQUVILGdCQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztXQUN0Qjs7O2VBMUNVLEdBQUciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcblxuYWN0aXZlIHRhc2tcbiAgd2l0aCBpbnRlcnZhbHMgZGlzcGxheVxuXG5waWUgY2hhcnQgYnkgdGFza1xucGllIGNoYXJ0IGJ5IHByb2plY3RcblxuY2hhcnRzIGJ5IGRheS93ZWVrL21vbnRoL2FsbCB0aW1lXG5cbnNldHRpbmdzXG4tIHN0YXJ0IHRhc2sgdXBvbiBjcmVhdGlvblxuLSBkZWZhdWx0IHByb2plY3Rcbi0gcmVtb3ZlIHRhc2tzIGFzc29jaWF0ZWQgd2l0aCBwcm9qZWN0IHdoZW4gcmVtb3ZpbmcgcHJvamVjdFxuXG4tIHByZXBvcHVsYXRlIGV4YW1wbGUgZGF0YVxuLSBjbGVhciBhbGwgZGF0YVxuXG5hbmFseXRpY3MgZm9yIGV2ZW50cyBhbmQgZXJyb3JzXG5cbnNwbGFzaCBpbnN0ZWFkIG9mIHdlbGNvbWUgcGFnZVxuXG5cblxuKyBjb21wbGV0ZWQgcHJvcGVydHkgb24gdGFza3NcbisgaWRzIHNob3VsZCBiZSBVVUlEc1xuKyBtYXAgZm9yIGludGVydmFscyB3aXRoIHV1aWRzIGZvciBlYWNoIHN0YXJ0L3N0b3Agc28gdGhleSBjYW4gYmUgZWRpdGVkXG5cbiovXG5cbmV4cG9ydCBjbGFzcyBBcHAge1xuICBjb25maWd1cmVSb3V0ZXIoY29uZmlnLCByb3V0ZXIpIHtcbiAgICBjb25maWcudGl0bGUgPSAnVGltZVN0YWNrJztcbiAgICBjb25maWcubWFwKFtcbiAgICAgIHtcbiAgICAgICAgcm91dGU6IFsnJ10sXG4gICAgICAgIG5hbWU6ICdsYW5kaW5nJyxcbiAgICAgICAgbW9kdWxlSWQ6ICdwYWdlcy9sYW5kaW5nL2xhbmRpbmcnLFxuICAgICAgICBuYXY6IGZhbHNlLFxuICAgICAgICB0aXRsZTogJ0xhbmRpbmcnXG4gICAgICB9LFxuICAgICAgeyBcbiAgICAgICAgcm91dGU6IFsncHJvamVjdHMnXSxcbiAgICAgICAgbmFtZTogJ3Byb2plY3RzJyxcbiAgICAgICAgbW9kdWxlSWQ6ICdwYWdlcy9wcm9qZWN0cy9wcm9qZWN0cycsXG4gICAgICAgIG5hdjogdHJ1ZSxcbiAgICAgICAgdGl0bGU6ICdQcm9qZWN0cydcbiAgICAgIH0sXG4gICAgICB7IFxuICAgICAgXHRyb3V0ZTogWyd0cmFjayddLCBcbiAgICAgIFx0bmFtZTogJ3RyYWNrJyxcbiAgICAgIFx0bW9kdWxlSWQ6ICdwYWdlcy90cmFjay90cmFjaycsXG4gICAgICBcdG5hdjogdHJ1ZSxcbiAgICAgIFx0dGl0bGU6ICdUcmFjaycgXG4gICAgICB9LFxuICAgICAgeyBcbiAgICAgIFx0cm91dGU6IFsnaGlzdG9yeSddLFxuICAgICAgXHRuYW1lOiAnaGlzdG9yeScsXG4gICAgICBcdG1vZHVsZUlkOiAncGFnZXMvaGlzdG9yeS9oaXN0b3J5JyxcbiAgICAgIFx0bmF2OiB0cnVlLFxuICAgICAgXHR0aXRsZTogJ0hpc3RvcnknXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICByb3V0ZTogWydzZXR0aW5ncyddLFxuICAgICAgICBuYW1lOiAnc2V0dGluZ3MnLFxuICAgICAgICBtb2R1bGVJZDogJ3BhZ2VzL3NldHRpbmdzL3NldHRpbmdzJyxcbiAgICAgICAgbmF2OiB0cnVlLFxuICAgICAgICB0aXRsZTogJ1NldHRpbmdzJ1xuICAgICAgfVxuICAgIF0pO1xuXG4gICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
