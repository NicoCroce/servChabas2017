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
                { 'url': 'options', 'icon': 'icon-options-v', 'text': '' }
            ],
            tabSelected: factoryIndex.setTab()
        };

        $rootScope.$on('openModal', function (event, path) {
            $scope.htmlToAdd = path.path;

            setTimeout(function(){
                $scope.showModalBool = true;
                $rootScope.modalIsOpen = true;
                $scope.$apply();
            }, 100)
        });

        $rootScope.$on('closeModal', function(){
            $scope.showModalBool = false;
            $rootScope.modalIsOpen = false;
            setTimeout(function () {
                $scope.htmlToAdd = '';
                $scope.$apply();
            }, 100)
        })

        setTimeout(function () {
            $rootScope.loadingService = false;
            $scope.$apply();
        }, 500);

    };
})();