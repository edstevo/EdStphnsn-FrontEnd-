app.controller('MusicCtrl', ['$scope', '$state', '$sce', 'Playlists', function(scope, sce, state, Playlists) {

	scope.page_title	= "Latest Music";

	Playlists.get()
		.$promise.then(function(response) {
			scope.playlists				= response.data;
			scope.playlists_returned 	= true;
		});

}]);