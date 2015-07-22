(function() {
    'use strict';

    angular
        .module('dashboardApp', [
        	'ui.router',
            'ngMaterial'
        ])
        .config(config);

	/* @ngInject */
    function config($stateProvider, $urlRouterProvider) {
		//
		// For any unmatched url, redirect to /
		$urlRouterProvider.otherwise("/");
		//
		// Now set up the states
		$stateProvider
		    .state('dashboard', {
		      url: "/",
		      templateUrl: "views/dashboard.html"
		    });

	}

})();

