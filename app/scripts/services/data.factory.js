(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .factory('DataService', DataService);

   

    /* @ngInject */
    function DataService($http, $location, logger) {
        var server = "http://localhost:8080/0";

        var service = {
            getLocations: getLocations,
            getLocation: getLocation,
            getDeviceStatus: getDeviceStatus,
            getClient: getClient,
            postClient: postClient,
            putClient: putClient,
            removeDevice: removeDevice
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

        function getDeviceStatus(deviceId){
            var myUrl = server + "/devices/"+deviceId+"/status";

            return $http({
                url: myUrl,
                method: 'GET'
              }).then(getDeviceStatusComplete)
                .catch(getDeviceStatusFailed);

            function getDeviceStatusComplete(response) {
                return response.data;
            }

            function getDeviceStatusFailed(response) {
                errorHanlder(response);
            }
        }

        function getClient(idClient){
            var myUrl = server + "/clients/" + idClient;

            return $http({
                url: myUrl,
                method: 'GET'
              }).then(getClientComplete)
                .catch(getClientFailed);

            function getClientComplete(response) {
                return response.data;
            }

            function getClientFailed(response) {
                errorHanlder(response);
            }
        }

        function postClient (client) {
            var myUrl = server + "/clients";

            var data = {
                name: client.username,
                description: client.description
            };

            return $http({
                url: myUrl,
                method: 'POST',
                data: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(postClientComplete)
                .catch(postClientFailed);
           
            function postClientComplete(response) {
                if(response.status === 201){
                    logger.success('Bienvenido!');
                }
                return response.data;
            }

            function postClientFailed(response) {
                if(response.status === 409){
                    logger.error('Ya existe un usuario con ese username.');
                }else{
                    errorHanlder(response);
                }
                
            }

        }

        function putClient (client) {
            var myUrl = server + "/clients/" + client.id;

            var data = {
                name: client.name,
                description: client.description
            };

            return $http({
                url: myUrl,
                method: 'PUT',
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(putClientComplete)
              .catch(putClientFailed);

            function putClientComplete (response) {
                logger.success('Modificado');
                return response.data;
            }
            function putClientFailed (response) {
                errorHanlder(response);
            }
        }

        function removeDevice (deviceId) {
            var myUrl = server + "/devices/" + deviceId;


            return $http({
                url: myUrl,
                method: 'DELETE'
            }).then(removeDeviceComplete)
              .catch(removeDeviceFailed);

            function removeDeviceComplete (response) {
                logger.success('Eliminado');
                return response.data;
            }
            function removeDeviceFailed (response) {
                errorHanlder(response);
            }
        }


        function errorHanlder(response){
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
