(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('ServicesController', ServicesController);

    function ServicesController($scope, factoryServices, $rootScope) {

        $scope.tableInstitutions;
        $scope.tableTaxi;
        $scope.fastFood;

        $scope.loadedService = false;

        $scope.modal = {
            direccion: '',
            horario: '',
            mapa: '',
            showModal: false
        };

        $scope.clickRow = clickRow;
        $rootScope.loadingService = true;

        factoryServices.getServices()
            .then(servicesSuccess)
            .catch(servicesError)
            .finally(servicesFinally);

        function servicesSuccess(dataResponse) {
            $scope.tableInstitutions = factoryServices.getTable(dataResponse.instituciones);
            $scope.tableTaxi = factoryServices.getTable(dataResponse.remises);
            $scope.fastFood = factoryServices.getTable(dataResponse.rotiserias);
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

        function clickRow(row) {
            if (angular.isUndefinedOrNullOrEmpty(row) || !row.hasDetail) return;
            $scope.modal.direccion = row.detail.direccion;
            $scope.modal.horario = row.detail.horario;
            $scope.modal.mapa = row.detail.mapa;
            $scope.modal.telefono = '(03464) ' + row.info[1];
            $scope.modal.showModal = true;
            $rootScope.modalIsOpen = true;
        }

        $scope.closeModal = function () {
            $scope.modal.showModal = false;
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
    }
})();