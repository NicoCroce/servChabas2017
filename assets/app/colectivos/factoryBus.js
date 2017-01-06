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
        
        var dataTableColectivos = {
            data: {},
            
        };

        function getBuses() {
            return $resource('../data/colectivos.json').get().$promise;
        };

        function getTable(data) { 
            return {
                data: data,
                icon: 'icon-info',
                titles: ['Horario', 'Empresa', 'Detalle'],
                stylesColumn: []
            };
        };
    }
})();