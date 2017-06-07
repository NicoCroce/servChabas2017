(function(){
    'use strict'
    angular
        .module('backend')
        .controller('ControllerServiciosAdmin', ControllerServiciosAdmin);

    function ControllerServiciosAdmin ($scope){
        $scope.isLoaded = false;
        $scope.isLoading = true;
        var typeService = '',
            persistService = {},
            localChanged = false;

        $scope.listOptions = {
            options: [],
            selected: 'Seleccione tipo de servicio',
            open: false
        };

        $scope.allServicies = {};

        $scope.service = {
            data: {},
            headers: {} 
        };

        $scope.persistService;

        var usersDB = firebase.database().ref('data/servicios');

        usersDB.on('value', function (data) {
            console.log("entraaaaaaaaa");
            $scope.listOptions.options = Object.keys(data.val());
            $scope.allServicies = data.val();
            $scope.service.data = data.val()[typeService];
            $scope.isLoaded = true;
            persistService = data.val();
            $scope.isLoading = false;
            if (localChanged) { // evita apply si los cambios son locales. 
                localChanged = false;
                return;
            }
            $scope.$apply();
        });

        $scope.setValue = function() {
            localChanged = true;
            firebase.database().ref('data/servicios/' + typeService).update($scope.service.data);
        }

        $scope.isObject = function(element) {
            return typeof element == "object";
        }

        $scope.$watch('listOptions.selected', function(val){
            $scope.service.data = $scope.allServicies[val];
            typeService = val;          
        }, true);
    };
})();
