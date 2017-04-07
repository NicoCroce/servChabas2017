(function(){
    'use strict'
    angular
        .module('servicios-chabas')
        .controller('OptionsController', OptionsController);

    function OptionsController ($scope, modal){
        $scope.showModal = function () {
            modal.showModal('../templates/servicios/addService.html');
        }
    };
})();
