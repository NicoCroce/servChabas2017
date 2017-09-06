(function () {
    'use strict';
    angular
        .module('chabasHoy')
        .controller('BusesController', BusesController);

    function BusesController($scope, factoryBus, $rootScope) {
        $scope.initMapBus = function() {
            $scope.map.show = true;
            var myLatLng = {
                lat: -33.245058,
                lng: -61.359142
            };

            var map = new google.maps.Map(document.getElementById('mapBus'), {
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
                labelContent: "",
                labelAnchor: new google.maps.Point(15, 65),
                labelClass: "labels", // the CSS class for the label
                labelInBackground: false,
            });
        }
    }
})();