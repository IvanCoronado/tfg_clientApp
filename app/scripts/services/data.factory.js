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
            addLocation: addLocation,
            updateLocation: updateLocation,
            removeLocation: removeLocation,
            getDeviceStatus: getDeviceStatus,
            getClient: getClient,
            addClient: addClient,
            updateClient: updateClient,
            removeDevice: removeDevice,
            addDevice: addDevice
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

        function addClient (client) {
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
              }).then(addClientComplete)
                .catch(addClientFailed);
           
            function addClientComplete(response) {
                if(response.status === 201){
                    logger.success('Bienvenido!');
                }
                return response.data;
            }

            function addClientFailed(response) {
                if(response.status === 409){
                    logger.error('Ya existe un usuario con ese username.');
                }else{
                    errorHanlder(response);
                }
                
            }

        }

        function addLocation (clientId, location) {
            var myUrl = server + "/clients/" + clientId + "/locations";

            var data = {
                name: location.name,
                description: location.description,
                maxCapacity: location.max_capacity,
                latitude: location.latitude,
                longitude: location.longitude,
                address: location.address,
                city: location.city
            };

            return $http({
                url: myUrl,
                method: 'POST',
                data: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(addLocationComplete)
                .catch(addLocationFailed);
           
            function addLocationComplete(response) {
                if(response.status === 201){
                    logger.success('Localización creada!');
                }
                return response.data;
            }

            function addLocationFailed(response) {
                if(response.status === 409){
                    logger.error('Ya existe un usuario con ese username.');
                }else{
                    errorHanlder(response);
                }
                
            }

        }
        
        function updateLocation (clientId, location) {
            var myUrl = server + "/clients/" + clientId + "/locations/" + location.id;

            var data = {
                name: location.name,
                description: location.description,
                maxCapacity: location.max_capacity,
                latitude: location.latitude,
                longitude: location.longitude,
                address: location.address,
                city: location.city
            };

            console.log(JSON.stringify(data));

            return $http({
                url: myUrl,
                method: 'PUT',
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(updateLocationComplete)
              .catch(updateLocationFailed);

            function updateLocationComplete (response) {
                logger.success('Modificado');
                return response.data;
            }
            function updateLocationFailed (response) {
                errorHanlder(response);
            }
        }

        function updateClient (client) {
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
            }).then(updateClientComplete)
              .catch(updateClientFailed);

            function updateClientComplete (response) {
                logger.success('Modificado');
                return response.data;
            }
            function updateClientFailed (response) {
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

        function removeLocation (locationId) {
            var myUrl = server + "/locations/" + locationId;


            return $http({
                url: myUrl,
                method: 'DELETE'
            }).then(removeLocationComplete)
              .catch(removeLocationFailed);

            function removeLocationComplete (response) {
                logger.success('Eliminado');
                return response.data;
            }
            function removeLocationFailed (response) {
                errorHanlder(response);
            }
        }

        function addDevice(locationId, newDevice){
            var myUrl = server + "/locations/" + locationId + "/devices";

            var data = {
                name: newDevice.name,
                type: newDevice.type
            };

            return $http({
                url: myUrl,
                method: 'POST',
                data: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(addDeviceComplete)
                .catch(addDeviceFailed);
           
            function addDeviceComplete(response) {
                if(response.status === 201){
                    logger.success('Dispositivo creado!');
                }
                return response.data;
            }

            function addDeviceFailed(response) {
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
