app.controller('DraftPostsCtrl', ['$scope', 'Posts', 'DraftPosts', function(scope, Posts, DraftPosts) {

	scope.page_title	= "Draft Posts";
	scope.show_status	= false;

	DraftPosts.get()
		.$promise.then(function(response) {
			console.log(response);
			scope.posts = response.data;
		});

}]);