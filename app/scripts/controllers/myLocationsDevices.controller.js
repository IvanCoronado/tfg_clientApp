(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('myLocationDevicesCtrl', Controller);


    /* @ngInject */
    function Controller($mdDialog, DataService, userService, initLocation) {
        var vm = this;
        
        vm.location = initLocation;
        vm.updateLocation = updateLocation;
        vm.removeDevice = removeDevice;
        vm.addDevice = addDevice;

        ////////////////////////////

        function updateLocation(){
            DataService.updateLocation(userService.getId(), vm.location).then(function(){

            });
        }

        function removeDevice(deviceId, $index){
            DataService.removeDevice(deviceId).then(function(){
                vm.location.devices.splice($index, 1);
            });
        }

        function addDevice() {
            $mdDialog.show({
              controller: addDeviceDialogController,
              controllerAs: 'vm',
              templateUrl: 'views/modal.addDevice.html',
              bindToController: true,
              clickOutsideToClose:true,
              locals  : {
                    locationId : vm.location.id
              }
            })
            .then(function(newDevice) {
                vm.location.devices.push(newDevice);
            }, function() {

            });
        }

    }

    /* @ngInject */
    function addDeviceDialogController($mdDialog, DataService, locationId) { 
        var vm = this; // jshint ignore:line

        vm.cancel = cancel;
        vm.answer = answer;

        ////////////////////////////
        /*
         * Cancelamos el modal (no devuelve nada al controlador)
         **/
        function cancel() {
            $mdDialog.cancel();
        }

        /*
         * Cerramos el modal y devolvemos al controlador la respuesta
         **/
        function answer() {
            DataService.addDevice(locationId, vm.device).then(function(response){
                if(typeof response !== 'undefined'){
                    $mdDialog.hide(response);
                }
            });
        }
    }//END createTeacherDialogController
})();