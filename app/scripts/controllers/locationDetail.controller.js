(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('locationDetailCtrl', Controller);


    /* @ngInject */
    function Controller(DataService, lodash, initLocation) {
        var vm = this;
        
        vm.locationId = initLocation;
        console.log(initLocation);
        vm.status = [];

        updateStatus();
        ////////////////

        function updateStatus() {
        	lodash.forEach(vm.locationId.devices, function(device) {
                DataService.getDeviceStatus(device.id).then(function(response){
                    vm.status.unshift(response);
                });
            });
        }
    }
})();