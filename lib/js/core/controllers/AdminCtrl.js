app.controller('AdminCtrl', ['$rootScope', '$scope', '$state', 'Auth', function(rootScope, scope, state, Auth) {

	if (!rootScope.user_data)
	{
		Auth.authenticate();
	}

	if (!rootScope.user_data || rootScope.user_data.admin === false)
	{
		state.go('app.public.blog.list');
	}

}]);
