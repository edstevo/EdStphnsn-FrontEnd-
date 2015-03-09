app.factory('Travel', ['$resource', '$rootScope', function(resource, rootScope) {
		return resource('http://178.62.102.219/travel/:post_id', {
			post_id:'@post_id'
		}, {});
	}]);