(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .controller('BusesScheduleController', BusesScheduleController);

    function BusesScheduleController($scope, factoryBus) {

        $scope.busesList = [];
        $scope.title = "Horario";

        var typeService;

        $scope.$watch('allBuses', function (value) {
            if(angular.isUndefined(value)) { return; }
            typeService = factoryBus.getType();
            $scope.title = typeService.title;
            $scope.busesList = value[typeService.jsonElement];
            console.log($scope.busesList);
        });

        $scope.getValue = function (currentService) {
            return currentService.tel;
        }

        $scope.call = function (currentPhone) {
            var phoneNumber = Object.values(currentPhone)[0],
                clearIndex = phoneNumber.indexOf('/');
            if (clearIndex >= 0) { phoneNumber = phoneNumber.substring(0, clearIndex).replace('-', '') }

            window.location.href = "tel://03464" + phoneNumber;
        }
    };
})();
