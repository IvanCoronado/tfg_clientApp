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
            
        };
        return service;

        ////////////////

        function getLocations(userId,areaNameId){
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


        function errorHanlder(data, calledFrom){
            if(response.status === 401){
                logger.error('No autorizado.');
            }else if(response.status === 400){
                logger.error('Parametros incorrectos.');
            }else{
                logger.error('Ups, algo falló en el servidor.');
            }     
        }

    }
})();
