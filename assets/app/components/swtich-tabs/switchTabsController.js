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
	    	var maxTabs = 5,
	    		tabsCount = ($scope.tabs < maxTabs) ? 
	    	
	    	$scope.tabs = [
	    		{'url': 'www.google.com', 'text': 'google'},
	    		{'url': 'www.google.com', 'text': 'ver'}
	    	];

	    	$scope.returnTabsSize = function () {
	    		if ( $scope.tabs.length >= maxTabs ) {
	    			return 'calc(100% / '
	    		}
	    	}
	    }
	}
}