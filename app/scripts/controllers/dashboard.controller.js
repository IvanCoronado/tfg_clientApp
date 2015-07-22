(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('dashboardCtrl', Controller);


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