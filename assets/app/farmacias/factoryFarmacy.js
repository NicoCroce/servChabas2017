(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .factory('factoryFarmacy', factoryFarmacy);
    factoryFarmacy.$inject = ['$resource', '$q'];

    function factoryFarmacy($resource, $q) {

        var returnObject = {
            getData: getData,
            getPharmacies: getPharmacies
        };

        var persist = {
            pharmacies: null
        };

        var date = getDate();

        return returnObject;

        function getData() {
            var deferred = $q.defer();
            $q.all([
                getCalendar(),
                getPharmacies()
            ]).then(function (responses) {
                var pharmacyName = responses[0].calendar[date.day].farmacia,
                    serviceResponse = {
                        allPharmacies: responses[1],
                        pharmacyData: responses[1].farmacias[pharmacyName]
                    };
                deferred.resolve(serviceResponse);
            });

            return deferred.promise;
        };

        function getCalendar() {
            return  $resource('../data/calendar/' + date.monthText + '.json').get().$promise;
        };

        function getPharmacies() {
            if (!angular.isUndefinedOrNullOrEmpty(persist.pharmacies)) { return persist.pharmacies; }
            persist.pharmacies = $resource('../data/farmacias.json').get().$promise;
            return persist.pharmacies;
        }

        function getDate() {
            var month = ['', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
            var newDate = new Date();
            if (newDate.getHours() < 8) {
                newDate.setDate(newDate.getDate() - 1);
            }
            var date = {
                complete: newDate,
                day: newDate.getDate(),
                month: newDate.getMonth() + 1,
                year: newDate.getFullYear()
            }

            date.monthText = month[date.month];

            return date;
        };
    }
})();