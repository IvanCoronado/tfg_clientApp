(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('navCtrl', Controller);


    /* @ngInject */
    function Controller($scope, $mdSidenav, $mdUtil, userService) {
        var nav = this;

        $scope.$on('userLogged', function(event, data) { console.log("aqui!"); nav.someoneLogged = userService.isLogged(); });

        nav.showMenu = buildToggler('left');
        

        nav.menuPublic = [{
                id: 'home',
                link: 'app.home',
                title: 'Home',
                icon: 'fa fa-home'
            }, {
                id: 'locations',
                link: 'app.locations',
                title: 'Dispositivos',
                icon: 'fa fa-plug'
            }

        ];

        nav.menuPrivate = [{
            id: 'myProfile',
            link: 'app.myProfile',
            title: 'Mi perfil',
            icon: 'fa fa-user'
        }, {
            id: 'myLocations',
            link: 'app.myLocations',
            title: 'Mis localizaciones',
            icon: 'fa fa-map-marker'
        }];

        nav.menuAboutMe = [{
            id: 'linkedin',
            link: 'https://es.linkedin.com/pub/ivan-coronado-moreno/99/9b5/683',
            title: 'Linkedin',
            icon: 'fa fa-linkedin'
        }, {
            id: 'github',
            link: 'https://github.com/IvanCoronado',
            title: 'GitHub',
            icon: 'fa fa-github-alt'
        }];



        ////////////////
        /**
         * Build handler to open/close a SideNav; 
         */
        function buildToggler(navID) {
            var debounceFn = $mdUtil.debounce(function() {
                $mdSidenav(navID)
                    .toggle();
            }, 300);
            return debounceFn;
        }
    }
})();
