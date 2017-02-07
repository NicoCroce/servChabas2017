(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('ServicesController', ServicesController);

    ServicesController.$inject = ['$scope', 'factoryServices'];

    function ServicesController($scope, factoryServices) {

        $scope.tableInstitutions;
        $scope.tableTaxi;
        $scope.fastFood;
        $scope.loadedService = false;
        $scope.modal = {
            direccion: '',
            horario: '',
            mapa: '',
            showModal: false
        };

        $scope.clickRow = clickRow;

        factoryServices.getServices()
            .then(servicesSuccess)
            .catch(servicesError)
            .finally(servicesFinally);

        function servicesSuccess(dataResponse) {
            $scope.tableInstitutions = factoryServices.getTable(dataResponse.instituciones);
            $scope.tableTaxi = factoryServices.getTable(dataResponse.remises);
            $scope.fastFood = factoryServices.getTable(dataResponse.rotiserias);
            $scope.loadedService = true;
            return;
        };

        function servicesError(dataError) {
            return;
        };

        function servicesFinally(dataFinally) {
            return;
        };

        function clickRow(row) {
            if (angular.isUndefinedOrNullOrEmpty(row) || !row.hasDetail) return;
            $scope.modal.showModal = true;
            $scope.modal.direccion = row.detail.direccion;
            $scope.modal.horario = row.detail.horario;
            $scope.modal.mapa = row.detail.mapa;
            $scope.modal.telefono = row.info[1];
        }
    }
})();