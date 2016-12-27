(function(){
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('BusesController', BusesController);
    
        BusesController.$inject = ['factoryBus'];
        
        function BusesController(factoryBus) {
            factoryBus.getBuses();
        }
})();