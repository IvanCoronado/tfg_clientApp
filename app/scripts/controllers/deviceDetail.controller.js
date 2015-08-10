(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('deviceDetailCtrl', Controller);


    /* @ngInject */
    function Controller(deviceId) {
        var vm = this;

        vm.deviceId = deviceId;

        activate();

        ////////////////

        function activate() {
        	
        }
    }
})();