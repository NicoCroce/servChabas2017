(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('BusesController', BusesController);

    function BusesController($scope, factoryBus, $rootScope) {

        $scope.tableRosario;
        $scope.tableFirmat;
        $scope.loadedService = false;
        $scope.modal = {
            detail: '',
            showModal: false
        };
        
        $scope.clickRow = clickRow;
        $rootScope.loadingService = true;

        factoryBus.getBuses()
            .then(busesSuccess)
            .catch(busesError)
            .finally(busesFinally);

        function busesSuccess(dataResponse) {
            $scope.tableRosario = factoryBus.getTable(dataResponse.rosario);
            $scope.tableFirmat = factoryBus.getTable(dataResponse.firmat);
            $scope.loadedService = true;
            return;
        };

        function busesError(dataError) {
            return;
        };

        function busesFinally(dataFinally) {
            $rootScope.loadingService = false;
            return;
        };

        function clickRow(row){
            if (angular.isUndefinedOrNullOrEmpty(row) || !row.hasDetail) return;
            $scope.modal.showModal = true;
            $scope.modal.detail = row.detail;
        }

        $scope.initMap = function() {
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
                labelContent: "ABCD",
                labelAnchor: new google.maps.Point(15, 65),
                labelClass: "labels", // the CSS class for the label
                labelInBackground: false,
            });
        }
    }
})();