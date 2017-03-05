(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('PharmacyController', PharmacyController);

    PharmacyController.$inject = ['$scope', 'factoryFarmacy', '$q'];

    function PharmacyController($scope, factoryFarmacy) {

        $scope.dataPharmacy;

        factoryFarmacy.getData()
            .then(calendarSuccess)
            .catch(calendarError)
            .finally(calendarFinally);

        function calendarSuccess(dataResponse) {
            $scope.dataPharmacy = {
                name: dataResponse.nombre,
                img: dataResponse.imagen,
                address: dataResponse.direccion,
                phone: dataResponse.telefono,
                map: dataResponse.mapa
            };
        };

        function calendarError(dataError) {
            return;
        };

        function calendarFinally(dataFinally) {
            return;
        };

        function clickRow(row) {
            if (angular.isUndefinedOrNullOrEmpty(row) || !row.hasDetail) return;
            $scope.modal.showModal = true;
            $scope.modal.detail = row.detail;
        }
    }
})();