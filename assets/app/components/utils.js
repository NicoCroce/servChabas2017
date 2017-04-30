(function () {
    'use strict'
    angular
        .module('servicios-chabas')
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