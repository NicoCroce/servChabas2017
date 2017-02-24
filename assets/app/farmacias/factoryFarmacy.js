(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .factory('factoryFarmacy', factoryFarmacy);
    factoryFarmacy.$inject = ['$resource'];

    function factoryFarmacy($resource) {

        var returnObject = {
            getPharmacies: getPharmacies,
            getPharmacyData: getPharmacyData,
            getData: getData
        };

        var pharmaciesNames = [
            { "Bianchini": 0 },
            { "Torres": 1 },
            { "Busilacchi": 2 },
            { "Pacini": 3 },
            { "Gismondi": 4 },
            { "Pace": 5 },
            { "La Plaza": 6 },
            { "Del Grecco": 7 }];

        return returnObject;

        function getPharmacies() {
            var date = getDate(),
                month = ['', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
            return $resource('../data/calendar/' + month[date.month] + '.json').get().$promise;
        };

        function getDate() {
            var newDate = new Date();
            var date = {
                complete: newDate,
                day: newDate.getDate(),
                month: newDate.getMonth() + 1,
                year: newDate.getFullYear()
            }
            return date;
        };

        function getData(name) {
            pharmaciesNames.map(function (obj) {
                return obj;
            });
        };

        function getPharmacyData(id) {
            return $resource('../data/farmacias.json').get().$promise;
        }
    }
})();