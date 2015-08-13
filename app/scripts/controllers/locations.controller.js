(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('locationsCtrl', Controller);


    /* @ngInject */
    function Controller(initLocations) {
        var vm = this;
        
        vm.locations = initLocations;


        activate();

        ////////////////

        function activate() {
        	
        }
    }
})();