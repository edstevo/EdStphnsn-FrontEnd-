app.controller('BlogPostCtrl', ['$scope', '$state', '$stateParams', '$sce', 'Blog', function(scope, state, stateParams, sce, Blog) {

	scope.post_returned = false;

	Blog.get({post_id:stateParams.post_id})
		.$promise.then(function(response) {
			console.log(response);
			scope.post 			= response.data;
			scope.post_returned = true;
			scope.post_content	= sce.trustAsHtml(response.data.content);
		});

}]);