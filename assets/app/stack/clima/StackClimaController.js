(function () {
    'use strict'
    angular
        .module('chabasHoy')
        .controller('StackClimaController', StackClimaController);

    function StackClimaController($scope, services, factoryClima, $rootScope) {
        $scope.dataWeather = {};
        $scope.showInfoTemp = false,
            $scope.showInfoHum = false;
        $scope.showInfoRun = false;
        $scope.showMoreInfo = false;

        $rootScope.loadingService = true;
        services.getData('clima', getDataWeather);

        services.getWeather()
            .then(function (response) {
/*                 $scope.dataWeather = factoryClima.getData(response.data); */
                $rootScope.loadingService = false;
            });

        function getDataWeather(data) {
            $scope.dataWeather = factoryClima.getData(data);
            $scope.$apply();
        };

        $rootScope.$on('updateData', function () {
            services.getData('clima', getDataWeather);
        });


        $scope.showTemp = function () {
            return $scope.showInfoTemp = !$scope.showInfoTemp;
        }

        $scope.showHum = function () {
            return $scope.showInfoHum = !$scope.showInfoHum;
        }

        $scope.showRun = function () {
            return $scope.showInfoRun = !$scope.showInfoRun;
        }

        $scope.showMore = function () {
            return $scope.showMoreInfo = !$scope.showMoreInfo;
        }
    };
})();
