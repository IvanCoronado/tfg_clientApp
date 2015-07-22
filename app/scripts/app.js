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
		var app = {
                name: 'app',
                abstract: true,
                templateUrl: 'views/app.layout.html'
            },
            all = {
                name: 'all',
                url: '/all',
                parent: app,
                templateUrl: 'views/app.dashboard.html',
                controller: 'dashboardCtrl as vm',
                resolve:{
			    	initData:  function(){
			            return {value: 'todos!'};
			         }
			    }
            },
            counters = {
                name: 'counters',
                url: '/counters',
                parent: app,
                templateUrl: 'views/app.dashboard.html',
                controller: 'dashboardCtrl as vm',
			    resolve:{
			    	initData:  function(){
			            return {value: 'solo contadores!'};
			         }
			    }
            },
            temperature = {
                name: 'temperature',
                url: '/temperature',
                parent: app,
                templateUrl: 'views/app.dashboard.html',
                controller: 'dashboardCtrl as vm',	       
		        resolve:{
			    	initData:  function(){
			            return {value: 'solo temperatura!'};
			         }
			    }
            };
    
        $stateProvider.state(app);
	        $stateProvider.state(all);
	        $stateProvider.state(counters);
	        $stateProvider.state(temperature);

		
	}

})();

