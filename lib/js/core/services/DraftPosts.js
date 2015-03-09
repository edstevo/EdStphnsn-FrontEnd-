app.factory('DraftPosts', ['$resource', '$rootScope', function(resource, rootScope) {
		return resource('http://178.62.102.219/drafts', {
			post_id:'@post_id'
		}, {});
	}]);