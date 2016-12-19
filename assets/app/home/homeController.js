(function(){
	'use strict';

	angular
	.module('app')
	.controller('HomeController', ['$scope', function ($scope){
		$scope.message = "Hello Angular nico";
	}]);
})();