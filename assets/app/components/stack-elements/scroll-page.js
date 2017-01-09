(function(){
    'use strict'
    angular
        .module('servicios-chabas')
        .directive('detectScroll', detectScroll)
    detectScroll.inject = ['$window'];

    function detectScroll ($window){
        return function(scope, element, attrs){
            angular.element($window).bind("scroll", function(scope, element, attrs) {
                console.log(this.window.scrollY);
            });

           /* $(element).bind("DOMSubtreeModified", function () {
                setValues();
            });

            scope.$on('$viewContentLoaded', function() {
                setValues();
            });

            function setValues(){
                var heightWindow = $(window).height();
                scope.$apply();
            }*/
        }
};
})();
