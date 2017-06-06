(function(){
    'use strict'
    angular
        .module('backend')
        .controller('ControllerColectivosAdmin', ControllerColectivosAdmin);

    function ControllerColectivosAdmin ($scope){
        $scope.listOptions = {
            options: [],
            selected: 'Seleccione tipo de servicio',
            open: false
        };

        $scope.allServicies = {};

        $scope.service = {};

        var usersDB = firebase.database().ref('data/servicios');
        // Si se actualzia el valor se obtiene automáticamente. Como un OBSERVER 
        usersDB.on('value', function (data) {
            $scope.listOptions.options = Object.keys(data.val());
            $scope.allServicies = data.val();
            $scope.service = data.val()["remises"];
            /*$scope.allUtils = data.val();
            debugger;*/
            $scope.$apply();
        });

        $scope.$watch('listOptions.selected', function(val){
            $scope.service = $scope.allServicies[val];
        }, true);

    };
})();
