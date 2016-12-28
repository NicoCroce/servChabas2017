(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .factory('factoryBus', factoryBus);

    function factoryBus($resource) {
        return {
            getBuses: getBuses,
            getTable: getTable
        }

        function getBuses() {
            return $resource('../data/colectivos.json').get().$promise;
        };

        function getTable(data) { 
            return {
                data: data,
                titles: ['Horario', 'Empresa', 'Detalle'],
                stylesColumn: []
            };
        };
    }
})();