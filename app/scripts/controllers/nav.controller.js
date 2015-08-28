(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('navCtrl', Controller);


    /* @ngInject */
    function Controller( $mdSidenav, $mdUtil) {
        var nav = this;

        nav.showMenu = buildToggler('left');

        nav.menu = 
        	[
	        	{
              id: 'locations',
	        		link : 'app.locations',
			      	title: 'Localizaciones',
			      	icon: 'fa fa-plug'
	        	},
	        	{
              id: 'map',
	        		link : 'app.map',
			      	title: 'Mapa',
			      	icon: 'fa fa-map-marker'
	        	},
            {
              id: 'registerLocation',
              link : 'app.registerLocation',
              title: 'Dar de alta localización',
              icon: 'fa fa-location-arrow'
            }
	        ];

        

        ////////////////
        /**
         * Build handler to open/close a SideNav; 
         */
        function buildToggler(navID) {
            var debounceFn =  $mdUtil.debounce(function(){
                $mdSidenav(navID)
                  .toggle();
              },300);
            return debounceFn;
        }
    }
})();