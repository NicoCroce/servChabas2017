(function(){
    'use strict'
    angular
        .module('servicios-chabas')
        .directive('combo', combo);

    function combo (){
        return {
            restrict: 'A',
            templateUrl: 'templates/components/combo/combo.html',
            replace: true,
            scope: {
                listOptions: '='
            },
            link: function (scope, element, attrs) {

                scope.openList = function () {
                    return scope.listOptions.open = !scope.listOptions.open;
                };

                scope.setSelection = function (selected) {
                    scope.listOptions.selected = selected;
                    scope.selectInput = false;
                    return scope.listOptions.open = false;
                };
            }
        }
};
})();
