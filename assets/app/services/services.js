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

        return {
            getData: getData,
            init: init
        }

        function getDataResponse() {
            return dataPersist;
        }

        function getData(name, cbSetData) {
            indexedDB.getItem(name, evaluateService);

            function evaluateService(indexResponse) {
                console.log('off:' + $rootScope.offline);
                if (indexResponse != null && cbSetData) cbSetData(indexResponse);
                if ($rootScope.offline) return;
                var usersDB = firebase.database().ref('data/' + name);
                usersDB.once('value', servicesSuccess, servicesError);

                function servicesSuccess(dataResponse) {
                    var item = {
                        name: name,
                        data: dataResponse.val()
                    };

                    returnValue(dataResponse, item);
                    return descServ();
                };

                function servicesError(dataError) {
                    console.log('error');
                    return $rootScope.loadingService = false;
                };

                function returnValue(dataResponse, item) {
                    if (!angular.deepEquals(dataResponse.val(), indexResponse)) {
                        indexedDB.setData(name, item);
                        if (!cbSetData) { return; }
                        cbSetData(dataResponse.val());
                        console.log('enviando a la vista');
                    }
                };
            }
        };

        function init() {
            getData('farmacias');
            getData('colectivos');
            getData('servicios');
        }

        function descServ() {
            contServ--;
            if (contServ == 0) { $rootScope.loadingService = false; }
        }
    };
})();