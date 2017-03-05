(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .factory('factoryFarmacy', factoryFarmacy);
    factoryFarmacy.$inject = ['$resource', '$q'];

    function factoryFarmacy($resource, $q) {

        var returnObject = {
            getData: getData
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
                    serviceResponse = responses[1].farmacias[pharmacyName];
                deferred.resolve(serviceResponse);
            });

            return deferred.promise;
        };

        function getCalendar() {
            return $resource('../data/calendar/' + date.monthText + '.json').get().$promise;
        };

        function getPharmacies() {
            return $resource('../data/farmacias.json').get().$promise;
        }

        function getDate() {
            var month = ['', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
            var newDate = new Date();
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