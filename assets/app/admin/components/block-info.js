(function () {
    'use strict'
    angular
        .module('backend')
        .directive('blockInfo', dataBlock);

    function dataBlock($compile) {
        return {
            scope: {
                currentInfo: '=',
                rootJson: '@',
                addElement: '@?'
            },
            link: function (scope, element, $attr) {
                /* var dataLength = Object.keys(JSON.parse($attr.currentInfo)).length; */
                var template;
                var content;

                var ObjectKeys, firstKey, lastKey;

                scope.$watch('currentInfo', function (newValue) {
                    if (newValue && (!scope.addElement || (scope.addElement && !content))) {
                        init();
                    }
                }, true);

                function init() {
                    if (content) { content.remove(); }

                    ObjectKeys = Object.keys(scope.currentInfo),
                        firstKey = ObjectKeys[0],
                        lastKey = ObjectKeys[ObjectKeys.length - 1];

                    template = '<div>';
                    angular.forEach(scope.currentInfo, function (obj, index) {
                        createBlock(obj, scope.rootJson + "['" + index + "']", index);
                    });
                    template += '</div>';
                    var linkFn = $compile(template);
                    content = linkFn(scope.$parent);
                    element.append(content);
                }

                function createBlock(blockInfo, rootModel, index) {

                    var templateDown = '<button ng-click="downLevel(\'' + index + '\')" class="icon-arrow_right bt-down"></button>',
                        templateUp = '<button ng-click="upLevel(\'' + index + '\')" class="icon-arrow_right bt-up"></button>',
                        templateControl = '';

                    if (!scope.addElement) {
                        if (index == firstKey) {
                            templateControl = templateDown;
                        } else if (index == lastKey) {
                            templateControl = templateUp;
                        } else {
                            templateControl = templateUp + templateDown;
                        }
                        templateControl = '<div class="control-block">' + templateControl + '</div>';
                    } else {
                        templateControl = '<div class="control-file"><button class="button" ng-click="cancelElement()">cancelar</button>'
                            + '<button class="button" ng-click="addElement()">guardar</button></div>';
                    }


                    if (blockInfo.nombre) {
                        template += '<div class="element-edit"><h1 ng-bind="' + rootModel + '.nombre' + '"></h1><div class="block-content">';
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
                    template += templateControl;
                    template += '</div>';
                    template += '</div>';
                };

                function addItem(label, currentPath) {
                    template += '<div><label>' + label + '</label><input ng-model=' + currentPath + '></div>';
                    /*  */
                }

                function addObjectLevel(label) {
                    template += '<div class="sub-detail"><label>' + label + '</label>';
                }

                scope.$on('delContent', function(){
                    if (content && scope.addElement) { content.remove(); }
                });

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
