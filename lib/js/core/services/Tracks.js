app.factory('Tracks', ['$resource', '$rootScope', function(resource, rootScope) {
		return resource('http://178.62.102.219/tracks/:track_id', {
			track_id:'@track_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}]);