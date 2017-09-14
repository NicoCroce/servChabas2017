(function () {
    'use strict'
    angular
        .module('chabasHoy')
        .factory('utilsComponents', utilsComponents);

    function utilsComponents($rootScope, $state, $stateParams) {
        return {
            showBack: showBack
        }

        function showBack() {
            return $stateParams.back == 1;
        };
    };
})();