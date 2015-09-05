(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('locationDetailCtrl', Controller);


    /* @ngInject */
    function Controller(DataService, lodash, initLocation) {
        var vm = this;

        vm.locationId = initLocation;

        vm.countId = null;
        vm.temperatureId = null;
        vm.humidityId = null;

        initCountersId();


        ////////////////
        function initCountersId() {
            lodash.forEach(vm.locationId.devices, function(device) {
                switch (device.type_name) {
                    case 'COUNTER':
                        vm.countId = device.id;
                        getCounterData();
                        break;
                    case 'TEMPERATURE':
                        vm.temperatureId = device.id
                        getTemperatureData();
                        break;
                    case 'HUMIDITY':
                        vm.humidityId = device.id
                        getHumidityData();
                        break;
                    default:

                }
            });
        }

        function getCounterData() {
            DataService.getDeviceStatus(vm.countId, 'count').then(function(response){
                if(typeof response !== 'undefined'){
                    vm.counterStatus = lodash.first(response.devices);
                }
            });
        }

        function getTemperatureData() {
            DataService.getDeviceStatus(vm.temperatureId, 'unique').then(function(response){
                if(typeof response !== 'undefined'){
                    vm.temperatureStatus = lodash.first(response.devices);
                }
            });
        }

        function getHumidityData() {
            DataService.getDeviceStatus(vm.humidityId, 'unique').then(function(response){
                if(typeof response !== 'undefined'){
                    vm.humidityStatus = lodash.first(response.devices);
                }
            });
        }

    }
})();
