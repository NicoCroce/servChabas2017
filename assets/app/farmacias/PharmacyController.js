(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('PharmacyController', PharmacyController);

    PharmacyController.$inject = ['$scope', 'factoryFarmacy', '$rootScope'];

    function PharmacyController($scope, factoryFarmacy, $rootScope) {

        $scope.dataPharmacy;

        factoryFarmacy.getData()
            .then(calendarSuccess)
            .catch(calendarError)
            .finally(calendarFinally);

        function calendarSuccess(dataResponse) {
            $scope.dataPharmacy = {
                name: dataResponse.nombre,
                img: dataResponse.imagen,
                address: dataResponse.direccion,
                phone: dataResponse.telefono,
                map: dataResponse.mapa,
            };
            initMap();
        };

        function calendarError(dataError) {
            return;
        };

        function calendarFinally(dataFinally) {
            return;
        };

        function initMap() {
            var myLatLng = $scope.dataPharmacy.map;
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center: myLatLng,
                minZoom: 8,
                draggable: true,
                disableDefaultUI: true
            });

            new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: '',
                animation: google.maps.Animation.DROP,
                labelContent: "ABCD",
                labelAnchor: new google.maps.Point(15, 65),
                labelClass: "labels", // the CSS class for the label
                labelInBackground: false,
            });
        }
    }
})();