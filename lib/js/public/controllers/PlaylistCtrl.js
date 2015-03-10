app.controller('PlaylistCtrl', ['$scope', '$stateParams', 'Playlists', function(scope, stateParams, Playlists) {

	scope.$parent.page_title	= "Playlists";

	Playlists.get({playlist_id: stateParams.playlist_id})
		.$promise.then(function(response) {
			scope.playlist = response.data;
		});

}]);