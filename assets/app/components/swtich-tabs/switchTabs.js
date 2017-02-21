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
		controller: ['$scope', function ($scope) {
			/*$scope.indexTabSelected = 0;*/
			$scope.indexTabSelected = $scope.tabs.tabSelected;

			var maxTabs = 4,
				tabsCount = ($scope.tabs.tabArray.length >= maxTabs) ? maxTabs : $scope.tabs.tabArray.length;

			$scope.tabsSize = function () {
				return { "width": 100 / tabsCount + "%" };
			}

			$scope.setSelectedTab = function (index) {
				$scope.indexTabSelected = index;
				if (angular.isDefined($scope.tabs.callback)) {
					$scope.tabs.callback();
				}

			}

			// Si cambia la URL
			$scope.$on('$stateChangeStart',
				function (event, toState, toParams, fromState, fromParams) {
					var index = getIndex(toState.name);
					if ($scope.indexTabSelected == index) return; //Si es true es porque se hizo click en el tab. De lo contrario será false

					$scope.setSelectedTab(index);
				});

			function getIndex(stateName) {
				var index;
				$scope.tabs.tabArray.forEach(function (tab, indexTab) {
					if (tab.url == stateName) index = indexTab;
				});

				return index;
			}

			//***************** */
		}]
	}
}