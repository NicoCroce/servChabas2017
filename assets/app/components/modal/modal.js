(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .directive('modal', modal)
    modal.inject = ['$scope'];

    function modal() {
        return {
            restrict: 'A',
            template: '<ng-include src="getTemplateUrl()"/>',
            replace: false,
            scope: {
                modalTemplate: "=",
            },

            controller: function ($scope) {
                $scope.getTemplateUrl = function() {
                    return $scope.modalTemplate;
                }
            },
            link: function (scope, element, attr) {

            }
        }
    };
})();
