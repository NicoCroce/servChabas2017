(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('modalServicesController', modalServicesController);

    function modalServicesController($scope, factoryServices, $rootScope, modal) {

        $scope.modal = modal.getData();

        $scope.closeModal = function () {
            modal.closeModal();
        }
    }
})();