(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .directive('transition', transition);

    function transition($rootScope, $timeout) {
        return {
            restrict: 'A',
            replace: false,
            link: function (scope, element, attrs) {

                var section = angular.element(element);
                section.addClass("content-transition");

                $rootScope.$on('$stateChangeStart',
                    function (event, toState, toParams, fromState, fromParams) {
                        section.removeClass('anim-in-section');
                    });

                /* $timeout(function () { */
                   
                        setInterval(function(){
                             if(!$rootScope.loadingService) {
                                return section.addClass('anim-in-section');
                             }
                        }, 100);
                    /*scope.$apply();*/
            }
        }
    };
})();
