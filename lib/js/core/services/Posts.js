app.factory('Posts', ['$resource', '$rootScope', function(resource, rootScope) {
		return resource('http://www.blog.net/posts/:post_id', {
			post_id:'@post_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}]);