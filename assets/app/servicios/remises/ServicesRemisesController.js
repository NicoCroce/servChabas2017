(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .controller('ServicesRemisesController', ServicesRemisesController);

    function ServicesRemisesController($scope, modal, $state, $rootScope, factoryServices) {

        $scope.allTaxis = [];

        $scope.$watch('allServices', function (value) {
            $scope.allTaxis = value.remises;
        });

        $scope.getName = function(currentPhone) {
            return Object.keys(currentPhone)[0];
        }

        $scope.getValue = function (currentPhone) {
            return Object.values(currentPhone)[0];
        }

        $scope.call = function (currentPhone) {
            var phoneNumber = Object.values(currentPhone)[0],
                clearIndex = phoneNumber.indexOf('/');
            if (clearIndex >= 0) { phoneNumber = phoneNumber.substring(0, clearIndex).replace('-', '') }

            window.location.href = "tel://03464" + phoneNumber;
        }
    };
})();
