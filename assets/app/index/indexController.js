(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('IndexController', IndexController);
    IndexController.$inject = ['$scope', 'factoryIndex'];

    function IndexController($scope, factoryIndex) {

        $scope.tabs = {
            tabArray: [
                { 'url': 'farmacias', 'icon': 'icon-pil', 'text': 'farmacia' },
                { 'url': 'colectivos', 'icon': 'icon-bus', 'text': 'colectivos' }, //Si quiero una URL externa utilizo // antes //www.google.com
                { 'url': 'servicios', 'icon': 'icon-list2', 'text': 'servicos' }
            ],
            tabSelected: factoryIndex.setTab()
        };

    };
})();