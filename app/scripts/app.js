(function() {
    'use strict';

    angular
        .module('dashboardApp', [
        	'ui.router',
            'ngMaterial',
            'gridshore.c3js.chart',
            'ngLodash'
        ])
        .config(config)
        .run(run);

    /* @ngInject */
    function run($rootScope) {
      $rootScope.$on("$stateChangeError", console.log.bind(console));
    }

	/* @ngInject */
    function config($stateProvider, $urlRouterProvider, $mdThemingProvider) {
		//
        // Select color theme
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('amber');

      

        //
		// For any unmatched url, redirect to /
		$urlRouterProvider.otherwise("/locations");

		//
		// Now set up the states
		var app = {
                name: 'app',
                abstract: true,
                templateUrl: 'views/layout.app.html'
            },
                    locations = {
                        name: 'app.locations',
                        url: '/locations',
                        parent: app,
                        templateUrl: 'views/app.locations.html',
                        controller: 'locationsCtrl as vm',
                        resolve:{initLocations:initLocations}
                    },
                    detail = {
                        name: 'app.detail',
                        url: '/locations/{locationId:[0-9]{1,4}}',
                        templateUrl: 'views/app.location.detail.html',
                        controller: 'locationDetailCtrl as vm',
                        resolve:{
                          initLocation: getLocation
                       }
                    },
                    map = {
                        name: 'app.map',
                        url: '/map',
                        parent: app,
                        templateUrl: 'views/app.map.html',
                        controller: 'mapCtrl as vm'
                    },
                    registerLocation = {
                        name: 'app.registerLocation',
                        url: '/registerLocation',
                        parent: app,
                        templateUrl: 'views/app.registerLocation.html',
                        controller: 'registerLocationCtrl as vm'
                    };
    
        $stateProvider.state(app)
	        .state(locations)
                .state(detail)
	        .state(map)
            .state(registerLocation);

		
	}

    /* @ngInject */
    function initLocations(DataService){
        return DataService.getLocations();
    }

    /* @ngInject */
    function getLocation(DataService, $stateParams){
        return DataService.getLocation($stateParams.locationId);
    }

})();

