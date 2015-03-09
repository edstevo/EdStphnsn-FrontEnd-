app.controller('TravelCtrl', ['$scope', '$state', 'uiGmapGoogleMapApi', 'Travel', function(scope, state, uiGmapGoogleMapApi, Travel) {

	uiGmapGoogleMapApi.then(function(maps) {

		scope.map = {
			center: {
				latitude: 45,
				longitude: -73
			},
			zoom: 3
		};

	});

	scope.locations 	= [];

	Travel.get()
		.$promise.then(function(response) {
			var markers	= [];
			for (var i 	= 0; i < response.data.length; i++) {
				marker = {
					id: i,
					latitude: response.data[i].lat,
					longitude: response.data[i].lng,
					title: response.data[i].title,
					icon: {
						path: MAP_PIN,
						fillColor: '#0E77E9',
						fillOpacity: 1,
						strokeColor: '#FFF',
						strokeWeight: 1,
						scale: 0.2
					},
					label: '<i class="map-icon-parking"></i>'
				};
				marker['id'] 	= i;
				markers.push(marker);
			}
			scope.locations		= markers;
		});

}]);