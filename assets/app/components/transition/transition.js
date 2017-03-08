(function(){
    'use strict'
    angular
        .module('servicios-chabas')
        .directive('transition', transition);

    function transition (){
        return {
            restrict: 'A',
            replace: false,
            link: function (scope, element, attrs) {
                window.addEventListener("hashchange", function (event) {
                    debugger;
                    console.log('ver');
                    var section = angular.element(element);
                    section.removeClass('anim-in-section');
                    setTimeout(function(){
                        section.addClass('anim-in-section');
                    }, 1000);
                });
            }
        }
};
})();
