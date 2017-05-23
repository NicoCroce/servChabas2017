(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('BusesMainController', BusesMainController);

    function BusesMainController($scope, factoryBus, $rootScope, services) {

       /* modal.setModal('templates/colectivos/modalBus.html', 'modalColectivos');*/

        $scope.tableRosario;
        $scope.tableFirmat;
        $scope.allBuses = {};

        services.getBuses(setData);

        function setData(data) {
            $scope.allBuses = data.allBuses;
        }

        $scope.map = {
            show: false
        };
        $scope.modal = {
            detail: '',
            showModal: false
        };

        $scope.openModal = function(bus){
            if (angular.isUndefinedOrNullOrEmpty(bus) || angular.isUndefinedOrNullOrEmpty(bus.detalle)) return;
            $scope.modal.data = bus;
            $scope.modal.showModal = true;
            $rootScope.modalIsOpen = true;
        };

        $scope.closeModal = function() {
            $scope.modal.showModal = false;
            $rootScope.modalIsOpen = false;
        }
    }
})();