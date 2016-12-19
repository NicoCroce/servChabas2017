(function(){
    'use strict';

    angular
    .module('app')
    .config(['$qProvider', '$stateProvider', '$urlRouterProvider', function ($qProvider, $stateProvider, $urlRouterProvider){
        $qProvider.errorOnUnhandledRejections(false);
        $urlRouterProvider.otherwise('/home');
        
        $stateProvider
            // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
                url: '/home',
                templateUrl: '../partials/home/home.html',
                controller: 'HomeController'
            })
            
            // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
            .state('about', {
                // we'll get to this in a bit       
            });
    }]);
})();


