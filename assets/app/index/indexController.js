(function(){
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('IndexController', ['$scope', function ($scope) {
            $scope.tabs = {
                tabArray :  [
                    { 'url': 'farmacias', 'icon': 'icon-pil',  'text': 'farmacia' },
                    { 'url': 'home', 'icon': 'icon-bus', 'text': 'colectivos' }, //Si quiero una URL externa utilizo // antes //www.google.com
                    { 'url': '#!', 'icon': 'icon-list2', 'text': 'servicos' }
			    ],
                tabSelected : 0
            } 

            
        }]);
})();