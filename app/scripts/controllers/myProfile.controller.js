(function() {
    'use strict';

    angular
        .module('dashboardApp')
        .controller('myProfileCtrl', Controller);


    /* @ngInject */
    function Controller(initUser, userService) {
        var vm = this;
        vm.user = initUser;
        vm.updateUser = updateUser;

        function updateUser() {
            userService.updateData(vm.user);
        }

    }
})();
