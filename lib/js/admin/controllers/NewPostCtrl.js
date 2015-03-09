app.controller('NewPostCtrl', ['$scope', '$sce', 'Posts', 'PostTypes', function(scope, sce, Posts, PostTypes) {

	scope.page_title	= "New Post";
	scope.post_returned	= true;

	var timer;

	scope.post = {
		id: '',
		title: '',
		type: '',
		draft: true,
		content: ''
	}

	scope.$watch('details', function(new_val) {
		if (new_val)
		{
			scope.post.formatted_address	= new_val.formatted_address;
			scope.post.lat 					= new_val.geometry.location.k;
			scope.post.lng 					= new_val.geometry.location.D;
			scope.save();
		}
	});

	PostTypes.get()
		.$promise.then(function(response) {
			scope.post_types 	= response.data;
			scope.post.type		= response.data[0].value;
		});

	scope.preview		= function()
	{
		scope.preview_requested = scope.preview_requested === true ? false : true;
	}

	scope.request_save	= function()
	{
		scope.preview_content	= sce.trustAsHtml(scope.post.content);
		clearTimeout(timer);
		timer = setTimeout(function() {
			scope.save();
		}, 1000);
	}

	scope.save 			= function()
	{
		scope.saving_post	= true;

		Posts.save({}, scope.post)
			.$promise.then(function(response) {
				scope.post_saved	= true;
				scope.saving_post	= false;
				scope.post.id 		= response.data.id;
			}, function() {
				scope.post_saved	= false;
				scope.saving_post	= false;
			});
	}

}]);