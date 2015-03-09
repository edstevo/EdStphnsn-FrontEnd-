app.filter('readableDate', function() {
		return function(date) {
			return moment(date).format("D MMM YYYY");
		}
	});