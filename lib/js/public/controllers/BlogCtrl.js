app.controller('BlogCtrl', ['$scope', '$state', 'LatestBlog', 'Tags', function(scope, state, LatestBlog, Tags) {

	scope.latest_posts_returned	= false;
	scope.tags_returned			= false;

	LatestBlog.get({}, {})
		.$promise.then(function(response) {
			scope.latest_posts 			= response.data;
			scope.latest_posts_returned	= true;
		});

	Tags.get({}, {})
		.$promise.then(function(response) {
			scope.tags					= response.data;
			scope.tags_returned			= true;
		});

}]);