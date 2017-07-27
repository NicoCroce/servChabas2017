(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .controller('StackClimaController', StackClimaController);

    function StackClimaController($scope, services, factoryClima, $rootScope) {
        $scope.dataWeather = {};
        $scope.showInfoTemp = false,
        $scope.showInfoHum = false;
        $scope.showInfoRun = false;
        $rootScope.loadingService = true;
        services.getWeather()
            .then(function(response){
                $scope.dataWeather = factoryClima.getData(response.data);
                $rootScope.loadingService = false;
            });

        $scope.showTemp = function(){
            return $scope.showInfoTemp = !$scope.showInfoTemp;
        }
        
        $scope.showHum = function(){
            return $scope.showInfoHum = !$scope.showInfoHum;
        }
        
        $scope.showRun = function(){
            return $scope.showInfoRun = !$scope.showInfoRun;
        }
    };
})();
