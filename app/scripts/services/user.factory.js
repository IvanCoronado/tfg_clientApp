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
            register: register,
            updateData: updateData,
            isLogged: isLogged,
            logout: logout,
            getUser: getUser
        };
        return service;

        ////////////////

        function login(idClient) {
            DataService.getClient(idClient).then(function(response){
                if(typeof response !== 'undefined'){
                    user = response;
                }
            });

            return isLogged();
        }

        function register (client) {
            DataService.postClient(client).then(function(response){
                if(typeof response !== 'undefined'){
                    user = response;
                }
            });

            return isLogged();
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
            console.log(user);
            return user;
        }


    }
})();
