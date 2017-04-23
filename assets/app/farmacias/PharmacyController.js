(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('PharmacyController', PharmacyController);

    function PharmacyController($scope, factoryFarmacy, $rootScope, analytics) {

        $scope.dataPharmacy;
        $scope.map = {
            show: false
        };

        $scope.allPharmacies;

        $rootScope.loadingService = true;
        
        factoryFarmacy.getData()
            .then(calendarSuccess)
            .catch(calendarError)
            .finally(calendarFinally);

        function calendarSuccess(dataResponse) {
            $scope.allPharmacies = dataResponse.allPharmacies.farmacias;
            $scope.dataPharmacy = {
                name: dataResponse.pharmacyData.nombre,
                img: dataResponse.pharmacyData.imagen,
                address: dataResponse.pharmacyData.direccion,
                phone: dataResponse.pharmacyData.telefono,
                map: dataResponse.pharmacyData.mapa,
            };
        };

        function calendarError(dataError) {
            return;
        };

        $scope.sendCall = function(){
            window.location.href = "tel://03464" + $scope.dataPharmacy.phone;
            analytics.sendClick('farmacia_' + $scope.dataPharmacy.name, 'Call');
        }

        function calendarFinally(dataFinally) {
            setTimeout(function () {
                $rootScope.loadingService = false;
                $scope.$apply();
            }, 500);
        };

        $scope.initMap = function() {
            $scope.map.show = true;
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
                labelAnchor: new google.maps.Point(15, 65),
                labelClass: "labels", // the CSS class for the label
                labelInBackground: false,
            });
        };
    }
})();