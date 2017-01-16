(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .directive('accordionElement', accordionElement)
    accordionElement.inject = [];

    function accordionElement() {
        return {
            restrict: 'A',
            scope: {
                elementToShrink: "@",
                maxHeight: "@"
            },
            link: function (scope, element, attrs) {
                var isClosed = true;
                element.on('click', function () {
                    var elementToShirk = angular.element(document.querySelector('#' + scope.elementToShrink));
                    (isClosed) ? elementToShirk.css({ "max-height": scope.maxHeight + 'px' }) : elementToShirk.css({ "max-height": '0' });
                    element.toggleClass('accordion-is-open');
                    console.log(element);
                    isClosed = !isClosed;
                });
            }
        };
    };
})();