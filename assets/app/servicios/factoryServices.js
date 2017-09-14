(function () {
    'use strict';
    angular
        .module('chabasHoy')
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
            },
            'utiles': {
                'title': 'Contactos útiles',
                'jsonElement': 'utiles'
            }
        }

        return {
            getType: getType
        }

        function getType(){
            var index = $state.current.url.lastIndexOf('/');
            return servicesTypes[$state.current.url.substring(0, index).replace('/', '')];
        };
    }
})();