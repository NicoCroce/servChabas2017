(function () {
    'use strict'
    angular
        .module('chabasHoy')
        .factory('modal', modal);

    function modal($rootScope) {

        var modalData= {};

        return {
            showModal: showModal,
            closeModal: closeModal,
            setModal: setModal,
            setData: setData,
            getData: getData
        }

        function setModal(path, id) {
            var modal = {
                path: path,
                id: id
            };

            $rootScope.$broadcast('setModal', modal);
        }

        function showModal(id){
            $rootScope.$broadcast('openModal', { id: id });
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
