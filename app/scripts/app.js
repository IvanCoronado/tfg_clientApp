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
                    home={
                        name: 'app.home',
                        url: '/home',
                        parent: app,
                        templateUrl: 'views/app.home.html',
                        module: 'public'
                    },
                    locations = {
                        name: 'app.locations',
                        url: '/locations',
                        parent: app,
                        templateUrl: 'views/app.locations.html',
                        controller: 'locationsCtrl as vm',
                        module: 'public',
                        resolve:{initLocations:initLocations}
                    },
                    detail = {
                        name: 'app.detail',
                        url: '/locations/{locationId:[0-9]{1,4}}',
                        templateUrl: 'views/app.location.detail.html',
                        controller: 'locationDetailCtrl as vm',
                        module: 'public',
                        resolve:{
                          initLocation: getLocation
                       }
                    },
                    myProfile = {
                        name: 'app.myProfile',
                        url: '/myprofile',
                        parent: app,
                        templateUrl: 'views/app.myProfile.html',
                        controller: 'myProfileCtrl as vm',
                        module: 'private'
                    },
                    myLocations = {
                        name: 'app.myLocations',
                        url: '/myLocations',
                        parent: app,
                        module: 'private',
                        templateUrl: 'views/app.myLocations.html',
                        controller: 'myLocationsCtrl as vm'
                    };
    
        $stateProvider.state(app)
            .state(home)
	        .state(locations)
                .state(detail)
	        .state(myProfile)
            .state(myLocations);

		
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

