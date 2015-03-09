app.factory('Tags', ['$resource', '$rootScope', function(resource, rootScope) {
		return resource('http://178.62.102.219/tags/:tag_id', {
			tag_id:'@tag_id'
		}, {});
	}]);