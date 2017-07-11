(function () {
    'use strict';
    angular.module('googleAnalytics', [])
        .run(function ($rootScope, GAnalytics) {
            GAnalytics.pageView();
        })
        .service('GAnalytics', GAnalytics);

    function GAnalytics($rootScope) {

        window.addEventListener('hashchange', function (e) {
            pageView();
        });

        return {
            pageView: pageView
        }

        function pageView() {
            var path = window.location.hash.replace('#!', '');
            console.log('ver:' + path);
            try {
                dataLayer.push({
                    'IDanalytics': 'UA-96039991-1',
                    'event': 'virtualPageView',
                    'dataView': {
                        'path': path
                    }
                });
            } catch (e) {
                console.log('Error al enviar datos: ' + e);
            }
        };
    };
})();