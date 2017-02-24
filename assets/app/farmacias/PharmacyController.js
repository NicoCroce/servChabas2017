(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('PharmacyController', PharmacyController);

    PharmacyController.$inject = ['$scope', 'factoryFarmacy'];

    function PharmacyController($scope, factoryFarmacy) {

        factoryFarmacy.getPharmacies()
            .then(calendarSuccess)
            .catch(calendarError)
            .finally(calendarFinally);

        function calendarSuccess(dataResponse) {
            console.log(dataResponse);
            factoryFarmacy.getPharmacyData()
                .then(pharmacySuccess)
                .catch(pharmacyError)
                .finally(pharmacyFinally)
            return;
        };

        function pharmacySuccess(dataResponse) {
            factoryFarmacy.getData();
        }

        function calendarError(dataError) {
            return;
        };

        function calendarFinally(dataFinally) {
            return;
        };

        function clickRow(row){
            if (angular.isUndefinedOrNullOrEmpty(row) || !row.hasDetail) return;
            $scope.modal.showModal = true;
            $scope.modal.detail = row.detail;
        }
    }
})();