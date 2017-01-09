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
                $scope.hasIcon = function (row, cell) {
                    return (row.hasDetail && cell == '') ? 'icon-info' : '';
                }

                $scope.hasDetail = function (row) {
                    return (row.hasDetail) ? 'hand-cursor' : '';
                }
            },
            link: function (scope, element, attr) {

            }
        }
    };
})();
