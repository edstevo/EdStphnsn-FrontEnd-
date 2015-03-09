app.factory('Admin', [	'Base64',
						'$rootScope',
						'$http',
						'Auth', 	function(	Base64,
												rootScope,
												http,
												Auth	) {

		return {
			initialize: function() {
				rootScope.user_data	= null;
				Twitter.initialize();
			},
			authenticate: function() {
				Twitter.connect().then(function(response)
				{
					if (Twitter.isReady())
					{
						_set_credentials();
					}
				});
			},
			setCredentials: function() {
				_set_credentials();
			},
			logOut: function() {
				Twitter.clearCache();
				cookieStore.remove('auth_data');
				cookieStore.remove('user_data');
				rootScope.user_data	= null;
				http.defaults.headers.common.Authorization = 'Basic ';
			}
		};

	}]);