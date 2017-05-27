(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .factory('factoryIndex', factoryIndex);

    function factoryIndex($resource) {
        return {
            setTab: setTab
        }

        function setTab() {
            var section = window.location.hash.toString().replace('#!/', ''),
                index = 0;
                
            if (section.indexOf('farmacias') >= 0) {
                return index = 0;
            };
                
            if (section.indexOf('colectivos') >= 0) {
                return index = 1;
            };
            
            if (section.indexOf('servicios') >= 0) {
                return index = 2;
            };

            if (section.indexOf('stack') >= 0) {
                return index = 3;
            };

            if (section.indexOf('menu') >= 0) {
                return index = 4;
            };

            return index;
        };
    }
})();