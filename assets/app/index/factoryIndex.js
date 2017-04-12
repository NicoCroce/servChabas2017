(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .factory('factoryIndex', factoryIndex);
    factoryIndex.$inject = ['$resource'];

    function factoryIndex($resource) {
        return {
            setTab: setTab
        }

        function setTab() {
            var section = window.location.hash.toString().replace('#!/', ''),
                index = 0;
            switch (section) {
                case 'farmacias':
                    index = 0;
                    break;
                case 'colectivos':
                    index = 1;
                    break;
                case 'servicios':
                    index = 2;
                    break;
                case 'menu':
                    index = 3;
                    break;
                default:
                    break;
            }

            return index;
        };
    }
})();