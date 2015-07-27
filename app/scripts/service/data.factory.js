(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .factory('DataService', DataService);

   

    /* @ngInject */
    function DataService($http, $location, logger) {
            
        var service = {
            getMentions: getMentions,
            
        };
        return service;

        ////////////////
       
        function enableUserArea(userId,areaNameId){
            var myUrl = server + "/users/"+userId+"/areas/"+areaNameId;

            return $http({
                url: myUrl,
                method: 'PUT'
              }).then(enableUserAreaComplete)
                .catch(enableUserAreaFailed);

            function enableUserAreaComplete(response) {
                if(response.status == 200){
                    logger.success('Area habilitada.');
                }
                return response.data;
            }

            function enableUserAreaFailed(response) {
                if(response.status == 401){
                    logger.error('No autorizado.');
                }else if(response.status == 404){
                    logger.error('Parametros incorrectos.');
                }else if(response.status == 409){
                    logger.error('AreaID repetida o incorrecta.');
                }else{
                    logger.error('Ups, algo falló en el servidor.');
                }     
            }
        }



        function disableUserArea(userId,areaNameId){
            var myUrl = server + "/users/"+userId+"/areas/"+areaNameId;

            return $http({
                url: myUrl,
                method: 'DELETE'
              }).then(disableUserAreaComplete)
                .catch(disableUserAreaFailed);

            function disableUserAreaComplete(response) {
                if(response.status == 200){
                    logger.success('Area deshabilitada.');
                }
                return response.data;
            }

            function disableUserAreaFailed(response) {
                if(response.status == 401){
                    logger.error('No autorizado.');
                }else if(response.status == 404){
                    logger.error('Parametros incorrectos.');
                }else if(response.status == 409){
                    logger.error('AreaID repetida o incorrecta.');
                }else{
                    logger.error('Ups, algo falló en el servidor.');
                }     
            }
        }


        function errorHanlder(data, calledFrom){
            if (data.status === 0) {
                $location.path("/serverBusy");
            }else{
                logger.error('XHR Failed for '+calledFrom+'. #' + data.status + " " + data.statusText);
            }
        };

    }
})();
