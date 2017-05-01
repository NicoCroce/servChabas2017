(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .directive('stackElement', stackElement)

    function stackElement($window, $document, $state, $rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {                
                var offsetTop, // get element's offset top relative to document
                    stackPosition = null,
                    elementToMove = angular.element(document.getElementById(attrs.elementToMove));                

                $document.on('scroll', function () {
                    offsetTop = angular.element(element[0]).offset().top;
                    if ($window.scrollY >= offsetTop && stackPosition == null && $state.current.name != 'home' && !$rootScope.backSectionVisible) {
                        stackPosition = offsetTop;
                        angular.element(element[0]).addClass('stack-element-top');
                        elementToMove.addClass('element-stacked');
                        /*elementToMove.css({"position": "relative", "top": angular.element(element[0]).outerHeight() + 'px'});*/
                        scope.$apply();
                    } else if ($window.scrollY < stackPosition && stackPosition != null) {
                        stackPosition = null;
                        angular.element(element[0]).removeClass('stack-element-top');
                        elementToMove.removeClass('element-stacked');
                        /*elementToMove.css({"position": "relative", "top": "0"});*/
                        scope.$apply();
                    }
                });
            }
        };
    };
})();