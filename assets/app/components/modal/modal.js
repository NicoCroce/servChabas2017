(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .factory('modal', modal);

    function modal($rootScope) {

        var modalData= {};

        return {
            showModal: showModal,
            closeModal: closeModal,
            setData: setData,
            getData: getData
        }

        function showModal(path){
            $rootScope.$broadcast('openModal', { path: path });
        }

        function closeModal(){
            $rootScope.$broadcast('closeModal');
        }

        function setData(data) {
            modalData = data;
        };
        function getData() {
            return modalData;
        };

    };
})();
