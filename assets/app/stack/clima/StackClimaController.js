(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .controller('StackClimaController', StackClimaController);

    function StackClimaController($scope, services, factoryClima) {
        $scope.dataWeather = {};
        $scope.showInfoTemp = false,
        $scope.showInfoHum = false;
        $scope.showInfoRun = false;

        services.getWeather()
            .then(function(response){
                $scope.dataWeather = factoryClima.getData(response.data);
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
