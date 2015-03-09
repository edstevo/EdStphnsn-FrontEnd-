app.factory('Blog', ['$resource', '$rootScope', function(resource, rootScope) {
		return resource('http://178.62.102.219/blog/:post_id', {
			post_id:'@post_id'
		}, {});
	}]);