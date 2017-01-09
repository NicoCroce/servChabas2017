(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .directive('stackElement', stackElement)
    stackElement.inject = ['$window'];

    function stackElement($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {                
                var offsetTop = element.offsetTop; // get element's offset top relative to document

                $document.on('scroll', function () {
                    if ($window.scrollY >= offsetTop) {
                        console.log('stack');
                        /* element.addClass(topClass);*/
                    } else {
                        console.log('NO stack');
                        /* element.removeClass(topClass);*/
                    }
                });
            }
        };
    };
})();
