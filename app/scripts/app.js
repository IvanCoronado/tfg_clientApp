(function() {
    'use strict';

    angular
        .module('dashboardApp', [
        	'ui.router',
            'ngMaterial'
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
                    detail = {
                        name: 'app.detail',
                        url: '/devices/{deviceId}',
                        templateUrl: 'views/app.devices.detail.html',
                        controller: 'deviceDetailCtrl as vm',
                        resolve:{
                          deviceId: getDeviceId
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
                .state(detail)
	        .state(map);

		
	}

    /* @ngInject */
    function getDeviceId($stateParams){
        return $stateParams.deviceId;
    }

})();

