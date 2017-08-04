(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .directive('circle', circle);

    function circle() {
        return {
            restrict: 'A',
            templateUrl: 'templates/components/circle/circle.html',
            replace: true,
            scope: {
            },
            link: function (scope, element, attrs) {
                var maxPorcentage = 80;
                scope.maxPorcentage = 0;
                scope.porcentage = 0;

                scope.color = '';

                var idInterval = setInterval(function () {
                    scope.porcentage += 5;
                    scope.$apply();
                    /* console.log(scope.porcentage); */
                    if (scope.porcentage >= scope.maxPorcentage) {
                        scope.porcentage = scope.maxPorcentage;
                        scope.$apply();
                        setColor()
                        clearInterval(idInterval);
                    }
                    setColor();
                }, 100)

                setTimeout(function () {
                    scope.maxPorcentage = maxPorcentage;
                    scope.$apply();
                }, 40);

                function setColor() {
                    scope.color = (scope.porcentage <= 30 ) ? 'bg-red' :
                        (scope.porcentage <= 60) ? 'bg-yellow' : 'bg-green';
                    /*                               (scope.porcentage >= 30) ? 'bg-red' :
                                                  (scope.porcentage >= 30) ? 'bg-red' : */
                }
            }

        }
    };
})();
