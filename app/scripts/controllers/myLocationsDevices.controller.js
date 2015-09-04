(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('myLocationDevicesCtrl', Controller);


    /* @ngInject */
    function Controller(initLocation) {
        var vm = this;
        
        vm.locationId = initLocation;
        console.log(initLocation);

    }
})();