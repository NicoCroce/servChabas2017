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
                
            },
            link: function(scope, element, attr) {
                
            }
        }
    };
})();
