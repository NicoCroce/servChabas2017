(function() {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('PharmacyController', PharmacyController);

    function PharmacyController($scope, factoryFarmacy, $rootScope, services) {

        $scope.dataPharmacy;
        $scope.map = {
            show: false
        };

        $scope.allPharmacies;
        services.getData('farmacias', getData);

        function getData(data) {
            data = factoryFarmacy.getData(data);
            $scope.allPharmacies = data.allPharmacies;
            $scope.dataPharmacy = data.pharmacyData;
            $scope.$apply();
        };

        $rootScope.$on('updateData', function () {
            services.getData('farmacias', getData);
        });

        $scope.sendCall = function() {
            window.location.href = "tel://03464" + $scope.dataPharmacy.phone;
            //analytics.sendClick('farmacia_' + $scope.dataPharmacy.name, 'Call');
        }


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