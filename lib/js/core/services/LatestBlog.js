app.factory('LatestBlog', ['$resource', '$rootScope', function(resource, rootScope) {
		return resource('http://178.62.102.219/blog/latest', {}, {});
	}]);