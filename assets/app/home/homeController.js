(function() {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('HomeController', ['$scope', function($scope) {
            $scope.sendInfo = function() {
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Button',
                    eventAction: 'click',
                    eventLabel: 'Home'
                });
            }
        }]);
})();