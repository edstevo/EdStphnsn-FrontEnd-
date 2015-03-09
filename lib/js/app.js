var app = angular.module('app', [	'ngResource',
									'ui.router',
									'uiGmapgoogle-maps',
									'ngAutocomplete',
									'ngCookies'	]);

app.run(['$rootScope', '$state', 'Auth', function(rootScope, state, Auth) {

	Auth.initialize();
	Auth.setCredentials();

	rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		var _is_admin_route = (toState.name.indexOf("admin") > -1);
		if (_is_admin_route && ((!rootScope.user_data) || rootScope.user_data.admin == false))
		{
			state.go('app.public.home');
		}
	})

}]);

app.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
		uiGmapGoogleMapApiProvider.configure({
				//    key: 'your api key',
				v: '3.17',
				libraries: 'weather,geometry,visualization'
		});
}]);