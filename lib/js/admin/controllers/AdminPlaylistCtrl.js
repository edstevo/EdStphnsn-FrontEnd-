app.controller('AdminPlaylistCtrl', ['$scope', '$stateParams', 'Playlists', 'Tracks', function(scope, stateParams, Playlists, Tracks) {

	scope.$parent.page_title	= "Playlist";

	console.log(stateParams.playlist_id);

	Playlists.get({playlist_id: stateParams.playlist_id})
		.$promise.then(function(response) {
			scope.playlist = response.data;
		});

	$('#add_track_form').on('submit', function()
	{
		var track_data = {
			name: 		 $('#new_track_name').val(),
			artist: 	 $('#new_track_artist').val(),
			link: 		 $('#new_track_link').val(),
			playlist_id: stateParams.playlist_id
		}

		Tracks.save({}, track_data)
			.$promise.then(function(response) {
				scope.playlist.tracks.push(response.data);
				$('#add_track_form').trigger('reset');
			});
	})

}]);