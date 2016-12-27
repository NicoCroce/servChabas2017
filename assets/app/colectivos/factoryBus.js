(function(){
    'use strict';
    angular
	    .module('servicios-chabas')
        .factory('factoryBus', factoryBus);

        function factoryBus($resource) {
            return {
                getBuses: getBuses
            }

            function getBuses(){
                var mivar = $resource('../data/rosario.json').get().$promise;
                return mivar;
            }
        }
})();