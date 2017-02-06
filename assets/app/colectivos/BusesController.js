(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('BusesController', BusesController);

    BusesController.$inject = ['$scope', 'factoryBus'];

    function BusesController($scope, factoryBus) {

        $scope.tableRosario;
        $scope.tableFirmat;
        $scope.loadedService = false;
        $scope.modal = {
            detail: '',
            showModal: false
        };
        
        $scope.clickRow = clickRow;

        factoryBus.getBuses()
            .then(busesSuccess)
            .catch(busesError)
            .finally(busesFinally);

        function busesSuccess(dataResponse) {
            $scope.tableRosario = factoryBus.getTable(dataResponse.rosario);
            $scope.tableFirmat = factoryBus.getTable(dataResponse.firmat);
            $scope.loadedService = true;
            return;
        };

        function busesError(dataError) {
            return;
        };

        function busesFinally(dataFinally) {
            return;
        };

        function clickRow(row){
            if (angular.isUndefinedOrNullOrEmpty(row) || !row.hasDetail) return;
            $scope.modal.showModal = true;
            $scope.modal.detail = row.detail;
        }
    }
})();