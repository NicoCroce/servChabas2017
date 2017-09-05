(function(){
    'use strict'
    angular
        .module('backend')
        .directive('addBlock', addBlock);

    function addBlock (){
        return {
            restrict: 'A',
            templateUrl: 'templates/admin/components/add-block.html',
            replace: false,
            scope: {
               newElement: "=" 
            },
            link: function (scope, element, attrs) {
            }
        }
};
})();
