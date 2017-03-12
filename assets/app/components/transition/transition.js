(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .directive('transition', transition);

    function transition($rootScope) {
        return {
            restrict: 'A',
            replace: false,
            link: function (scope, element, attrs) {

                var section = angular.element(element);
                section.addClass("content-transition");

                $rootScope.$on('$stateChangeStart',
                    function (event, toState, toParams, fromState, fromParams) {
                        sectionTransition();
                    });

                function sectionTransition() {
                    section.removeClass('anim-in-section');
                    setTimeout(function () {
                        section.addClass('anim-in-section');
                    }, 100);
                }
            }
        }
    };
})();
