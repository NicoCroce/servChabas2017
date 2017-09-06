(function(){
    'use strict'
    angular
        .module('chabasHoy')
        .directive('tableBackend', tableBackend);

    function tableBackend (){
        return {
            restrict: 'A',
            templateUrl: 'templates/components/table-backend/table-backend.html',
            replace: false,
            scope: {
                service: '='
            },

            link: function (scope, element, attrs) {
                if (angular.isUndefinedOrNullOrEmpty(scope.service.data)) { return; }
                scope.service.headers = Object.keys(scope.service.data[0]);
            }
        }
};
})();
