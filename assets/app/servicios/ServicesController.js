(function() {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('ServicesController', ServicesController);

    function ServicesController($scope, factoryServices, $rootScope, services) {
        $scope.allServices = {};
        services.getServices(setDataService);

        function setDataService(data) {
            $scope.allServices = data;
        };

        $scope.allServices = services.getServices();

        $scope.modal = {
            name: '',
            map: '',
            data: '',
            showModal: false
        };

        $scope.openModal = openModal;

        function openModal(row) {
            if (angular.isUndefinedOrNullOrEmpty(row)) return;
            $scope.modal.name = row.nombre;
            (row.detalle) ? $scope.modal.data = row.detalle: $scope.modal.data = {};

            $scope.modal.data.teléfono = '(03464) ' + row.tel;
            $scope.modal.phone = '03464' + row.tel.replace('(03464)', '').replace('-', '').replace(/ /g, '');
            $scope.modal.map = row.mapa;
            $scope.modal.showModal = true;
            $rootScope.modalIsOpen = true;
        }

        /*ADD SERVICE **************************************************/

        $scope.submitted = false;

        $scope.form = {};
        $scope.showMsg = false;
        $scope.selectInput = false;
        $scope.modalAdd = {
            showModal: false
        }

        $scope.showModal = function() {
            $scope.modalAdd.showModal = true;
            $rootScope.modalIsOpen = true;
        };

        $scope.closeModal = function() {
            $scope.modal.showModal = false;
            $rootScope.modalIsOpen = false;
        };

        $scope.setError = function(data) {
            if (!$scope.submitted || !angular.isUndefinedOrNullOrEmpty(data)) { return; };
            return { 'has-error': true };
        }

        $scope.setErrorCombo = function() {
            if (!$scope.submitted || $scope.listOpstions.selected != 'Seleccione tipo de servicio') { return; };
            return { 'has-error': true };
        }

        $scope.submit = function() {
            $scope.submitted = true;
            if ($scope.form.data.$invalid) { return; }
            $scope.data.type = $scope.listOpstions.selected;

            var messageListRef = firebase.database().ref('servicios');
            var newMessageRef = messageListRef.push();
            newMessageRef.set($scope.data);
            $scope.showMsg = true;
            console.log("Alta");
            setTimeout(function() {
                $scope.closeModalAdd();
                setData();
                $scope.$apply();
            }, 2000);
        }

        $scope.listOpstions = {
            options: [],
            selected: 'Seleccione tipo de servicio',
            open: false
        }

        $scope.openList = function() {
            return $scope.listOpstions.open = !$scope.listOpstions.open;
        }

        $scope.closeModalAdd = function() {
            $scope.modalAdd.showModal = false;
            $rootScope.modalIsOpen = false;
            setData();
        }

        function setData() {
            setTimeout(function() {
                $scope.showMsg = false;
                $scope.$apply();
            }, 1000)

            $scope.submitted = false;
            $scope.listOpstions.selected = 'Seleccione tipo de servicio';
            $scope.data = {
                type: '',
                name: '',
                address: '',
                days: '',
                tel: '',
                verificado: false
            };
        };

        setData();

        $scope.selectInputElement = function() {
            $scope.selectInput = true;
        };

        $scope.setSelection = function(selected) {
            $scope.listOpstions.selected = selected;
            $scope.selectInput = false;
            return $scope.listOpstions.open = false;
        };

        $scope.getLabel = function(detail, index) {
            return Object.keys(detail)[index];
        };




        var db;
        $scope.setDB = function() {
            var openRequest = window.indexedDB.open("MyTestDatabase", 1);

            openRequest.onupgradeneeded = function (e) {
                console.log("Upgrading...");
                var thisDB = e.target.result;
                if (!thisDB.objectStoreNames.contains("firstOS")) {
                    thisDB.createObjectStore("firstOS");
                }
            };

            openRequest.onsuccess = function (event) {
                console.log('OK');
                db = openRequest.result;
                addPerson();
            };
            openRequest.onerror = function (event) {
                console.log('ERROR> ' + event);
            };
        }

        function addPerson() {
            var transaction = db.transaction(["people"], "readwrite");
            var store = transaction.objectStore("people");

            //Define a person
            var person = {
                name: name,
                email: email,
                created: new Date()
            }

            //Perform the add
            var request = store.add(person, 1);

            request.onerror = function (e) {
                console.log("Error", e.target.error.name);
                //some type of error handler
            }
        }




        $scope.getDB = function() {

        }
    }
})();