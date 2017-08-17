(function () {
    'use strict'
    angular
        .module('backend')
        .directive('blockInfo', dataBlock);

    function dataBlock($compile) {
        return {
            link: function (scope, element, $attr) {
                /* var dataLength = Object.keys(JSON.parse($attr.currentInfo)).length; */
                var currentPath = "";
                 var currentIndex = $attr.currentIndex; 

                 angular.forEach(JSON.parse($attr.currentInfo), function(obj, index){
                     currentPath = $attr.rootJson + "['"+currentIndex+"']" + '.' + index;   /*   */
                    addItem(currentPath);
                })

                function addItem(model) {
                    var template = '<input ng-model='+currentPath+'>';
                    var linkFn = $compile(template);
                    var content = linkFn(scope);
                    element.append(content);
                }  

                /* $templateRequest('index.html').then(function (tpl) { */

                /* var htmlElement = '<input ng-model="nico">';
                var addMe = angular.element(htmlElement);
                element.after($compile(addMe)(scope));
                scope.$apply(); */
                /* }); */
            }
        }
    };
})();
