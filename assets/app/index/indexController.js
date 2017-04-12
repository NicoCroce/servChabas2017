(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('IndexController', IndexController);

    function IndexController($scope, factoryIndex, $rootScope) {
        $rootScope.loadingService = false;
        $scope.showModalBool = false;
        $scope.htmlToAdd = '';

        $scope.tabs = {
            tabArray: [
                { 'url': 'farmacias', 'icon': 'icon-pil', 'text': 'farmacia' },
                { 'url': 'colectivos', 'icon': 'icon-bus', 'text': 'colectivos' },
                { 'url': 'servicios', 'icon': 'icon-list2', 'text': 'servicos' },
                { 'url': 'menu', 'icon': 'icon-options-v', 'text': '' }
            ],
            tabSelected: factoryIndex.setTab()
        };

        setTimeout(function () {
            $rootScope.loadingService = false;
            $scope.$apply();
        }, 500);

    };
})();