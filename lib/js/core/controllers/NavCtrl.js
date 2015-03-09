app.controller('NavCtrl', ['$rootScope', '$scope', '$state', 'Twitter', 'Auth', function(rootScope, scope, state, Twitter, Auth) {

	//	Authentication
	scope.authenticate 	= function()
	{
		Auth.authenticate();
	}

	scope.log_out		= function()
	{
		Auth.logOut();
	}

}]);
