/*
 * Semantic logging service that passes messages both to
 * toastr (pop-up messages) and the console (via Angular's $log)
 */
(function(angular) {
    'use strict';

    angular.module( "dashboardApp" )
    .factory( 'logger', factory );

    /* @ngInject */
    function factory( $log,  $mdToast ) {
        return {
            error   : error,
            info    : info,
            success : success,
            warning : warning,

            // straight to console; bypass toast
            log     : $log.log
        };
        /////////////////////
        function error(message, title) {
            $mdToast.show(
              $mdToast.simple()
                .content(message)
                .theme("error-toast")
                .hideDelay(3000)
            );
            $log.error("Error: " + message);
        }

        function info(message, title) {
            $mdToast.show(
              $mdToast.simple()
                .content(message)
                .theme("info-toast")
                .hideDelay(3000)
            );
            $log.info("Info: " + message);
        }

        function success(message, title) {
            $mdToast.show(
              $mdToast.simple()
                .content(message)
                .theme("success-toast")
                .hideDelay(3000)
            );
            $log.info("Success: " + message);
        }

        function warning(message, title) {
            $mdToast.show(
              $mdToast.simple()
                .content(message)
                .theme("warning-toast")
                .hideDelay(3000)
            );
            $log.warn("Warning: " + message);
        }

    };

}( this.angular ));