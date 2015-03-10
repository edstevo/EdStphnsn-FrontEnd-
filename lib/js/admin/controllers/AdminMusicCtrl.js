app.controller('AdminMusicCtrl', ['$scope', '$stateParams', 'Playlists', 'Tracks', function(scope, stateParams, Playlists, Tracks) {

	Playlists.get({playlist_id: stateParams.playlist_id})
		.$promise.then(function(response) {
			scope.playlists = response.data;
		});

	$('#new_playlist_form').on('submit', function()
	{
		var playlist_name = $('#new_playlist_name').val();
		Playlists.save({}, {name: playlist_name})
			.$promise.then(function(response) {
				scope.playlists 	= response.data;
				$('#new_playlist_modal').modal('hide')
				$('#new_playlist_name').val('');
			}, function(response) {
				// Error
			});
	});

	$('#add_track_form').on('submit', function()
	{
		var track_data = {
			name: 		 $('#new_track_name').val(),
			artist: 	 $('#new_track_artist').val(),
			link: 		 $('#new_track_link').val(),
			playlist_id: stateParams.playlist_id
		}
		console.log(track_data);
		$('#add_track_form').trigger('reset');
	})

}]);