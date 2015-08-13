(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .factory('DataService', DataService);

   

    /* @ngInject */
    function DataService($http, $location, logger) {
        var server = "http://localhost:8080/0"

        var service = {
            getLocations: getLocations,
            getLocation: getLocation
        };
        return service;

        ////////////////

        function getLocations(){
            var myUrl = server + "/locations";

            return $http({
                url: myUrl,
                method: 'GET'
              }).then(getLocationsComplete)
                .catch(getLocationsFailed);

            function getLocationsComplete(response) {
                return response.data;
            }

            function getLocationsFailed(response) {
                errorHanlder(response);
            }
        }

        function getLocation(locationId){
            var myUrl = server + "/locations/"+locationId;

            return $http({
                url: myUrl,
                method: 'GET'
              }).then(getLocationComplete)
                .catch(getLocationFailed);

            function getLocationComplete(response) {
                return response.data;
            }

            function getLocationFailed(response) {
                errorHanlder(response);
            }
        }


        function errorHanlder(data, calledFrom){
            if(response.status === 401){
                logger.error('No autorizado.');
            }else if(response.status === 400){
                logger.error('Url incorrecta.');
            }else if(response.status === 404){
                logger.error('Parametro incorrecto.');
            }else{
                logger.error('Ups, algo falló en el servidor.');
            }     
        }

    }
})();
