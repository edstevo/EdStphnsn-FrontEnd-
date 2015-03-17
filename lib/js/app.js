var app = angular.module('app', [	'ngResource',
									'ui.router',
									'uiGmapgoogle-maps',
									'ngAutocomplete',
									'ngCookies',
									'angulartics',
									'angulartics.google.analytics'	]);

app.run(['$rootScope', '$state', '$window', '$location', 'Auth', function(rootScope, state, window, location, Auth) {

	Auth.initialize();
	Auth.setCredentials();

	rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		var _is_admin_route = (toState.name.indexOf("admin") > -1);
		if (_is_admin_route && ((!rootScope.user_data) || rootScope.user_data.admin == false))
		{
			state.go('app.public.home');
		}
	});

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-60579039-1', 'auto');
	window.ga('send', 'pageview', { page: location.url() });

}]);

app.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
		uiGmapGoogleMapApiProvider.configure({
				//    key: 'your api key',
				v: '3.17',
				libraries: 'weather,geometry,visualization'
		});
}]);