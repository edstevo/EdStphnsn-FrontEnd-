app.controller('AllPostsCtrl', ['$scope', 'Posts', function(scope, Posts) {

	scope.page_title	= "All Posts";
	scope.show_status	= true;

	Posts.get()
		.$promise.then(function(response) {
			scope.posts = response.data;
		});

}]);