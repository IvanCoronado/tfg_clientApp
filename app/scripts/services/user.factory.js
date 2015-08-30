(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .factory('userService', factory);

    /* @ngInject */
    function factory(DataService) {
        var user = null;

        var service = {
            setUser: setUser,
            updateData: updateData,
            isLogged: isLogged,
            logout: logout,
            getUser: getUser
        };
        return service;

        ////////////////

        function setUser (client) {
           user = client;
        }

        function updateData(client){
            DataService.putClient(client).then(function(response){
                if(typeof response !== 'undefined'){
                    user = response;
                }
            });
            
        }
        function isLogged() {
            return user !== null;
        }

        function logout() {
            user = null;
        }

        function getUser(){
            return user;
        }


    }
})();
