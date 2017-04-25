(function(){
    'use strict';

    angular
        .module('servicios-chabas')
        .run(function ($rootScope, analytics) {
            $rootScope.loadingService = true;
            $rootScope.noHomeSection = window.location.hash.indexOf("home") >= 0;
            $rootScope.modalIsOpen = false;
            analytics.pageview('/home');
            window.addEventListener("hashchange", function (event) {
                $rootScope.noHomeSection = window.location.hash.indexOf("home") >= 0;
            });

            if (typeof (Storage) !== "undefined" && !localStorage.getItem("showAddHomeModal")) {
                localStorage.setItem("showAddHomeModal", true);
                localStorage.setItem("showModalUpdate", true);
            }
        })
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
                .state('menu', {
                    url: '/menu',
                    templateUrl: '../templates/options/options.html',
                    controller: 'OptionsController'
                })
                // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
                .state('about', {
                    // we'll get to this in a bit       
                });
        }]);
})();