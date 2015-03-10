// Sub-application/main Level State
app.config(['$stateProvider', function(stateProvider) {

	stateProvider
		.state('app.admin.home', {
			templateUrl: '../templates/admin/home/home.tpl.html',
			controller: 'AdminHomeCtrl'
		})
		.state('app.admin.new-post', {
			url: '/new-post',
			templateUrl: '../templates/admin/posts/post.tpl.html',
			controller: 'NewPostCtrl'
		})
		.state('app.admin.posts', {
			url: '/posts',
			templateUrl: '../templates/admin/posts/list.tpl.html',
			controller: 'AllPostsCtrl'
		})
		.state('app.admin.drafts', {
			url: '/drafts',
			templateUrl: '../templates/admin/posts/list.tpl.html',
			controller: 'DraftPostsCtrl'
		})
		.state('app.admin.music', {
			url: '/music',
			templateUrl: '../templates/admin/music/main.tpl.html',
			controller: 'AdminMusicCtrl'
		})
			.state('app.admin.music.all', {
				url: '/',
				templateUrl: '../templates/admin/music/list.tpl.html',
				controller: 'AdminAllMusicCtrl'
			})
			.state('app.admin.music.playlist', {
				url: '/:playlist_id',
				templateUrl: '../templates/admin/music/list.tpl.html',
				controller: 'AdminPlaylistCtrl'
			})
		.state('app.admin.post', {
			url: '/posts/:post_id',
			templateUrl: '../templates/admin/posts/post.tpl.html',
			controller: 'EditPostCtrl'
		})
		;

}]);