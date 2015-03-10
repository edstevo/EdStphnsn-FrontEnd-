app.factory('Playlists', ['$resource', '$rootScope', function(resource, rootScope) {
		return resource('http://178.62.102.219/playlists/:playlist_id', {
			playlist_id:'@playlist_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}]);