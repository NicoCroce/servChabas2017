(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('BusesMainController', BusesMainController);

    function BusesMainController($scope, factoryBus, $rootScope) {

       /* modal.setModal('templates/colectivos/modalBus.html', 'modalColectivos');*/

        $scope.tableRosario;
        $scope.tableFirmat;
        
        $scope.allBuses = {};
        
        $scope.loadedService = false;

        $scope.map = {
            show: false
        };
        $scope.modal = {
            detail: '',
            showModal: false
        };
        
        $rootScope.loadingService = true;

        factoryBus.getDataBuses()
            .then(busesSuccess)
            .catch(busesError)
            .finally(busesFinally);

        function busesSuccess(dataResponse) {
            $scope.allBuses = dataResponse;
            $scope.loadedService = true;
            return;
        };

        function busesError(dataError) {
            return;
        };

        function busesFinally(dataFinally) {
            setTimeout(function(){
                $rootScope.loadingService = false;
                $scope.$apply();
            }, 500);
        };

        $scope.openModal = function(bus){
            if (angular.isUndefinedOrNullOrEmpty(bus)) return;
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