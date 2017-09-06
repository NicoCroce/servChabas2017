(function () {
    'use strict'
    angular
        .module('chabasHoy')
        .controller('OptionsController', OptionsController);

    function OptionsController($scope, modal, $state) {
        $scope.data = {
            comment: ''
        };

        $scope.modalThy = {
            showModal: false
        };

        $scope.submitted = false;

        $scope.setError = function (data) {
            if (!$scope.submitted || !angular.isUndefinedOrNullOrEmpty(data)) { return; };
            return { 'has-error': true };
        };

        $scope.submit = function () {
            $scope.submitted = true;
            if (angular.isUndefinedOrNullOrEmpty($scope.data.comment)) { return; };
            var messageListRef = firebase.database().ref('comentarios');
            var newMessageRef = messageListRef.push();
            newMessageRef.set($scope.data);
            $scope.modalThy.showModal = true;
            $scope.data.comment = '';
            $scope.submitted = false;
            setTimeout(function () {
                $scope.modalThy.showModal = false;
                $scope.$apply();
            }, 2000);
        }
    };
})();
