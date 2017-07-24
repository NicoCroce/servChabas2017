(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .controller('StackClimaController', StackClimaController);

    function StackClimaController($scope, services) {
        services.getWeather()
            .then(function(response){
                debugger;
                console.log(response);
            })
    };
})();
