(function () {
	'use strict';
	angular
		.module('servicios-chabas')
		.directive('switchTabs', switchTabs);

	function switchTabs(analytics) {
		return {
			restrict: 'A',
			templateUrl: '../templates/components/swtich-tabs/switch-tabs.html',
			replace: false,
			scope: {
				tabs: '='
			},
			link: function (scope, element, attrs) {
				/*scope.indexTabSelected = 0;*/
				scope.indexTabSelected = scope.tabs.tabSelected;

				var maxTabs, tabsCount;

				maxTabs = 4;
				tabsCount = (scope.tabs.tabArray.length >= maxTabs) ? maxTabs : scope.tabs.tabArray.length;

				scope.tabsSize = function (index) {
					var width = {};
					if (index == tabsCount - 1) {
						width = { "width": 10 + "%" };
					} else {
						width = { "width": 90 / (tabsCount - 1) + "%" };
					}

					return width;
				};

				scope.getLiClass = function(eIndex, eLast) {
					return { 'is-selected': eIndex == scope.indexTabSelected, 'icon-options-container': eLast }
				}

				scope.setSelectedTab = function (index) {
					scope.indexTabSelected = index;
					if (angular.isDefined(scope.tabs.callback)) {
						scope.tabs.callback();
					}

				}

				// Si cambia la URL
				scope.$on('$stateChangeStart',
					function (event, toState, toParams, fromState, fromParams) {
						var index = getIndex(toState.name);
						analytics.pageview(toState.url);
						if (scope.indexTabSelected == index) return; //Si es true es porque se hizo click en el tab. De lo contrario será false
						scope.setSelectedTab(index);
					});

				function getIndex(stateName) {
					var index;
					scope.tabs.tabArray.forEach(function (tab, indexTab) {
						if (tab.url == stateName) index = indexTab;
					});

					return index;
				}
				//***************** */

			}
		}
	}
})();