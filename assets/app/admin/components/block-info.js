(function () {
    'use strict'
    angular
        .module('backend')
        .directive('blockInfo', dataBlock);

    function dataBlock($compile) {
        return {
            link: function (scope, element, $attr) {
                /* var dataLength = Object.keys(JSON.parse($attr.currentInfo)).length; */
                var currentIndex = $attr.currentIndex;
                var template;
                var content;
                scope.currentInfo = $attr.currentInf;

                function init() {
                    template = '';
                    console.log($attr.currentInfo);
                    angular.forEach(JSON.parse($attr.currentInfo), function (obj, index) {
                        var currentPath = $attr.rootJson + "['"+currentIndex+"']" + '.' + index;   /*   */
                        if (typeof (obj) == 'object') {
                            addObjectLevel(index);
                            analizeObject(obj, currentPath);
                            template += '</div>';
                        } else {
                            addItem(index, currentPath);
                        }
                    });
                    var linkFn = $compile(template);
                    content = linkFn(scope);
                    element.append(content);
                };

                function addItem(label, currentPath) {
                    template += '<div><label>' + label + '</label><input ng-model=' + currentPath + '></div>';
                    /*  */
                }

                function addObjectLevel(label) {
                    template += '<div class="sub-detail"><label>' + label + '</label>';
                }

                function analizeObject(obj, ngPath) {
                    var subPath;
                    angular.forEach(obj, function (currentObject, index) {
                        subPath = ngPath + '.' + index;   /*   */
                        /* if (typeof (obj) == 'object') {

                        } else { */
                        addItem(index, subPath);
                        /* } */
                    });
                }

                scope.$watch('currentInfo', function(){
                    if(content) {
                        console.log('se elimina');
                        content.remove();
                        init();
                    }
                });

                init();

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
