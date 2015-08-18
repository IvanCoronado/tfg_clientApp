(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('locationDetailCtrl', Controller);


    /* @ngInject */
    function Controller(initLocation) {
        var vm = this;
        
        vm.locationId = initLocation;
        console.log(initLocation);
        activate();

        ////////////////

        function activate() {
        	
        }
    }
})();