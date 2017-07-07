(function() {
    'use strict'
    angular
        .module('servicios-chabas')
        .factory('services', services);

    function services($rootScope, indexedDB) {
        var contServ = 3;

        var dataPersist = {
            allPharmacies: null,
            dataPharmacy: null,
            allBuses: null,
            services: null
        }

        var usersDBFull = firebase.database().ref('data');

        return {
            getData: getData,
            init: init
        }

        function callFirebase() {
            $rootScope.loadingService = true;
            console.log('LLAMANDO A FIREBASE');
            if (!navigator.onLine) return;
            usersDBFull.on('value', function(dataResponse) {
                var item = {
                    name: 'DB',
                    data: dataResponse.val()
                };
                console.log('GUARDANDO EN INDEXDB');
                indexedDB.setData('DB', item);
                $rootScope.loadingService = false;
            });
        };

        function getData(name, cbSetData) {
            indexedDB.getItem('DB', evaluateService);

            function evaluateService(indexResponse) {
                if (indexResponse && indexResponse != null && cbSetData) {
                    return cbSetData(indexResponse[name]);
                }
                return console.log('Error');
            }
        };

        function init() {
            callFirebase();
        }
    };
})();