(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .factory('userService', factory);

    /* @ngInject */
    function factory(DataService) {
        var user = null;

        var service = {
            login: login,
            isLogged: isLogged,
            logout: logout
        };
        return service;

        ////////////////

        function login(idClient) {
            DataService.getClient(idClient).then(function(response){
                if(typeof response !== 'undefined'){
                    user = response;
                }
            });

            return isLogged() ? true : false;
        }

        function isLogged() {
            return user !== null;
        }

        function logout() {
            user = null;
        }


    }
})();
