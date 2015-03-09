// Sub-application/main Level State
app.config(['$stateProvider', function(stateProvider) {

	stateProvider
		.state('app.public.home', {
			url: '/',
			templateUrl: '../templates/public/home/home.tpl.html',
			controller: 'HomeCtrl'
		})
		.state('app.public.blog', {
			controller: 'BlogCtrl',
			templateUrl: '../templates/public/blog/main.tpl.html',
		})
			.state('app.public.blog.list', {
				url: '/blog',
				templateUrl: '../templates/public/blog/list.tpl.html',
				controller: 'BlogListCtrl'
			})
			.state('app.public.blog.post', {
				url: '/blog/:post_id',
				templateUrl: '../templates/public/blog/post.tpl.html',
				controller: 'BlogPostCtrl'
			})
		.state('app.public.travel', {
			url: '/travel',
			templateUrl: '../templates/public/travel/index.tpl.html',
			controller: 'TravelCtrl'
		})
		;

}]);