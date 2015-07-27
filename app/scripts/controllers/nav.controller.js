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
              id: 'devices',
	        		link : 'app.devices',
			      	title: 'Dispositivos',
			      	icon: 'fa fa-plug'
	        	},
	        	{
              id: 'map',
	        		link : 'app.map',
			      	title: 'Mapa',
			      	icon: 'fa fa-map-marker'
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