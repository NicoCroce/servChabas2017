(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .directive('addModal', addModal);

    function addModal($rootScope, modal) {
        return {
            restrict: 'A',
            replace: false,

            link: function (scope, element, attrs) {

                var modalSection = [];

                $rootScope.$on('setModal', function (event, modalElement) {
                    $("#" + attrs.id).load(modalElement.path);
                    modalSection.push(modalElement.id);

                    /*setTimeout(function () {
                        scope.showModalBool = true;
                        $rootScope.modalIsOpen = true;
                        scope.$apply();
                    }, 100)*/
                });

                $rootScope.$on('openModal', function (event, modalElement) {
                    scope.modal = modal.getData();
                    $("#" + modalElement.id).addClass('show-modal-element');
                });

                $rootScope.$on('closeModal', function () {
                    scope.showModalBool = false;
                    $rootScope.modalIsOpen = false;
                    setTimeout(function () {
                        scope.htmlToAdd = '';
                        scope.$apply();
                    }, 100)
                })
            }
        }
    };
})();
