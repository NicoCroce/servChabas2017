(function () {
    'use strict';
    angular
        .module('servicios-chabas')
        .directive('mediaController', mediaController);

    function mediaController(analytics) {
        return {
            restrict: 'A',
            templateUrl: 'templates/components/media/media.html',
            replace: false,
            scope: {
                config: '='
            },
            link: function (scope, element, attrs) {
                
                setTimeout(function() {
                    var player = document.getElementById('musicPlayer_' + scope.config.id);
                    player.volume = "0.3";

                    player.controls = false;

                    scope.play_aud = function () {
                        if (player.paused) {
                            player.play();
                            scope.config.isPlaying = true;
                        } else {
                            player.pause();
                            scope.config.isPlaying = false;
                        }
                        scope.config.cbStop(scope.config.id);
                    };

                    scope.change_vol = function () {
                        player.volume = document.getElementById("change_vol").value;
                    };
                }, 500)
            }
        }
    }
})();
