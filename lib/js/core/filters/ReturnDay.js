app.filter('returnDay', function() {
		return function(date) {
			return moment(date).format("DD");
		}
	});