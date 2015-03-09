app.filter('returnMonth', function() {
		return function(date) {
			return moment(date).format("MMM");
		}
	});