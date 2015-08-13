(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('locationsCtrl', Controller);


    /* @ngInject */
    function Controller(initLocations) {
        var vm = this;
        console.log(initLocations);
        vm.locations = initLocations;


        activate();

        ////////////////

        function activate() {
        	
        }
    }
})();