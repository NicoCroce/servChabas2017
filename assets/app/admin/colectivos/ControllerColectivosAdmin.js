(function () {
    'use strict'
    angular
        .module('backend')
        .controller('ControllerColectivosAdmin', ControllerColectivosAdmin);

    function ControllerColectivosAdmin($scope, firebaseUtil) {
        $scope.isLoaded = false;
        $scope.isLoading = true;
        $scope.displayAddBlock = false;

        var typeBus = '',
            persistBus = {},
            localChanged = false;
        $scope.dropPlaceholder = 'Seleccione recorrido';

        $scope.listOptions = {
            options: [],
            selected: $scope.dropPlaceholder,
            open: false
        };

        $scope.showBlockConfirm = false;

        $scope.allBuses = {};

        $scope.newElement = {
            newObject: undefined
        };

        $scope.bus = {
            data: {},
            headers: {}
        };

        $scope.addElement = function () {
            $scope.newElement.newObject = undefined;
            $scope.displayAddBlock = true;
        }

        $scope.aceptElement = function (newElement) {
            firebaseUtil.addElement($scope.bus.data, newElement, 0);
            $scope.displayAddBlock = false;
            $scope.setValue();
        };

        $scope.cancelElement = function () {
            $scope.displayAddBlock = false;
        };

        $scope.upLevel = function (index) {
            firebaseUtil.upLevel($scope.bus.data, index);
            $scope.setValue();
        }

        $scope.downLevel = function (index) {
            firebaseUtil.downLevel($scope.bus.data, index);
            $scope.setValue();
        }

        var indexToRemove;
        $scope.removeElement = function (index) {
            $scope.showBlockConfirm = true;
            indexToRemove = index;
            /* firebaseUtil.removeElement($scope.bus.data, index); */
        }

        $scope.showAddElement = function () {
            return $scope.bus.data && $scope.bus.data.length > 0 && !$scope.displayAddBlock;
        }

        $scope.cancelAction = function () {
            $scope.showBlockConfirm = false;
        }

        $scope.aceptAction = function () {
            $scope.showBlockConfirm = false;
            firebaseUtil.removeElement($scope.bus.data, indexToRemove);
            $scope.setValue();
        }

        $scope.persistBus;

        var usersDB = firebase.database().ref('data/colectivos');

        usersDB.on('value', function (data) {
            $scope.listOptions.options = Object.keys(data.val());
            $scope.allBuses = data.val();
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
            firebase.database().ref('data/colectivos/' + typeBus).set($scope.bus.data); 
        }

        $scope.isObject = function (element) {
            return typeof element == "object";
        }

        $scope.$watch('listOptions.selected', function (val, oldVal) {
            if (val == $scope.dropPlaceholder) { return; }
            $scope.bus.data = $scope.allBuses[val];
            typeBus = val;
        }, true);

        $scope.sendUtil = function () {
            var objToSend = {
                "nombre": 'Cerrajería',
                "tel": '526438'
            }
            var newTelKey = firebase.database().ref('data/servicios/utiles').push().key;
            firebase.database().ref('data/servicios/utiles/' + newTelKey).update(objToSend);
        };
    };
})();
