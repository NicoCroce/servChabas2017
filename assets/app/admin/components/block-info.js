(function () {
    'use strict'
    angular
        .module('backend')
        .directive('blockInfo', dataBlock);

    function dataBlock($compile) {
        return {
            scope: {
                currentInfo: '=',
                rootJson: '@'
            },
            link: function (scope, element, $attr) {
                /* var dataLength = Object.keys(JSON.parse($attr.currentInfo)).length; */
                var template;
                var content;

                scope.$watch('currentInfo', function (newValue) {
                    if (newValue) {
                        init();
                    }
                });

                function init() {
                    if (content) { content.remove(); }
                    template = '';
                    angular.forEach(scope.currentInfo, function (obj, index) {
                        createBlock(obj, scope.rootJson + "['" + index + "']");
                    });
                    var linkFn = $compile(template);
                    content = linkFn(scope.$parent);
                    element.append(content);
                }


                function createBlock(blockInfo, rootModel) {
                    if (blockInfo.nombre) {
                        template += '<div class="element-edit"><h1 ng-bind="' + rootModel + '.nombre' + '"></h1>';
                    } else {
                        template += '<div class="element-edit">';
                    }
                    angular.forEach(blockInfo, function (obj, index) {
                        var currentPath = rootModel + '.' + index;   /*   */
                        if (typeof (obj) == 'object') {
                            addObjectLevel(index);
                            analizeObject(obj, currentPath);
                            template += '</div>';
                        } else {
                            addItem(index, currentPath);
                        }
                    });
                    template += '</div>'
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
                        /* if (typeof (currentObject) == 'object') {
                            addObjectLevel(index);
                            analizeObject(currentObject, subPath)
                        } else { */
                        addItem(index, ngPath + '.' + index);
                        /* } */
                    });
                };

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
