(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('modalBusCrontroller', modalBusCrontroller);

    function modalBusCrontroller($scope, factoryServices, $rootScope, modal) {

        $scope.modal = modal.getData();
        
        $scope.closeModal = function() {
            modal.closeModal();
        }
    }
})();