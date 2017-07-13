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

                scope.actions = {
                    phone: '03464' + scope.data.tel.replace('(03464)', '').replace('-', '').replace(/ /g, ''),
                    map: scope.data.mapa
                };

                scope.mobileCheck = function () {
                    return window.mobilecheck();
                }

                scope.showDetailEvent = function () {
                    scope.showDetail = !scope.showDetail;
                }

                scope.detalle = scope.data.detalle;
                scope.detalle.teléfono = '(03464) ' + scope.data.tel;

                scope.getLabel = function (index) {
                    return Object.keys(scope.detalle)[index] + ':  ';
                };

                angular.element(function (hola) {
                    console.log(hola);
                })
            }
        }
    };
})();