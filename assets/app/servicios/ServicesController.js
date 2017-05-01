(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('ServicesController', ServicesController);

    function ServicesController($scope, factoryServices, $rootScope) {
        $scope.allServices = {};

        $scope.loadedService = false;

        $scope.modal = {
            name: '',
            map: '',
            data: '',
            showModal: false,
            showModalUpdate: false
        };

        $scope.openModal = openModal;
        $rootScope.loadingService = true;

        function init(){
            setTimeout(function(){
                if (typeof (Storage) !== "undefined") {
                    $scope.modal.showModalUpdate = localStorage.getItem("showModalUpdate.1") == "true";
                } else {
                    $scope.modal.showModalUpdate = true;
                }
            }, 1000);
        };

        init();

        factoryServices.getDataServices()
            .then(servicesSuccess)
            .catch(servicesError)
            .finally(servicesFinally);

        function servicesSuccess(dataResponse) {
            $scope.allServices = dataResponse;
            $scope.loadedService = true;
            return;
        };

        function servicesError(dataError) {
            return;
        };

        function servicesFinally(dataFinally) {
            setTimeout(function () {
                $rootScope.loadingService = false;
                $scope.$apply();
            }, 500);
        };

        function openModal(row) {
            if (angular.isUndefinedOrNullOrEmpty(row)) return;
            $scope.modal.name = row.nombre;
            $scope.modal.data = row.detalle;
            $scope.modal.data.teléfono = '(03464) ' + row.tel;
            $scope.modal.phone = '03464' + row.tel.replace('(03464)', '').replace('-', '').replace(/ /g, '');
            $scope.modal.map = row.mapa;
            $scope.modal.showModal = true;
            $rootScope.modalIsOpen = true;
        }

        $scope.closeModal = function (type) {
            $scope.modal.showModal = false;
            $scope.modal.showModalUpdate = false;
            if(type && type == 'update'){ 
                if (typeof (Storage) !== "undefined") {
                    localStorage.setItem("showModalUpdate.1", false);
                }
            }
            $rootScope.modalIsOpen = false;
        }

        /*ADD SERVICE **************************************************/

        $scope.submitted = false;

        $scope.form = {};
        $scope.showMsg = false;
        $scope.selectInput = false;
        $scope.modalAdd = {
            showModal: false
        }

        $scope.showModal = function () {
            $scope.modalAdd.showModal = true;
            $rootScope.modalIsOpen = true;
        };

        $scope.setError = function (data) {
            if (!$scope.submitted || !angular.isUndefinedOrNullOrEmpty(data)) { return; };
            return { 'has-error': true };
        }

        $scope.setErrorCombo = function () {
            if (!$scope.submitted || $scope.listOpstions.selected != 'Seleccione tipo de servicio') { return; };
            return { 'has-error': true };
        }

        $scope.submit = function () {
            $scope.submitted = true;
            if ($scope.form.data.$invalid) { return; }
            $scope.data.type = $scope.listOpstions.selected;

            var messageListRef = firebase.database().ref('servicios');
            var newMessageRef = messageListRef.push();
            newMessageRef.set($scope.data);
            $scope.showMsg = true;
            console.log("Alta");
            setTimeout(function () {
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

        $scope.openList = function () {
            return $scope.listOpstions.open = !$scope.listOpstions.open;
        }

        $scope.closeModalAdd = function () {
            $scope.modalAdd.showModal = false;
            $rootScope.modalIsOpen = false;
            setData();
        }

        function setData() {
            setTimeout(function () {
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

        $scope.selectInputElement = function () {
            $scope.selectInput = true;
        };

        $scope.setSelection = function (selected) {
            $scope.listOpstions.selected = selected;
            $scope.selectInput = false;
            return $scope.listOpstions.open = false;
        };

        $scope.getLabel = function(detail, index) {
            return Object.keys(detail)[index];
        };
    }
})();