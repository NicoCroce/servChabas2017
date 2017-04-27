(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .factory('factoryBus', factoryBus);
        factoryBus.$inject = ['$resource'];

    function factoryBus($resource) {
        return {
            getBuses: getBuses,
            getTable: getTable
        }

        function getBuses() {
            return $resource('data/colectivos.json').get().$promise;
        };

        function getTable(data) { 
            return {
                data: formatTable(data),
                icon: 'icon-info',
                titles: ['Horario', 'Empresa', 'Detalle'],
                stylesColumn: [],
                selectedRow: null
            };
        };

        function formatTable(data) {
            var buses = [];
            angular.forEach(data, function(currentBus, index){
                var row = {};
                row.info = [currentBus.horario, currentBus.empresa, ''];
                row.detail = currentBus.detalle;
                row.hasDetail = currentBus.detalle != '';
                buses.push(row);
            });
            return buses;
        };
    }
})();