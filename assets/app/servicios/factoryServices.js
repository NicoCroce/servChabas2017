(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .factory('factoryServices', factoryServices);
        factoryServices.$inject = ['$resource'];

    function factoryServices($resource) {
        return {
            getServices: getServices,
            getTable: getTable
        }

        function getServices() {
            return $resource('../data/servicios.json').get().$promise;
        };

        function getTable(data) {
            return {
                data: formatTable(data),
                icon: 'icon-info',
                titles: ['Nombre', 'Número', 'Detalle'],
                stylesColumn: [],
                selectedRow: null
            };
        };

        function formatTable(data) {
            var services = [];
            angular.forEach(data, function (currentService, index) {
                var row = {};
                row.info = [currentService.nombre, currentService.detalle.teléfono, ''];
                row.completeData = currentService;
                row.hasDetail = currentService.detalle != '';
                services.push(row);
            });
            return services;
        };
    }
})();