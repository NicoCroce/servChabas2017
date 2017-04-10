(function(){
    'use strict'
    angular
        .module('servicios-chabas')
        .controller('OptionsController', OptionsController);

    function OptionsController ($scope, modal){
        $scope.data = {
            comment: ''
        };

        $scope.submitted = false;

        $scope.setError = function (data) {
            if (!$scope.submitted || !angular.isUndefinedOrNullOrEmpty(data)) { return; };
            return { 'has-error': true };
        };

        $scope.submit = function() {
            $scope.submitted = true;
            if (angular.isUndefinedOrNullOrEmpty($scope.data.comment)) { return; };
            var messageListRef = firebase.database().ref('comentarios');
            var newMessageRef = messageListRef.push();
            newMessageRef.set($scope.data);

            $scope.data.comment = '';
            $scope.submitted = false;
        }
    };
})();
