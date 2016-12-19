angular
    .module('servicios-chabas', ['ngRoute']);

// app.js
// var serviceApp = angular.module('servicios-chabas', ['ui.router']);

// serviceApp.config(['$qProvider', '$stateProvider', '$urlRouterProvider', function($qProvider, $stateProvider, $urlRouterProvider) {
//     $qProvider.errorOnUnhandledRejections(false);
//     $urlRouterProvider.otherwise('/home');
    
//     $stateProvider
//         // HOME STATES AND NESTED VIEWS ========================================
//         .state('home', {
//             url: '/home',
//             templateUrl: '../partials/home/home.html',
//             controller: 'MainController'
//         })
        
//         // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
//         .state('about', {
//             // we'll get to this in a bit       
//         });
// }]);



// serviceApp.controller('MainController',['$scope', function ($scope) {
//     $scope.message = "Hello Angular nico";
// }]);