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

                scope.data.detalle.teléfono = '(03464) ' + scope.data.tel;
                scope.data.detalle.phone = '03464' + scope.data.tel.replace('(03464)', '').replace('-', '').replace(/ /g, '');
                scope.data.detalle.map = row.mapa;
                scope.data.detalle.showModal = true;
                $rootScope.detalleIsOpen = true;

                scope.getLabel = function (detail, index) {
                    return Object.keys(detail)[index];
                };
            }
        }
    };
})();