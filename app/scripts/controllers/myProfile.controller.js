(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('myProfileCtrl', Controller);

    
    /* @ngInject */
    function Controller() {
        var vm = this;
        vm.title = 'Controller';

        activate();

        ////////////////

        function activate() {
        }
    }
})();

