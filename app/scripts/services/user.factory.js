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
            getUser: getUser,
            getId: getId
        };
        return service;

        ////////////////

        function setUser (client) {
           user = client;
        }

        function updateData(client){
            DataService.updateClient(client).then(function(response){
                if(typeof response !== 'undefined'){
                    user = response;
                }
            });
            
        }
        function getId() {
            return user.id;
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
