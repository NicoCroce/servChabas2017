(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .controller('StackClimaController', StackClimaController);

    function StackClimaController($scope, services) {
        $scope.dataWeather = {};

        services.getWeather()
            .then(function(response){
                $scope.dataWeather = response.data;
            })
    };
})();
