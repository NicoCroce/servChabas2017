(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .factory('services', services);

    function services($rootScope, factoryFarmacy, factoryBus, factoryServices) {

        var contServ = 3;

        var dataPersist = {
            allPharmacies: null,
            dataPharmacy: null,
            allBuses: null,
            services: null
        }

        return {
            getPaharmacy: getPaharmacy,
            getBuses: getBuses,
            getServices: getServices,
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
                    if (cbSetData) {
                        cbSetData(dataPersist); 
                        return $rootScope.loadingService = false; 
                    }
                    return descServ();
                };

                function calendarError(dataError) {
                    callService();
                    return;
                };

                function calendarFinally(dataFinally) {
                    $rootScope.loadingService = false;
                };
            } else {
                $rootScope.loadingService = false;
                if (cbSetData) cbSetData(dataPersist);
                return;
            }
        }

        function getServices(cbSetData){
            /*if (angular.isUndefinedOrNullOrEmpty(dataPersist.services)) {

                (function callService() {
                    factoryServices.getDataServices()
                        .then(servicesSuccess)
                        .catch(servicesError)
                        .finally(servicesFinally);
                })();

                function servicesSuccess(dataResponse) {
                    dataPersist.services = dataResponse;
                    if (cbSetData) {
                        cbSetData(dataPersist);
                        return $rootScope.loadingService = false;
                    }
                    return descServ();
                };

                function servicesError(dataError) {
                    return;
                };

                function servicesFinally(dataFinally) {
                    $rootScope.loadingService = false;

                };
            }
            else {
                $rootScope.loadingService = false;
                if (cbSetData) cbSetData(dataPersist);
                return;
            }*/

            var usersDB = firebase.database().ref('data/servicios');

            usersDB.once('value', servicesSuccess, servicesError);

            function servicesSuccess(dataResponse) {
                dataPersist.services = dataResponse;
                if (cbSetData) {
                    cbSetData(dataResponse.val());
                    return $rootScope.loadingService = false;
                }
                return descServ();
            };

            function servicesError(dataError) {
                return $rootScope.loadingService = false;
            };
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
                    if (cbSetData) {
                        cbSetData(dataPersist);
                        return $rootScope.loadingService = false;
                    }
                    return descServ();
                };

                function busesError(dataError) {
                    return;
                };

                function busesFinally(dataFinally) {
                    $rootScope.loadingService = false;
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
            getServices();
        }

        function descServ() {
            contServ --;
            if (contServ == 0) { $rootScope.loadingService = false; }
        }
    };
})();
