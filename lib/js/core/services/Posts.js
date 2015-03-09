app.factory('Posts', ['$resource', '$rootScope', function(resource, rootScope) {
		return resource('http://178.62.102.219/posts/:post_id', {
			post_id:'@post_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}]);