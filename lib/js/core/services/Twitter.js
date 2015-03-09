app.factory('Twitter', ['$q', '$rootScope', '$http', 'Base64', function(q, rootScope, http, Base64) {

	var authorizationResult = false;

	var getToken	= function() {
		var deferred 			= q.defer();
		var encoded 			= Base64.encode("msJjaBJB43TOsmO2mkzyxxwTx:58XQiAni8nrxo8XEUhzTCEJGV0fIjLXBlPUvNMy70oHR39CLS5");

		http.post('http://api.twitter.com/oauth2/token', {}, {
				headers: {
					Authorization: encoded,
				}
			})
			.success(function(response) {
				console.log('response');
				console.log(response);
				deferred.resolve(response)
			});

		console.log('deferred.response');
		console.log(deferred.response);
		return deferred.promise;
	}

	return {
		initialize: function() {
			//initialize OAuth.io with public key of the application
			OAuth.initialize('RqTZyOsO_5IcdX1F-C70E0EhwkQ', { cache: true });
			//try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
			authorizationResult = OAuth.create('twitter');
		},
		isReady: function() {
			return (authorizationResult);
		},
		connect: function() {
			var deferred = q.defer();
			OAuth.popup('twitter', { cache: true }, function(error, result) { //cache means to execute the callback if the tokens are already present
				if (!error) {
					authorizationResult = result;
					deferred.resolve();
				} else {
					//do something if there's an error
				}
			});
			return deferred.promise;
		},
		clearCache: function() {
			OAuth.clearCache('twitter');
			authorizationResult = false;
		},
		getAccount: function () {
			//create a deferred object using Angular's q service
			var deferred 	= q.defer();
			var promise 	= authorizationResult.get('/1.1/account/verify_credentials.json').done(function(data) {
				//when the data is retrieved resolved the deferred object
				deferred.resolve(data)
			});
			//return the promise of the deferred object
			return deferred.promise;
		},
		getEdStphnsn: function() {
			//create a deferred object using Angular's q service
			var deferred 			= q.defer();
			getToken().then(function(response) {
				console.log('token');
				console.log(response);
			});
		}
	}

}]);