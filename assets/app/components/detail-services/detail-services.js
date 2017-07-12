(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .directive('detailServices', detailServices);

    function detailServices() {
        return {
            restrict: 'A',
            templateUrl: 'templates/components/detail-services/detail-services.html',
            replace: true,
            scope: {
                data: '='
            },

            link: function (scope, element, attrs) {
                scope.showDetail = false;

                scope.showDetailEvent = function() {
                    scope.showDetail = !scope.showDetail;
                }

                scope.detalle = scope.data.detalle;
                scope.detalle.teléfono = '(03464) ' + scope.data.tel;

                scope.phone = '03464' + scope.data.tel.replace('(03464)', '').replace('-', '').replace(/ /g, '');
                scope.map = scope.data.detalle.mapa;


                scope.getLabel = function (index) {
                    return Object.keys(scope.detalle)[index] + ':  ';
                };
            }
        }
    };
})();