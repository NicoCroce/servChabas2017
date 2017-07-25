(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .controller('StackClimaController', StackClimaController);

    function StackClimaController($scope, services, factoryClima) {
        $scope.dataWeather = {};

        services.getWeather()
            .then(function(response){
                $scope.dataWeather = factoryClima.getData(response.data);
            })
    };
})();
