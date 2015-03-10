app.controller('MusicListCtrl', ['$scope', '$state', '$sce', 'Tracks', function(scope, sce, state, Tracks) {

	Tracks.get()
		.$promise.then(function(response) {
			var third_length		= Math.ceil(response.data.length / 3);
			scope.tracks_left		= response.data.slice(0, third_length);
			scope.tracks_center		= response.data.slice(third_length, (third_length*2));
			scope.tracks_right		= response.data.slice((third_length*2));
			scope.tracks_returned 	= true;
		});

}]);