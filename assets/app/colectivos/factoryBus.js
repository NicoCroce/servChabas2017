(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .factory('factoryBus', factoryBus);

    function factoryBus($resource, $state) {

        var dataSaved = {};

        var busesTypes = {
            'chabas-rosario': {
                'title': 'Chabás - Rosario',
                'jsonElement': 'chabasRosario'
            },
            'chabas-firmat': {
                'title': 'Chabás - Firmat',
                'jsonElement': 'chabasFirmat'
            }
        }

        return {
            getDataBuses: getDataBuses,
            getType: getType,
            getTable: getTable
        }

        function getDataBuses() {
            if (!angular.isUndefinedOrNullOrEmpty(dataSaved)) { return dataSaved; }
            dataSaved = $resource('data/colectivos.json').get().$promise;
            return dataSaved;

        }

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

        function getType() {
            return busesTypes[$state.current.url.replace('/colectivos.', '')];
        };
    }
})();