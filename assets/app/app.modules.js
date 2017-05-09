(function () {
    'use strict';

    angular
        .module('servicios-chabas')
        .run(function ($rootScope, analytics, services) {
            $rootScope.backSectionVisible = false;
            $rootScope.loadingService = true;
            $rootScope.modalIsOpen = false;
            analytics.pageview('/home');

            if (typeof (Storage) !== "undefined" && !localStorage.getItem("showAddHomeModal")) {
                localStorage.setItem("showAddHomeModal", true);
                localStorage.setItem("showModalUpdate.1", true);
            }
        })
        .config(['$qProvider', '$stateProvider', '$urlRouterProvider', function ($qProvider, $stateProvider, $urlRouterProvider) {
            $qProvider.errorOnUnhandledRejections(false);
            $urlRouterProvider.otherwise('/home');

            $stateProvider
                // HOME STATES AND NESTED VIEWS ========================================
                .state('home', {
                    url: '/home',
                    templateUrl: 'templates/home/home.html',
                    controller: 'HomeController'
                })
                .state('farmacias', {
                    url: '/farmacias',
                    templateUrl: 'templates/farmacias/farmacias.html',
                    controller: 'PharmacyController'
                })


                .state('colectivos', {
                    abstract: true,
                    url: '/colectivos',
                    templateUrl: 'templates/colectivos/colectivosPrincipal.html',
                    controller: 'BusesMainController'
                })
                .state('colectivos.list', {
                    url: '/list',
                    templateUrl: 'templates/colectivos/colectivos.html',
                    controller: 'BusesController'
                })
                .state('colectivos.chabas-rosario', {
                    url: '/chabas-rosario/:back',
                    templateUrl: 'templates/colectivos/colectivosHorarios.html',
                    controller: 'BusesScheduleController'
                })
                .state('colectivos.chabas-firmat', {
                    url: '/chabas-firmat/:back',
                    templateUrl: 'templates/colectivos/colectivosHorarios.html',
                    controller: 'BusesScheduleController'
                })
                .state('colectivos.rosario-chabas', {
                    url: '/rosario-chabas/:back',
                    templateUrl: 'templates/colectivos/colectivosHorarios.html',
                    controller: 'BusesScheduleController'
                })


                .state('servicios', {
                    abstract: true,
                    url: '/servicios',
                    templateUrl: 'templates/servicios/serviciosPrincipal.html',
                    controller: 'ServicesController'
                })
                .state('servicios.list', {
                    url: '/list',
                    templateUrl: 'templates/servicios/servicios.html'
                })
                .state('servicios.instituciones', {
                    url: '/instituciones/:back',
                    templateUrl: 'templates/servicios/serviciosList.html',
                    controller: 'ServicesListController'
                })
                .state('servicios.remises', {
                    url: '/remises/:back',
                    templateUrl: 'templates/servicios/serviciosList.html',
                    controller: 'ServicesListController'
                })
                .state('servicios.rotiserias', {
                    url: '/rotiserias/:back',
                    templateUrl: 'templates/servicios/serviciosList.html',
                    controller: 'ServicesListController'
                })
                .state('servicios.telefonos', {
                    url: '/telefonos/:back',
                    templateUrl: 'templates/servicios/telefonos/serviciosTelefonos.html',
                    controller: 'ServicesTelefonosController'
                })


                .state('menu', {
                    url: '/menu',
                    templateUrl: 'templates/options/options.html',
                    controller: 'OptionsController'
                })
                // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
                .state('about', {
                    // we'll get to this in a bit       
                });
        }]);
})();