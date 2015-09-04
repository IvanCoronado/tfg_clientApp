(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('myLocationsCtrl', Controller);

    
    /* @ngInject */
    function Controller($mdDialog,$state, DataService, initLocations) {
        var vm = this;
        vm.locations = initLocations.locations;
        vm.addLocationPopup = addLocationPopup;
        vm.removeLocation = removeLocation;
        vm.updateLocation = updateLocation;
        ////////////////


        function addLocationPopup() {
            $mdDialog.show({
              controller: addLocationDialogController,
              controllerAs: 'vm',
              templateUrl: 'views/modal.addLocation.html',
              bindToController: true,
              clickOutsideToClose:true
            })
            .then(function(newLocation) {
               vm.locations.push(newLocation);
            }, function() {

            });
        }

        function removeLocation(locationId, index) {
            DataService.removeLocation(locationId).then(function(){
                vm.locations.splice(index, 1);
            });
        }

        function updateLocation(_locationId){
            $state.go('app.myDevices', { locationId: _locationId });
        }


    }


    /* @ngInject */
    function addLocationDialogController($mdDialog, DataService, userService) { 
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
            DataService.addLocation(userService.getId(), vm.location).then(function(response){
                if(typeof response !== 'undefined'){
                    $mdDialog.hide(response);
                }
            });
        }
    }//END createTeacherDialogController
})();

