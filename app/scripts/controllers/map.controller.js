(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('mapCtrl', Controller);

    
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

