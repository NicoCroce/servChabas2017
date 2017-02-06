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
			tabs: '='

		},
		controller: function ($scope) {
			/*$scope.indexTabSelected = 0;*/
			$scope.indexTabSelected = $scope.tabs.tabSelected;

			var maxTabs = 4,
				tabsCount = ($scope.tabs.tabArray.length >= maxTabs) ? maxTabs : $scope.tabs.tabArray.length;

			$scope.tabsSize = function () {
				return { "width": 100 / tabsCount + "%" };
			}

			$scope.setSelectedTab = function (index) {
				$scope.indexTabSelected = index;
				if (angular.isDefined($scope.tabs.tabArray[index].callback)) {
					$scope.tabs.tabSelected.callback();
				}

			}
		}
	}
}