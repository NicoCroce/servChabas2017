(function(){
    'use strict'
    angular
        .module('backend')
        .controller('ControllerServiciosAdmin', ControllerServiciosAdmin);

    function ControllerServiciosAdmin ($scope){
        $scope.isLoaded = false;
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

        var usersDB = firebase.database().ref('data/servicios');
        // Si se actualzia el valor se obtiene automáticamente. Como un OBSERVER 
        usersDB.on('value', function (data) {
            $scope.listOptions.options = Object.keys(data.val());
            $scope.allServicies = data.val();
            $scope.service.data = data.val()["remises"];
            $scope.isLoaded = true;
            /*$scope.allUtils = data.val();
            debugger;*/
            $scope.$apply();
        });

        $scope.$watch('listOptions.selected', function(val){
            $scope.service.data = $scope.allServicies[val];
        }, true);
    };
})();
