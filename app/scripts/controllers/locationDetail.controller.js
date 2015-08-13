(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('locationDetailCtrl', Controller);


    /* @ngInject */
    function Controller(locationId) {
        var vm = this;
        console.log(locationId);
        vm.locationId = locationId;

        activate();

        ////////////////

        function activate() {
        	
        }
    }
})();