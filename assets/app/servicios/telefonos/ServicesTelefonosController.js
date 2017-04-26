(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .controller('ServicesTelefonosController', ServicesTelefonosController);

    function ServicesTelefonosController($scope, modal, $state, $rootScope) {
        $rootScope.backSectionVisible = true;
        $rootScope.showNavBar = false;
    };
})();
