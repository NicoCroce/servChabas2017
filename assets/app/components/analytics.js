(function () {
    'use strict'
    angular
        .module('servicios-chabas')
        .factory('analytics', analytics);

    function analytics() {

        var path = '';

        return {
            pageview: pageview
        }

        function pageview(currentPath) {
            if (path != currentPath) {
                path = currentPath;
                return dataLayer.push({
                    'event': 'virtualPageView',
                    'dataView': {
                        'IDanalytics': 'UA-96039991-1',
                        'path': currentPath
                    }
                });
            }

            /* ga(function (tracker) {
                 // Sets the page field to "/about.html".
                 tracker.set('page', currentPath);
                 tracker.send('pageview');
             });*/
            /*if (!category) { category = 'Button' }
            ga('send', {
                hitType: 'pageview',
                eventCategory: category,
                eventAction: 'click',
                eventLabel: label,
                page: location.hash.replace('#!', ''),
                location: location.href
            });*/


        }

        /* function sendClick(label, category) {
             if (!category) { category = 'Button' }
             ga('send', {
                 hitType: 'event',
                 eventCategory: category,
                 eventAction: 'click',
                 eventLabel: label,
                 page: location.hash.replace('#!', ''),
                 location: location.href
             });
         };*/
    };
})();

