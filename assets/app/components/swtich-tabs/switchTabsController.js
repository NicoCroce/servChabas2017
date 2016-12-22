/* recommended */
/* spinner.directive.js */

/**
* @desc spinner directive that can be used anywhere across apps at a company named Acme
* @example <div acme-shared-spinner></div>
*/
'use strict';
angular
    .module('servicios-chabas')
    .directive('switchTabs', switchTabs);

function switchTabs() {
	return {
	    restrict: 'A',
	    templateUrl: '../templates/components/swtich-tabs/switch-tabs.html',
	    replace: false,
	    scope: {
	        tabs: '=?switchTabsArray',
	        tabSelected: '=?switchTabSelected'
	    },
	    controller: function ($scope) {
	    	$scope.tabs = [
	    		{'url': 'www.google.com', 'text': 'google'},
	    		{'url': 'www.google.com', 'text': 'ver'},
	    		{'url': 'www.google.com', 'text': 'nico'}
	    	];

	    	var maxTabs = 5,
	    		tabsCount = ($scope.tabs.length >= maxTabs) ? maxTabs : $scope.tabs.length;

	    	$scope.tabsSize = function () {
	    		return {"width" : 100/tabsCount + "%"};
	    	}

	    	$scope.setSelectedTab = function (index) {
	    		if ( angular.isUndefinedOrNullOrEmpty($scope.tabSelected) ) {
					$scope.tabSelected.callback();
				}
	    		
	    	}
	    }
	}
}