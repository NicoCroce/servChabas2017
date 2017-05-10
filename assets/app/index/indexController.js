(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('IndexController', IndexController);

    function IndexController($scope, factoryIndex, $rootScope, utilsComponents, $state, services) {
        $scope.showModalBool = false;
        $scope.htmlToAdd = '';

        $scope.modal = {
            showModal: false
        };

        $scope.closeModal = function () {
            $scope.modal.showModal = false;
            $rootScope.modalIsOpen = false;
        };

        $scope.showNav = function() {
            if (window.location.hash.toString().replace('#!/', '').indexOf('home') >= 0) {
                return false;
            }
            return !$rootScope.backSectionVisible;
        }

        $scope.tabs = {
            tabArray: [
                { 'url': 'farmacias', 'icon': 'icon-pil', 'text': '', 'fontSize': 'fs-23' },
                { 'url': 'colectivos.list', 'icon': 'icon-bus', 'text': '', 'fontSize': 'fs-20' },
                { 'url': 'servicios.list', 'icon': 'icon-list2', 'text': '', 'fontSize': '' },
                { 'url': 'fespal', 'icon': '', 'text': 'FESPAL', 'fontSize': 'bold' },
                { 'url': 'menu', 'icon': 'icon-options-v', 'text': '', 'fontSize': '' }
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
                localStorage.setItem("showAddHomeModal", false);
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

        $scope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                $rootScope.backSectionVisible = utilsComponents.showBack();
            });

        $scope.backSection = function () {
            if (window.location.hash.indexOf('servicios') >= 0) {
                return $state.go('servicios.list');
            } else if (window.location.hash.indexOf('colectivos') >= 0) {
                return $state.go('colectivos.list');
            } else {
                $state.go('home');
            }
        }
        
        services.init();
    };
})();