(function(){
    'use strict';

    angular
        .module('servicios-chabas')
        .run(['$rootScope', function ($rootScope) {
            $rootScope.loadingService = true;
        }])
        .config(['$qProvider', '$stateProvider', '$urlRouterProvider', function ($qProvider, $stateProvider, $urlRouterProvider){
            $qProvider.errorOnUnhandledRejections(false);
            $urlRouterProvider.otherwise('/home');
            
            $stateProvider
                // HOME STATES AND NESTED VIEWS ========================================
                .state('home', {
                    url: '/home',
                    templateUrl: '../templates/home/home.html',
                    controller: 'HomeController'
                })
                .state('farmacias', {
                    url: '/farmacias',
                    templateUrl: '../templates/farmacias/farmacias.html',
                    controller: 'PharmacyController'
                })
                .state('colectivos', {
                    url: '/colectivos',
                    templateUrl: '../templates/colectivos/colectivos.html',
                    controller: 'BusesController'
                })
                .state('servicios', {
                    url: '/servicios',
                    templateUrl: '../templates/servicios/servicios.html',
                    controller: 'ServicesController'
                })
                // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
                .state('about', {
                    // we'll get to this in a bit       
                });
        }]);
})();


