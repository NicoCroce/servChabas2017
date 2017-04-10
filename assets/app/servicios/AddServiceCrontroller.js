(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('AddServiceController', AddServiceController);

    function AddServiceController($scope, factoryServices, $rootScope, modal) {
        $scope.submitted = false;

        $scope.form = {};
        $scope.showMsg = false;
        $scope.selectInput = false;

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
             setTimeout(function() {
                 $scope.closeModal();
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

        $scope.closeModal = function() {
            modal.closeModal();
            setData();
        }

        function setData(){
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

        $scope.setSelection = function (selected) {
            $scope.listOpstions.selected = selected;
            $scope.selectInput = false;
            return $scope.listOpstions.open = false;
        };
    }
})();