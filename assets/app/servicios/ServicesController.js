(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('ServicesController', ServicesController);

    function ServicesController($scope, factoryServices, $rootScope) {

        $scope.tableInstitutions;
        $scope.tableTaxi;
        $scope.fastFood;
        $scope.submitted = false;
        $scope.loadedService = false;
        $scope.modal = {
            direccion: '',
            horario: '',
            mapa: '',
            showModal: false
        };

        $scope.data = {
            name: '',
            address: '',
            days: '',
            tel: ''

        };

        $scope.setError = function(data){
            if (!$scope.submitted || data != '') { return; }
            console.log(data);
            console.log($scope.submitted);
            return { 'has-error': true };
        }

        $scope.submit = function() {
            return $scope.submitted = true;
        }

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
            $rootScope.loadingService = false;
            return;
        };

        function clickRow(row) {
            if (angular.isUndefinedOrNullOrEmpty(row) || !row.hasDetail) return;
            $scope.modal.showModal = true;
            $scope.modal.direccion = row.detail.direccion;
            $scope.modal.horario = row.detail.horario;
            $scope.modal.mapa = row.detail.mapa;
            $scope.modal.telefono = '(03464) ' + row.info[1];
        }
    }
})();