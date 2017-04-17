(function(){
    'use strict'
    angular
        .module('servicios-chabas')
        .factory('analytics', analytics);

    function analytics (){
        return {
            pageview: pageview
        }

        function pageview(currentPath) {
            dataLayer.push({
                'categoria': 'Google Analytics',
                'titulo': 'Introducción al dataLayer de Google Tag Manager',
                'event': 'nico',
                'path': currentPath
            });
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

