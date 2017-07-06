(function() {
    'use strict';
    angular
        .module('servicios-chabas')
        .factory('factoryFarmacy', factoryFarmacy);

    function factoryFarmacy($resource, $q) {

        var returnObject = {
            getData: getData
        };

        var persist = {
            pharmacies: null
        };

        var date = getDate();

        return returnObject;

        function getData(data) {
            var pharmacyName = data.calendario[date.monthText].calendar[date.day].farmacia;
            return {
                allPharmacies: data.farmacias,
                pharmacyData: {
                    name: data.farmacias[pharmacyName].nombre,
                    img: data.farmacias[pharmacyName].imagen,
                    address: data.farmacias[pharmacyName].direccion,
                    phone: data.farmacias[pharmacyName].telefono,
                    map: data.farmacias[pharmacyName].mapa,
                }
            };
        };

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