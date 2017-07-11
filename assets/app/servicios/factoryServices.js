(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .factory('factoryServices', factoryServices);

    function factoryServices($resource, $q, $state) {

        var saveAllServices = {};

        var servicesTypes = {
            'instituciones': {
                'title': 'Instituciones',
                'jsonElement': 'instituciones'
            },
            'remises': {
                'title': 'Remises',
                'jsonElement': 'remises'
            },
            'rotiserias': {
                'title': 'Rotiserías',
                'jsonElement': 'rotiserias'
            }
        }

        /*getDataServices: getDataServices,*/

        return {
            getType: getType
        }

        /*function getServices() {
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
                saveAllServices = deferred.promise;
            });
            return deferred.promise;
        };*/

        function getType(){
            var index = $state.current.url.lastIndexOf('/');
            return servicesTypes[$state.current.url.substring(0, index).replace('/', '')];
        };
    }
})();