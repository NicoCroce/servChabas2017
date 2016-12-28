(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('BusesController', BusesController);

    BusesController.$inject = ['$scope', 'factoryBus'];

    function BusesController($scope, factoryBus) {

        $scope.tableRosario;
        $scope.loadedService = false;

        factoryBus.getBuses()
            .then(busesSuccess)
            .catch(busesError)
            .finally(busesFinally);

        function busesSuccess(dataResponse) {
            $scope.tableRosario = factoryBus.getTable(dataResponse.rosario);
            $scope.loadedService = true;
            return;
        };

        function busesError(dataError) {
            return;
        };

        function busesFinally(dataFinally) {
            return;
        };
    }
})();