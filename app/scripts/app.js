(function() {
    'use strict';

    angular
        .module('dashboardApp', [
        	'ui.router',
            'ngMaterial'
        ])
        .config(config);

	/* @ngInject */
    function config($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {
		//
        // Select color theme
        $mdThemingProvider.theme('default')
            .primaryPalette('red')
            .accentPalette('orange');

        //    
        // Specify a font-icon style alias
        $mdIconProvider.fontSet('fa', 'fontawesome');

        //
		// For any unmatched url, redirect to /
		$urlRouterProvider.otherwise("/devices");

		//
		// Now set up the states
		var app = {
                name: 'app',
                abstract: true,
                templateUrl: 'views/layout.app.html'
            },
                    devices = {
                        name: 'app.devices',
                        url: '/devices',
                        parent: app,
                        templateUrl: 'views/app.devices.html',
                        controller: 'devicesCtrl as vm',
                        resolve:{
        			    	initData:  function(){
        			            return {value: 'todos!'};
        			         }
        			    }
                    },
                    map = {
                        name: 'app.map',
                        url: '/map',
                        parent: app,
                        templateUrl: 'views/app.map.html',
                        controller: 'mapCtrl as vm'
                    };
    
        $stateProvider.state(app)
	        .state(devices)
	        .state(map);

		
	}

})();

