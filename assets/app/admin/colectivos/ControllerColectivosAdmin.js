(function(){
    'use strict'
    angular
        .module('backend')
        .controller('ControllerColectivosAdmin', ControllerColectivosAdmin);

    function ControllerColectivosAdmin ($scope){

                $scope.isLoaded = false;
        $scope.isLoading = true;
        var typeBus = '',
            persistBus = {},
            localChanged = false;

        $scope.listOptions = {
            options: [],
            selected: 'Seleccione recorrido',
            open: false
        };

        $scope.allServicies = {};

        $scope.bus = {
            data: {},
            headers: {} 
        };

        $scope.persistBus;

        var usersDB = firebase.database().ref('data/colectivos');

        usersDB.on('value', function (data) {
            $scope.listOptions.options = Object.keys(data.val());
            $scope.allServicies = data.val();
            $scope.bus.data = data.val()[typeBus];
            $scope.isLoaded = true;
            persistBus = data.val();
            $scope.isLoading = false;
            if (localChanged) { // evita apply si los cambios son locales. 
                localChanged = false;
                return;
            }
            $scope.$apply();
        });

        $scope.setValue = function() {
            localChanged = true;
            /* firebase.database().ref('data/colectivos/' + typeBus).update($scope.bus.data); */
        }

        $scope.isObject = function(element) {
            return typeof element == "object";
        }

        $scope.$watch('listOptions.selected', function(val){
            $scope.bus.data = $scope.allServicies[val];
            typeBus = val;          
        }, true);

        /* $scope.addDetail = function() {
            var servKeys = Object.keys($scope.allServicies.utiles);
            servKeys.forEach(function(element) {
                if($scope.allServicies.utiles[element].detalle){ return; }
                $scope.allServicies.utiles[element]['detalle'] = {
                    direccion: ""
                }
            });
            firebase.database().ref('data/servicios/utiles').update($scope.allServicies.utiles);
        } */

        
        $scope.sendUtil = function() {
            var objToSend = {
                "nombre": 'Cerrajería',
                "tel": '526438'
            }
            var newTelKey = firebase.database().ref('data/servicios/utiles').push().key;
            firebase.database().ref('data/servicios/utiles/' + newTelKey).update(objToSend);
        }





        $scope.listOptions = {
            options: [],
            selected: 'Seleccione tipo de servicio',
            open: false
        };

        $scope.allServicies = {};

        $scope.buses = {};

        var usersDB = firebase.database().ref('data/colectivos');
        // Si se actualzia el valor se obtiene automáticamente. Como un OBSERVER 
        usersDB.on('value', function (data) {
            $scope.listOptions.options = Object.keys(data.val());
            $scope.allServicies = data.val();
            $scope.buses = data.val()["colectivos"];
            /*$scope.allUtils = data.val();
            debugger;*/
            $scope.$apply();
        });

        $scope.$watch('listOptions.selected', function(val){
            $scope.buses = $scope.allServicies[val];
        }, true);

    };
})();
