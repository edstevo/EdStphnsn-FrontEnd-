app.controller('NavCtrl', ['$rootScope', '$scope', 'Twitter', 'Auth', function(rootScope, scope, Twitter, Auth) {

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
