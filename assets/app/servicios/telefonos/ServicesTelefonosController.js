(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .controller('ServicesTelefonosController', ServicesTelefonosController);

    function ServicesTelefonosController($scope, modal, $state, $rootScope, factoryServices) {

        $scope.allPhones = [];

        $scope.$watch('allServices', function(value){
            $scope.allPhones = value.utiles;
        });

        $scope.getName = function(currentPhone) {
            return Object.keys(currentPhone)[0];
        }

        $scope.getValue = function (currentPhone) {
            return Object.values(currentPhone)[0];
        }

        $scope.call = function (currentPhone) {
            var phoneNumber = currentPhone.tel,
                clearIndex = phoneNumber.indexOf('/');
            if (clearIndex >= 0) { phoneNumber = phoneNumber.substring(0, clearIndex).replace('-', '') }

            window.location.href = "tel://03464" + phoneNumber;
        }
    };
})();
