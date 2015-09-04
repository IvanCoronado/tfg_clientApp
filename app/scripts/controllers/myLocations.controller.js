(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('myLocationsCtrl', Controller);

    
    /* @ngInject */
    function Controller($filter, initLocations) {
        var vm = this;
        vm.locations = initLocations.locations;
        console.log(initLocations);
        ////////////////


    }
})();

