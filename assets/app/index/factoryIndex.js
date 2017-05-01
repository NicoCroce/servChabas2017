(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .factory('factoryIndex', factoryIndex);

    function factoryIndex($resource) {
        return {
            setTab: setTab
        }

        function setTab() {
            var section = window.location.hash.toString().replace('#!/', ''),
                index = 0;
                
            if (section.indexOf('farmacias') >= 0) {
                return index = 0;
            };
                
            if (section.indexOf('colectivos') >= 0) {
                return index = 1;
            };
            
            if (section.indexOf('servicios') >= 0) {
                return index = 2;
            };

            if (section.indexOf('menu') >= 0) {
                return index = 3;
            };

            return index;
        };

        function getAllData() {
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
        }
    }
})();