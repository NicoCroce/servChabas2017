(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .directive('modal', modal);

    function modal() {
        return {
            restrict: 'A',
            template: '<ng-include src="getTemplateUrl()"/>',
            replace: false,
            scope: {
                modalTemplate: "=",
            },

            controller:['$scope', function ($scope) {
                $scope.getTemplateUrl = function() {
                    return $scope.modalTemplate;
                }
            }],
            link: function (scope, element, attr) {

            }
        }
    };
})();
