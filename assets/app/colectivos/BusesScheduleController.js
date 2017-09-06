(function() {
    'use strict'
    angular
        .module('chabasHoy')
        .controller('BusesScheduleController', BusesScheduleController);

    function BusesScheduleController($scope, factoryBus) {
        $scope.busesList = [];
        $scope.title = "Horario";

        var typeService;

        if ($scope.allBuses && !$.isEmptyObject($scope.allBuses)) {
            typeService = factoryBus.getType();
            $scope.title = typeService.title;
            $scope.busesList = $scope.allBuses[typeService.jsonElement];
        }

        $scope.$on('updateTableBuses', function(event, value) {
            if ($scope.allBuses && !$.isEmptyObject($scope.allBuses)) {
                typeService = factoryBus.getType();
                $scope.title = typeService.title;
                $scope.busesList = $scope.allBuses[typeService.jsonElement];
                $scope.$apply();
            }
        });

        $scope.getValue = function(currentService) {
            return currentService.tel;
        }

        $scope.call = function(currentPhone) {
            var phoneNumber = Object.values(currentPhone)[0],
                clearIndex = phoneNumber.indexOf('/');
            if (clearIndex >= 0) { phoneNumber = phoneNumber.substring(0, clearIndex).replace('-', '') }

            window.location.href = "tel://03464" + phoneNumber;
        }
    };
})();