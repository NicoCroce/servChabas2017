(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .directive('facebookWall', facebookWall);

    function facebookWall() {
        return {
            restrict: 'A',
            templateUrl: '../templates/components/facebook/facebookWall.html',
            replace: false,
            link: function (scope, element, attrs) {
                (function (d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.9&appId=289764814382364";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            }
        }
    };
})();
