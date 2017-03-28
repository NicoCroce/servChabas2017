(function(){
    'use strict'
    angular
        .module('servicios-chabas')
        .factory('analytics', analytics);

    function analytics (){
        return {
            pageview: pageview,
            sendClick: sendClick
        }

        function pageview (label, category) {
            if (!category) { category = 'Button' }
            ga('send', {
                hitType: 'pageview',
                eventCategory: category,
                eventAction: 'click',
                eventLabel: label,
                page: location.hash.replace('#!', ''),
                location: location.href
            });
        }

        function sendClick(label, category) {
            if (!category) { category = 'Button' }
            ga('send', {
                hitType: 'event',
                eventCategory: category,
                eventAction: 'click',
                eventLabel: label,
                page: location.hash.replace('#!', ''),
                location: location.href
            });
        };
};
})();


