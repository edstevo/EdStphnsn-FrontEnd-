app.controller('EditPostCtrl', [	'$scope',
									'$rootScope',
									'$stateParams',
									'$sce',
									'Posts',
									'PostTypes',
									'Tags',	function(	scope,
														rootScope,
														stateParams,
														sce,
														Posts,
														PostTypes,
														Tags 	) {

	scope.post = {
		id: '',
		title: '',
		type: '',
		draft: true,
		content: ''
	}

	scope.page_title 			= "Edit Post";
	scope.post_returned			= false;
	scope.post_saved			= true;
	scope.saving_post			= false;
	scope.preview_requested		= false;
	scope.tags 					= [];
	var timer;

	$('.datepicker').datepicker({
	    format: 'dd M yy'
	});

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
		});

	Posts.get({post_id:stateParams.post_id})
		.$promise.then(function(response) {
			scope.post 				= response.data;
			scope.preview_content	= sce.trustAsHtml(response.data.content);
			scope.post_returned		= true;
		});

	scope.add_tag		= function(event)
	{
		if (event.keyCode == 13)
		{
			var tag = $('.tags-input').val();
			scope.post.tags.push(tag);
			$('.tags-input').val('');
		}
	}

	scope.remove_tag	= function(tag_index)
	{
		scope.post.tags.splice(tag_index, 1);
	}

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
		if (scope.post_returned)
		{
			scope.saving_post	= true;

			Posts.update({post_id:stateParams.post_id}, scope.post)
				.$promise.then(function(response) {
					scope.post_saved	= true;
					scope.saving_post	= false;
					scope.post.id 		= response.data.id;
				}, function() {
					scope.post_saved	= false;
					scope.saving_post	= false;
				});
		}
	}

}]);