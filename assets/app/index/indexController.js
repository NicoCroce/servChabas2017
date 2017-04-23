(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('IndexController', IndexController);

    function IndexController($scope, factoryIndex, $rootScope) {
        $rootScope.loadingService = false;
        $scope.showModalBool = false;
        $scope.htmlToAdd = '';

        $scope.modal = {
            showModal: false
        };

        $scope.closeModal = function () {
            $scope.modal.showModal = false;
            $rootScope.modalIsOpen = false;
            if (typeof (Storage) !== "undefined") {
                localStorage.setItem("showAddHomeModal", false);
            }
        };

        $scope.tabs = {
            tabArray: [
                { 'url': 'farmacias', 'icon': 'icon-pil', 'text': 'farmacias' },
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

        setTimeout(function () {
            var getShowModal;

            if (typeof (Storage) !== "undefined") {
                getShowModal = localStorage.getItem("showAddHomeModal");
            } else {
                $rootScope.modalIsOpen = true;
                getShowModal = true;
            }
            $scope.modal.showModal = getShowModal == "true";
            if ($scope.modal.showModal) {
                $rootScope.modalIsOpen = true;
            }
            $scope.$apply();
        }, 1000);
    };
})();