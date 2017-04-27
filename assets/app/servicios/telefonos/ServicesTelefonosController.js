(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .controller('ServicesTelefonosController', ServicesTelefonosController);

    function ServicesTelefonosController($scope, modal, $state, $rootScope, factoryServices) {

        $scope.allPhones = [];

        factoryServices.getPhones()
            .then(servicesSuccess)
            .catch(servicesError)
            .finally(servicesFinally);

        function servicesSuccess(dataResponse) {
            $scope.allPhones = dataResponse.utiles;
            $scope.loadedService = true;
            return
        };

        function servicesError(dataError) {
            return;
        };

        function servicesFinally(dataFinally) {
            setTimeout(function () {
                $rootScope.loadingService = false;
                $scope.$apply();
            }, 500);
        };

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
