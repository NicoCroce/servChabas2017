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
                scope.tempNewElement = {
                    newObject: {}
                };
                angular.copy(newElement[scope.serviceType], scope.tempNewElement.newObject);

                scope.$watch('serviceType', function(){
                    angular.copy(newElement[scope.serviceType], scope.tempNewElement.newObject);
                });

                /* scope.$watch('newElement', function (newValue) {
                    angular.copy(newElement[scope.serviceType], scope.tempNewElement.newObject);
                }, true);
 */
                scope.addElement = function(){
                    scope.aceptElement(scope.tempNewElement.newObject);
                    scope.$broadcast('delContent');
                }
            }
        } 
};
})();
