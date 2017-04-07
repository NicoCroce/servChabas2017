(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .directive('accordionElement', accordionElement)
    accordionElement.$inject = [];

    function accordionElement() {
        return {
            restrict: 'A',
            scope: {
                elementToShrink: "@",
                maxHeight: "@"
            },
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    var isClosed = !angular.element(element).hasClass('accordion-is-open');
                   /* var allButtons = document.querySelectorAll('.accordion-button');
                    allButtons.forEach(function(button) {
                        angular.element(button).removeClass('accordion-is-open');
                    });*/

                    $(".accordion-button").each(function (index, obj) {
                        angular.element(obj).removeClass("accordion-is-open");
                    });

                    $(".accordion-element").each(function (index, obj) {
                        angular.element(obj).css({ "max-height": '0' });
                    });

                    var elementToShirk = angular.element(document.querySelector('#' + scope.elementToShrink));
                    if(isClosed) {
                        elementToShirk.css({ "max-height": scope.maxHeight + 'px' });
                        element.addClass('accordion-is-open');
                    } else {
                        elementToShirk.css({ "max-height": '0' });
                    }
                    isClosed = !isClosed;
                });
            }
        };
    };
})();