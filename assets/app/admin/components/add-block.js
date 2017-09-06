(function(){
    'use strict'
    angular
        .module('backend')
        .directive('addBlock', addBlock);

    function addBlock (newElement){
        return {
            restrict: 'A',
            templateUrl: 'templates/admin/components/add-block.html',
            replace: false,
            scope: {
               newElement: "=",
               serviceType: "@",
               aceptElement: "=",
               cancelElement: "="
            },
            link: function (scope, element, attrs) {
                scope.tempNewElement;

                scope.$watch('serviceType', function(){
                    scope.tempNewElement = {
                        newObject: newElement[scope.serviceType]
                    };
                });

                scope.addElement = function(){
                    scope.aceptElement(scope.tempNewElement.newObject);
                }
            }
        }
};
})();
