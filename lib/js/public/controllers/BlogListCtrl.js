app.controller('BlogListCtrl', ['$scope', '$state', '$sce', 'Blog', function(scope, sce, state, Blog) {

	scope.posts_returned 	= false;

	Blog.get()
		.$promise.then(function(response) {
			var half_length				= Math.ceil(response.data.length / 2);
			scope.posts_left			= response.data.slice(0, half_length);
			scope.posts_right			= response.data.slice(half_length);
			scope.posts_returned 	= true;
		});


	window.twttr=(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],t=window.twttr||{};if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);t._e=[];t.ready=function(f){t._e.push(f);};return t;}(document,"script","twitter-wjs"));

}]);