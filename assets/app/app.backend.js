(function () {
    'use strict';

    angular
        .module('backend')
        .config(['$qProvider', '$stateProvider', '$urlRouterProvider', function ($qProvider, $stateProvider, $urlRouterProvider) {
            $qProvider.errorOnUnhandledRejections(false);
/*            $urlRouterProvider.otherwise('/home');*/

            $stateProvider
                // HOME STATES AND NESTED VIEWS ========================================
                .state('backend', {
                    abstract: true,
                    url: '/backend',
                    template: '<ui-view/>'
                })
                .state('backend.list', {
                    url: '/list',
                    templateUrl: 'templates/admin/home/homeBackend.html',
                    controller: 'ServicesControllerBackend'
                })

                .state('backend.colectivos', {
                    url: '/colectivos/:back',
                    templateUrl: 'templates/admin/colectivos/colectivosAdmin.html',
                    controller: 'ControllerColectivosAdmin'
                })
                
                .state('backend.servicios', {
                    url: '/servicios/:back',
                    templateUrl: 'templates/admin/servicios/serviciosAdmin.html',
                    controller: 'ControllerServiciosAdmin'
                })

                .state('backend.farmacias', {
                    url: '/farmacias/:back',
                    templateUrl: 'templates/admin/farmacias/farmaciasAdmin.html',
                    controller: 'ControllerFarmaciasAdmin'
                })

        }]);
})();
/*
templates / admin / home / homeBackend.html*/