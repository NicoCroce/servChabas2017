(function () {
    'use strict'
    angular
        .module('backend')
        .controller('ControllerColectivosAdmin', ControllerColectivosAdmin);

    function ControllerColectivosAdmin($scope) {

        $scope.kanbanBoard = { "name": "Kanban Board", "numberOfColumns": 4, "columns": [{ "name": "Ideas", "cards": [{ "title": "Come up with a POC for new Project", "status": "Ideas" }, { "title": "Design new framework for reporting module", "status": "Ideas" }] }, { "name": "Not started", "cards": [{ "title": "Explore new IDE for Development", "status": "Not started", "details": "Testing Card Details" }, { "title": "Get new resource for new Project", "status": "Not started", "details": "Testing Card Details" }] }, { "name": "In progress", "cards": [{ "title": "Develop ui for tracker module", "status": "In progress", "details": "Testing Card Details" }, { "title": "Develop backend for plan module", "status": "In progress", "details": "Testing Card Details" }] }, { "name": "Done", "cards": [{ "title": "Test user module", "status": "Done", "details": "Testing Card Details" }, { "title": "End to End Testing for user group module", "status": "Done", "details": "Testing Card Details" }, { "title": "CI for user module", "status": "Done", "details": "Testing Card Details" }] }], "backlogs": [] };

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

        $scope.setValue = function () {
            localChanged = true;
            /* firebase.database().ref('data/colectivos/' + typeBus).update($scope.bus.data); */
        }

        $scope.isObject = function (element) {
            return typeof element == "object";
        }

        $scope.$watch('listOptions.selected', function (val) {
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


        $scope.sendUtil = function () {
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

        $scope.$watch('listOptions.selected', function (val) {
            $scope.buses = $scope.allServicies[val];
        }, true);

    };
})();
