app.controller('BlogCtrl', ['$scope', '$state', 'LatestBlog', 'Tags', function(scope, state, LatestBlog, Tags) {

	LatestBlog.get({}, {})
		.$promise.then(function(response) {
			scope.latest_posts 	= response.data;
		});

	Tags.get({}, {})
		.$promise.then(function(response) {
			scope.tags					= response.data;
		});

}]);