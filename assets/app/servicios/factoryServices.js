(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .factory('factoryServices', factoryServices);

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
                icon: '',
                titles: ['Nombre', 'Número', 'Dirección'],
                stylesColumn: [],
                selectedRow: null
            };
        };

        function formatTable(data) {
            var services = [];
            angular.forEach(data, function (currentService, index) {
                var row = {};
                row.info = [currentService.nombre, currentService.numero, currentService.dirección];
                services.push(row);
            });
            return services;
        };
    }
})();