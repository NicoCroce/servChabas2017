(function () {
    'use strict';
    angular.module('googleAnalytics', [])
        .run(function ($rootScope, GAnalytics) {
            GAnalytics.pageView();
        })
        .service('GAnalytics', GAnalytics);

    function GAnalytics($rootScope) {

        var stores = {
            'prod': 'UA-97821011-1',
            'desa': 'UA-96039991-2',
        };

        var IdAnalytics = stores['desa'];

        if (window.location.hostname == 'chabashoy.com.ar') {
            IdAnalytics = stores['prod'];
        };

        if (angular.isUndefinedOrNullOrEmpty(IdAnalytics)) {
            return;
        } else {
            dataLayer.push({
                'IDanalyticsSet': IdAnalytics
            });

            window.addEventListener('hashchange', function (e) {
                pageView();
            });
        }

        return {
            pageView: pageView
        }

        function pageView() {
            var path = window.location.hash.replace('#!', '');
            console.log('ver:' + path);
            try {
                dataLayer.push({
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