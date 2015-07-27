(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('devicesCtrl', Controller);


    /* @ngInject */
    function Controller(initData) {
        var vm = this;

        vm.data = initData;

        activate();

        ////////////////

        function activate() {
        	
        }
    }
})();