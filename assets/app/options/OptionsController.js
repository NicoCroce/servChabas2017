(function(){
    'use strict'
    angular
        .module('servicios-chabas')
        .controller('OptionsController', OptionsController);

    function OptionsController ($scope){
        $scope.modal = {
            showModalAdd: false
        };
    };
})();
