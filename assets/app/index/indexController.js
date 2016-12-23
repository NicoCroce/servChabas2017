(function(){
    'use strict';
    angular
        .module('servicios-chabas')
        .controller('IndexController', ['$scope', function ($scope) {
            $scope.tabs = {
                tabArray :  [
                    { 'url': '#!', 'text': 'google' },
                    { 'url': '#!', 'text': 'ver' }, //Si quiero una URL externa utilizo // antes //www.google.com
                    { 'url': '#!', 'text': 'nico' }
			    ],
                tabSelected : 0
            } 

            
        }]);
})();