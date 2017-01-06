(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .directive('mainTable', mainTable)
    mainTable.inject = ['$scope'];

    function mainTable() {
        return {
            restrict: 'A',
            templateUrl: '../templates/components/main-table/main-table.html',
            replace: false,
            scope: {
                tableConfig: "=",
            },

            controller: function ($scope) {
                $scope.hasIcon = function (text, index) {
                    if (text != '' && index == 2) {
                        return $scope.tableConfig.icon;
                    }
                    return;
                }

                $scope.appendText = function (text, index) {
                    if (index != 2) { return text; }
                    return;
                }

                $scope.hasDetail = function (text, index) {
                    if (text != '' && index == 2) {
                        return 'hand-cursor';
                    }
                    return;
                }
            },
            link: function (scope, element, attr) {

            }
        }
    };
})();
