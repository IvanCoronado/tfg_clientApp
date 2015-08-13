(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('locationDetailCtrl', Controller);


    /* @ngInject */
    function Controller(locationId) {
        var vm = this;

        vm.locationId = locationId;

        activate();

        ////////////////

        function activate() {
        	
        }
    }
})();