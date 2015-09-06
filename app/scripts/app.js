(function() {
    'use strict';

    angular
        .module('dashboardApp', [
            'ui.router',
            'ngMaterial',
            'gridshore.c3js.chart',
            'ngLodash',
            'ngMessages',
            'ngCanvasGauge'
        ])
        .config(config)
        .run(security);

    /* @ngInject */
    function security($rootScope, userService, $http, $templateCache) {
        $rootScope.$on("$stateChangeError", console.log.bind(console));

        $rootScope.$on('$stateChangeStart', function(e, toState) {
            var stateIsPrivate = toState.module === 'private';

            if (stateIsPrivate) {
                var userIsLogged = userService.isLogged();

                if (!userIsLogged) {
                    e.preventDefault(); //Cancela la accion
                }
            }

        });

        $http.get('views/formMessages.html')
            .then(function(response) {
                $templateCache.put('form-messages', response.data);
            });
    }

    /* @ngInject */
    function config($stateProvider, $urlRouterProvider, $mdThemingProvider) {
        //
        // Select color theme
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('amber');



        //
        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise("/home");

        //
        // Now set up the states
        var app = {
                name: 'app',
                abstract: true,
                templateUrl: 'views/layout.app.html'
            },
            home = {
                name: 'app.home',
                url: '/home',
                parent: app,
                templateUrl: 'views/app.home.html',
                module: 'public'
            },
            modalLogin = {
                name: 'app.modalLogin',
                url: '^',
                onEnter: loginModalCall
            },
            modalRegister = {
                name: 'app.modalRegister',
                url: '^',
                onEnter: registerModalCall
            },
            locations = {
                name: 'app.locations',
                url: '/locations',
                parent: app,
                templateUrl: 'views/app.locations.html',
                controller: 'locationsCtrl as vm',
                module: 'public',
                resolve: {
                    initLocations: initLocations
                }
            },
            detail = {
                name: 'app.detail',
                url: '/locations/{locationId:[0-9]{1,4}}',
                templateUrl: 'views/app.location.detail.html',
                controller: 'locationDetailCtrl as vm',
                module: 'public',
                resolve: {
                    initLocation: getLocation
                }
            },
            myProfile = {
                name: 'app.myProfile',
                url: '/myprofile',
                parent: app,
                templateUrl: 'views/app.myProfile.html',
                controller: 'myProfileCtrl as vm',
                module: 'private',
                resolve: {
                    initUser: initUser
                }
            },
            myLocations = {
                name: 'app.myLocations',
                url: '/myLocations',
                parent: app,
                module: 'private',
                templateUrl: 'views/app.myLocations.html',
                controller: 'myLocationsCtrl as vm',
                resolve: {
                    initLocations: initMyLocations
                }
            },
            myDevices = {
                name: 'app.myDevices',
                url: '/myLocations/{locationId:[0-9]{1,4}}',
                templateUrl: 'views/app.myLocation.devices.html',
                controller: 'myLocationDevicesCtrl as vm',
                module: 'private',
                resolve: {
                    initLocation: getLocation
                }
            };

        $stateProvider
            .state(modalLogin)
            .state(modalRegister)
            .state(app)
            .state(home)
            .state(locations)
            .state(detail)
            .state(myProfile)
            .state(myLocations)
            .state(myDevices);

        /* TODO: Asignar colores de toasts desde aqui en lugar de desde el CSS.
         *      Hay un bug en el componente y no se puede hacer actualmente,
         *      poniendo esto evitamos que nos de warning de que no existe el tema.
         **/
        $mdThemingProvider.theme('error-toast');
        $mdThemingProvider.theme('info-toast');
        $mdThemingProvider.theme('success-toast');
        $mdThemingProvider.theme('warning-toast');

    }

    /* @ngInject */
    function loginModalCall($mdDialog) {
        $mdDialog.show({
                controller: loginCtrl,
                controllerAs: 'vm',
                templateUrl: 'views/modal.login.html',
                bindToController: true
            })
            .then(function() {

            });

        /* @ngInject */
        function loginCtrl($rootScope, $mdDialog, userService, DataService) {
            var vm = this; // jshint ignore:line

            vm.user = {};
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
                DataService.getClient(vm.user.username).then(function(response){
                    if(typeof response !== 'undefined'){
                        userService.setUser(response);
                        $rootScope.$broadcast('userLogged', true);
                        $mdDialog.hide();
                    }
                });
            }
        } //END loginCtrl
    }

    /* @ngInject */
    function registerModalCall($mdDialog) {
        $mdDialog.show({
                controller: registerCtrl,
                controllerAs: 'vm',
                templateUrl: 'views/modal.register.html',
                bindToController: true
            })
            .then(function() {

            });

        /* @ngInject */
        function registerCtrl($rootScope, $mdDialog, userService, DataService) {
            var vm = this; // jshint ignore:line

            vm.user = {};
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
                DataService.addClient(vm.user).then(function(response){
                    if(typeof response !== 'undefined'){
                        userService.setUser(response);
                        $rootScope.$broadcast('userLogged', true);
                        $mdDialog.hide();
                    }
                });
            }
        } //END registerCtrl
    }

    /* @ngInject */
    function initLocations(DataService) {
        return DataService.getLocations();
    }

    /* @ngInject */
    function initMyLocations(DataService, userService) {
        return DataService.getClient(userService.getId());
    }
    

    /* @ngInject */
    function getLocation(DataService, $stateParams) {
        return DataService.getLocation($stateParams.locationId);
    }

    /* @ngInject */
    function initUser(userService) {
        return userService.getUser();
    }

})();
