(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .controller('ServicesListController', ServicesListController);

    function ServicesListController($scope, factoryServices) {

        $scope.servicesList = [];
        $scope.title = "Servicio";

        var typeService;

        $scope.$watch('allServices', function (value) {
            typeService = factoryServices.getType();
            $scope.title = typeService.title;
            $scope.servicesList = value[typeService.jsonElement];
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
