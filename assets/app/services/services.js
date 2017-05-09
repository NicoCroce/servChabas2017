(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .factory('services', services);

    function services($rootScope, factoryFarmacy, factoryBus) {
        var dataPersist = {
            allPharmacies: null,
            dataPharmacy: null,
            allBuses: null,
            services: null,
            phones: null
        }

        return {
            getPaharmacy: getPaharmacy,
            getBuses: getBuses,
            init: init
        }

        function getDataResponse() {
            return dataPersist;
        }

        function getPaharmacy(cbSetData) {
            if (angular.isUndefinedOrNullOrEmpty(dataPersist.allPharmacies) ||
                angular.isUndefinedOrNullOrEmpty(dataPersist.dataPharmacy)) {
                $rootScope.loadingService = true;
                (function callService() {
                    factoryFarmacy.getData()
                        .then(calendarSuccess)
                        .catch(calendarError)
                        .finally(calendarFinally);
                })();

                function calendarSuccess(dataResponse) {
                    dataPersist.allPharmacies = dataResponse.allPharmacies.farmacias;
                    dataPersist.dataPharmacy = {
                        name: dataResponse.pharmacyData.nombre,
                        img: dataResponse.pharmacyData.imagen,
                        address: dataResponse.pharmacyData.direccion,
                        phone: dataResponse.pharmacyData.telefono,
                        map: dataResponse.pharmacyData.mapa,
                    };
                    if (cbSetData) cbSetData(dataPersist);
                    return;
                };

                function calendarError(dataError) {
                    callService();
                    return;
                };

                function calendarFinally(dataFinally) {
                    setTimeout(function () {
                        $rootScope.loadingService = false;
                    }, 500);
                };
            } else {
                $rootScope.loadingService = false;
                if (cbSetData) cbSetData(dataPersist);
                return;
            }
        }

        function getBuses(cbSetData) {
            if (angular.isUndefinedOrNullOrEmpty(dataPersist.allBuses)) {

                (function callService() {
                    factoryBus.getDataBuses()
                        .then(busesSuccess)
                        .catch(busesError)
                        .finally(busesFinally)
                })();

                function busesSuccess(dataResponse) {
                    dataPersist.allBuses = dataResponse;
                    $rootScope.loadedService = true;
                    if (cbSetData) cbSetData(dataPersist);
                };

                function busesError(dataError) {
                    return;
                };

                function busesFinally(dataFinally) {
                    setTimeout(function () {
                        $rootScope.loadingService = false;
                    }, 500);
                };
            }
            else {
                $rootScope.loadingService = false;
                if (cbSetData) cbSetData(dataPersist);
                return;
            }
        }

        function init() {
            getPaharmacy();
            getBuses();
        }
    };
})();
