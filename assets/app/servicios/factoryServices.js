(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .factory('factoryServices', factoryServices);

    function factoryServices($resource, $q) {

        var saveAllServices = {};

        return {
            getDataServices: getDataServices,
            setData: setData,
            getTable: getTable
        }

        function getServices() {
            return $resource('data/servicios.json').get().$promise;
        };

        function getPhones() {
            return $resource('data/telefonos.json').get().$promise;
        }

        function getDataServices() {
            if (!angular.isUndefinedOrNullOrEmpty(saveAllServices)) { return saveAllServices; }
            var deferred = $q.defer();
            $q.all([
                getServices(),
                getPhones()
            ]).then(function (responses) {
                var allServices = {};
                allServices.instituciones = responses[0].instituciones;
                allServices.remises = responses[0].remises;
                allServices.rotiserias = responses[0].rotiserias;
                allServices.utiles = responses[1].utiles;
                deferred.resolve(allServices);
            });
            return deferred.promise;
        };

        function setData(data) {
            saveAllServices = data;
        }

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