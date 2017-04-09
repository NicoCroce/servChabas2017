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

                $timeout(function () {
                    section.addClass('anim-in-section');
                    scope.$apply();
                }, 300);
            }
        }
    };
})();
