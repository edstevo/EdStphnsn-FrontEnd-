// Application Level State
app.config(['$stateProvider', '$urlRouterProvider', function(stateProvider, urlRouterProvider) {

	urlRouterProvider.when('', '/');

	stateProvider
		.state('app', {
			views: {
				'navbar': {
					templateUrl: '../templates/core/components/navbar.tpl.html',
					controller: 'NavCtrl'
				},
				'main': {
					templateUrl: '../templates/core/components/main.tpl.html',
					controller: 'AppCtrl'
				}
			},
			access: 'public'
		})
			.state('app.admin', {
				url: '/admin',
				views: {
					'sub-nav': {
						templateUrl: '../templates/admin/components/navbar.tpl.html'
					},
					'sub-main': {
						templateUrl: '../templates/admin/components/main.tpl.html',
						controller: 'AdminCtrl'
					}
				},
				access: 'private'
			})
			.state('app.public', {
				controller: 'PublicCtrl',
				views: {
					'sub-nav': {
						templateUrl: '../templates/public/components/navbar.tpl.html'
					},
					'sub-main': {
						templateUrl: '../templates/public/components/main.tpl.html'
					}
				},
				access: 'public'
			})
		.state('404', {
			url: '/404',
			templateUrl: '../templates/core/404.tpl.html',
			controller: 'AppCtrl',
			access: 'public'
		})
		;

}]);