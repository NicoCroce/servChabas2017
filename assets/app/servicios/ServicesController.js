(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('ServicesController', ServicesController);

    function ServicesController($scope, factoryServices, $rootScope) {

        $scope.tableInstitutions;
        $scope.tableTaxi;
        $scope.fastFood;
        $scope.submitted = false;
        $scope.loadedService = false;
        $scope.modal = {
            showModalAdd: false
        };

        $scope.modal = {
            direccion: '',
            horario: '',
            mapa: '',
            showModal: false
        };

        $scope.form = {};
        $scope.showMsg = false;

        $scope.setError = function (data) {
            if (!$scope.submitted || !angular.isUndefinedOrNullOrEmpty(data)) { return; };
            return { 'has-error': true };
        }

        $scope.submit = function () {
            $scope.submitted = true;
            if ($scope.form.data.$invalid) { return; }

            var messageListRef = firebase.database().ref('rotiserias');
            var newMessageRef = messageListRef.push();
            newMessageRef.set($scope.data);
            $scope.showMsg = true;
            console.log("Alta");
             setTimeout(function() {
                 $scope.modal.showModalAdd = false;
                 setData();
                 $scope.$apply();
             }, 2000);
        }

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
            $rootScope.loadingService = false;
            return;
        };

        function clickRow(row) {
            if (angular.isUndefinedOrNullOrEmpty(row) || !row.hasDetail) return;
            $scope.modal.showModal = true;
            $scope.modal.direccion = row.detail.direccion;
            $scope.modal.horario = row.detail.horario;
            $scope.modal.mapa = row.detail.mapa;
            $scope.modal.telefono = '(03464) ' + row.info[1];
        }

        $scope.closeModal = function() {
            setData();
        }

        function setData(){
            $scope.modal.showModalAdd = false;
            setTimeout(function() {
                $scope.showMsg = false;
                $scope.$apply();
            }, 1000)
            
            $scope.submitted = false;
            $scope.data = {
                name: '',
                address: '',
                days: '',
                tel: ''
            };
        };

        setData();
    }
})();