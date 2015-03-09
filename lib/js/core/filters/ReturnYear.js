app.filter('returnYear', function() {
		return function(date) {
			return moment(date).format("YYYY");
		}
	});