(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('myLocationDevicesCtrl', Controller);


    /* @ngInject */
    function Controller(DataService, initLocation) {
        var vm = this;
        
        vm.locationId = initLocation;
        vm.removeDevice = removeDevice;

        

        function removeDevice(deviceId, $index){
            DataService.removeDevice(deviceId).then(function(){
                vm.locationId.devices.splice($index, 1);
            });
        }

    }
})();