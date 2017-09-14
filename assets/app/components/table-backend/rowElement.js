(function(){
    'use strict'
    angular
        .module('chabasHoy')
        .directive('rowElement', rowElement);

    function rowElement($compile){
        return {
            restrict: 'A',
            replace: false,
            templateUrl: 'templates/components/table-backend/rowElement.html',
            scope: {
                row: '=',
                index: '='
            },
            link: function (scope, element, attrs) {
                scope.isValue = true;
                if (typeof scope.row[scope.index] == 'object') {
                    scope.isValue = false;
                };
            }
        }
};
})();
