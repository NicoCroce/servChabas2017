(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .factory('factoryFarmacy', factoryFarmacy);
    factoryFarmacy.$inject = ['$resource'];

    function factoryFarmacy($resource) {
        return {
            getPharmacies: getPharmacies,
            formatInfo: formatInfo
        }

        function getPharmacies(month) {
            return $resource('../data/calendar/' + month + '.json').get().$promise;
        };

        function formatInfo(data) {
            /*return {
                data: formatTable(data),
                icon: 'icon-info',
                titles: ['Horario', 'Empresa', 'Detalle'],
                stylesColumn: [],
                selectedRow: null
            };*/
        };

        /*function formatTable(data) {
            var buses = [];
            angular.forEach(data, function (currentBus, index) {
                var row = {};
                row.info = [currentBus.horario, currentBus.empresa, ''];
                row.detail = currentBus.detalle;
                row.hasDetail = currentBus.detalle != '';
                buses.push(row);
            });
            return buses;
        };*/
    }
})();