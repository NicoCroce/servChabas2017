(function () {
	'use strict';
	angular
		.module('chabasHoy')
		.directive('switchTabs', switchTabs);

	function switchTabs($rootScope) {
		return {
			restrict: 'A',
			templateUrl: 'templates/components/swtich-tabs/switch-tabs.html',
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
					var width = { "width": 100 / (tabsCount) + "%" };
					return width;
				};

				scope.getFontSize = function(index) {
					return scope.tabs.tabArray[index].fontSize;
				}

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
						$rootScope.loadingService = false;
						var index = getIndex(toState.name);
/*						$rootScope.$broadcast('changePage', { path: toState.url });*/
						if (scope.indexTabSelected == index) return; //Si es true es porque se hizo click en el tab. De lo contrario será false
						scope.setSelectedTab(index);
					});

				/*scope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
					console.log(window.location);
					if (from.name != 'menu' && window.location.hash != "#!/menu") {
						window.location.reload(true);
					}
				});*/

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