(function(){
    'use strict'
    angular
        .module('servicios-chabas')
        .directive('detailBus', detailBus);

    function detailBus (){
        return {
            restrict: 'A',
            templateUrl: 'templates/components/detail-bus/detail-bus.html',
            replace: true,
            scope: {
                data: '='
            },

            link: function (scope, element, attrs) {
                scope.showDetail = false;

                scope.showDetailEvent = function() {
                    scope.showDetail = !scope.showDetail;
                }
            }
        }
};
})();
