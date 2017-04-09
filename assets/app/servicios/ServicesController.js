(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('ServicesController', ServicesController);

    function ServicesController($scope, factoryServices, $rootScope, modal) {

        $scope.tableInstitutions;
        $scope.tableTaxi;
        $scope.fastFood;
        
        $scope.loadedService = false;

        $scope.modal = {
            direccion: '',
            horario: '',
            mapa: ''
        };

        $scope.clickRow = clickRow;
        $rootScope.loadingService = true;

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
            setTimeout(function () {
                $rootScope.loadingService = false;
                $scope.$apply();
            }, 500);
        };

        function clickRow(row) {
            if (angular.isUndefinedOrNullOrEmpty(row) || !row.hasDetail) return;
            $scope.modal.direccion = row.detail.direccion;
            $scope.modal.horario = row.detail.horario;
            $scope.modal.mapa = row.detail.mapa;
            $scope.modal.telefono = '(03464) ' + row.info[1];
            modal.setData($scope.modal);
            modal.showModal('../templates/servicios/modalService.html');
        }

        $scope.showModal = function() {
            modal.showModal('../templates/servicios/addService.html');
        }
    }
})();