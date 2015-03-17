var app = angular.module('app', [	'ngResource',
									'ui.router',
									'uiGmapgoogle-maps',
									'ngAutocomplete',
									'ngCookies',
									'angulartics',
									'angulartics.google.analytics'	]);

app.run(['$rootScope', '$state', '$window', '$location', 'Auth', function(rootScope, state, window, location, Auth) {

	Auth.initialize();
	Auth.setCredentials();

	rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		var _is_admin_route = (toState.name.indexOf("admin") > -1);
		if (_is_admin_route && ((!rootScope.user_data) || rootScope.user_data.admin == false))
		{
			state.go('app.public.home');
		}
	});

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-60579039-1', 'auto');
	window.ga('send', 'pageview', { page: location.url() });

}]);

app.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
		uiGmapGoogleMapApiProvider.configure({
				//    key: 'your api key',
				v: '3.17',
				libraries: 'weather,geometry,visualization'
		});
}]);
// Sub-application/main Level State
app.config(['$stateProvider', function(stateProvider) {

	stateProvider
		.state('app.admin.home', {
			templateUrl: '../templates/admin/home/home.tpl.html',
			controller: 'AdminHomeCtrl'
		})
		.state('app.admin.new-post', {
			url: '/new-post',
			templateUrl: '../templates/admin/posts/post.tpl.html',
			controller: 'NewPostCtrl'
		})
		.state('app.admin.posts', {
			url: '/posts',
			templateUrl: '../templates/admin/posts/list.tpl.html',
			controller: 'AllPostsCtrl'
		})
		.state('app.admin.drafts', {
			url: '/drafts',
			templateUrl: '../templates/admin/posts/list.tpl.html',
			controller: 'DraftPostsCtrl'
		})
		.state('app.admin.music', {
			url: '/music',
			templateUrl: '../templates/admin/music/main.tpl.html',
			controller: 'AdminMusicCtrl'
		})
			.state('app.admin.music.all', {
				url: '/',
				templateUrl: '../templates/admin/music/list.tpl.html',
				controller: 'AdminAllMusicCtrl'
			})
			.state('app.admin.music.playlist', {
				url: '/:playlist_id',
				templateUrl: '../templates/admin/music/list.tpl.html',
				controller: 'AdminPlaylistCtrl'
			})
		.state('app.admin.post', {
			url: '/posts/:post_id',
			templateUrl: '../templates/admin/posts/post.tpl.html',
			controller: 'EditPostCtrl'
		})
		;

}]);
// Application Level State
app.config(['$stateProvider', '$urlRouterProvider', function(stateProvider, urlRouterProvider) {

	urlRouterProvider.when('', '/');

	stateProvider
		.state('app', {
			views: {
				'navbar': {
					templateUrl: '../templates/core/components/navbar.tpl.html',
					controller: 'NavCtrl'
				},
				'main': {
					templateUrl: '../templates/core/components/main.tpl.html',
					controller: 'AppCtrl'
				}
			},
			access: 'public'
		})
			.state('app.admin', {
				url: '/admin',
				views: {
					'sub-nav': {
						templateUrl: '../templates/admin/components/navbar.tpl.html'
					},
					'sub-main': {
						templateUrl: '../templates/admin/components/main.tpl.html',
						controller: 'AdminCtrl'
					}
				},
				access: 'private'
			})
			.state('app.public', {
				controller: 'PublicCtrl',
				views: {
					'sub-nav': {
						templateUrl: '../templates/public/components/navbar.tpl.html'
					},
					'sub-main': {
						templateUrl: '../templates/public/components/main.tpl.html'
					}
				},
				access: 'public'
			})
		.state('404', {
			url: '/404',
			templateUrl: '../templates/core/404.tpl.html',
			controller: 'AppCtrl',
			access: 'public'
		})
		;

}]);
// Sub-application/main Level State
app.config(['$stateProvider', function(stateProvider) {

	stateProvider
		.state('app.public.blog', {
			controller: 'BlogCtrl',
			templateUrl: '../templates/public/blog/main.tpl.html',
		})
			.state('app.public.blog.list', {
				url: '/',
				templateUrl: '../templates/public/blog/list.tpl.html',
				controller: 'BlogListCtrl'
			})
			.state('app.public.blog.post', {
				url: '/blog/:post_id',
				templateUrl: '../templates/public/blog/post.tpl.html',
				controller: 'BlogPostCtrl'
			})
		.state('app.public.music', {
			controller: 'MusicCtrl',
			templateUrl: '../templates/public/music/main.tpl.html',
		})
			.state('app.public.music.list', {
				url: '/music',
				controller: 'MusicListCtrl',
				templateUrl: '../templates/public/music/list.tpl.html',
			})
			.state('app.public.music.playlist', {
				url: '/playlist/:playlist_id',
				controller: 'PlaylistCtrl',
				templateUrl: '../templates/public/music/playlist.tpl.html',
			})
		.state('app.public.travel', {
			url: '/travel',
			templateUrl: '../templates/public/travel/index.tpl.html',
			controller: 'TravelCtrl'
		})
		;

}]);
app.controller('AdminAllMusicCtrl', ['$scope', '$stateParams', 'Playlists', 'Tracks', function(scope, stateParams, Playlists, Tracks) {

	scope.$parent.page_title	= "All Music";

}]);
app.controller('AdminHomeCtrl', ['$scope', function($scope) {

}]);
app.controller('AdminMusicCtrl', ['$scope', '$stateParams', 'Playlists', 'Tracks', function(scope, stateParams, Playlists, Tracks) {

	Playlists.get({playlist_id: stateParams.playlist_id})
		.$promise.then(function(response) {
			scope.playlists = response.data;
		});

	$('#new_playlist_form').on('submit', function()
	{
		var playlist_name = $('#new_playlist_name').val();
		Playlists.save({}, {name: playlist_name})
			.$promise.then(function(response) {
				scope.playlists 	= response.data;
				$('#new_playlist_modal').modal('hide')
				$('#new_playlist_name').val('');
			}, function(response) {
				// Error
			});
	});

	$('#add_track_form').on('submit', function()
	{
		var track_data = {
			name: 		 $('#new_track_name').val(),
			artist: 	 $('#new_track_artist').val(),
			link: 		 $('#new_track_link').val(),
			playlist_id: stateParams.playlist_id
		}
		console.log(track_data);
		$('#add_track_form').trigger('reset');
	})

}]);
app.controller('AdminPlaylistCtrl', ['$scope', '$stateParams', 'Playlists', 'Tracks', function(scope, stateParams, Playlists, Tracks) {

	scope.$parent.page_title	= "Playlist";

	console.log(stateParams.playlist_id);

	Playlists.get({playlist_id: stateParams.playlist_id})
		.$promise.then(function(response) {
			scope.playlist = response.data;
		});

	$('#add_track_form').on('submit', function()
	{
		var track_data = {
			name: 		 $('#new_track_name').val(),
			artist: 	 $('#new_track_artist').val(),
			link: 		 $('#new_track_link').val(),
			playlist_id: stateParams.playlist_id
		}

		Tracks.save({}, track_data)
			.$promise.then(function(response) {
				scope.playlist.tracks.push(response.data);
				$('#add_track_form').trigger('reset');
			});
	})

}]);
app.controller('AllPostsCtrl', ['$scope', 'Posts', function(scope, Posts) {

	scope.page_title	= "All Posts";
	scope.show_status	= true;

	Posts.get()
		.$promise.then(function(response) {
			scope.posts = response.data;
		});

}]);
app.controller('DraftPostsCtrl', ['$scope', 'Posts', 'DraftPosts', function(scope, Posts, DraftPosts) {

	scope.page_title	= "Draft Posts";
	scope.show_status	= false;

	DraftPosts.get()
		.$promise.then(function(response) {
			console.log(response);
			scope.posts = response.data;
		});

}]);
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

app.controller('AppCtrl', ['$rootScope', '$scope', function(rootScope, scope) {

}]);
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

app.controller('PublicCtrl', ['$scope', '$state', function(scope, state) {

}]);
app.filter('fromNow', function() {
		return function(date) {
			return moment(date).fromNow();
		}
	});
app.filter('readableDate', function() {
		return function(date) {
			return moment(date).format("D MMM YYYY");
		}
	});
app.filter('returnDay', function() {
		return function(date) {
			return moment(date).format("DD");
		}
	});
app.filter('returnMonth', function() {
		return function(date) {
			return moment(date).format("MMM");
		}
	});
app.filter('returnYear', function() {
		return function(date) {
			return moment(date).format("YYYY");
		}
	});
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
app.factory('Auth', [	'Base64',
						'$rootScope',
						'$cookieStore',
						'$http',
						'$state',
						'Twitter',
						'EdStphnsn', 	function(	Base64,
													rootScope,
													cookieStore,
													http,
													state,
													Twitter,
													EdStphnsn	) {

		// initialize to whatever is in the cookie, if anything
		http.defaults.headers.common['Authorization'] = 'Basic ' + cookieStore.get('auth_data');

		var _authenticate 			= function()
		{
			Twitter.connect().then(function(response)
			{
				if (Twitter.isReady())
				{
					_set_credentials();
				}
			});
		}

		var _set_credentials 		= function()
		{
			if (Twitter.isReady())
			{
				Twitter.getAccount().then(function(twitter_response)
				{
					var encoded 		= Base64.encode(twitter_response.screen_name);
					http.defaults.headers.common.Authorization = 'Basic ' + encoded;
					cookieStore.put('auth_data', encoded);

					EdStphnsn.save({}, { username: twitter_response.screen_name })
						.$promise.then(function(api_response) {

							var user_data		= {
								name: 						api_response.data.name,
								screen_name: 				twitter_response.screen_name,
								description: 				twitter_response.description,
								id: 						twitter_response.id,
								is_admin: 					api_response.data.admin,
								location: 					twitter_response.location,
								lang: 						twitter_response.lang,
								profile_image_url: 			twitter_response.profile_image_url,
								profile_image_url_https: 	twitter_response.profile_image_url_https,
								time_zone: 					twitter_response.time_zone,
								url: 						twitter_response.url
							}

							rootScope.user_data	= user_data;
							cookieStore.put('user_data', user_data);

						});
				});
			}
		}

		var _clear_credentials 		= function()
		{
			Twitter.clearCache();
			cookieStore.remove('auth_data');
			cookieStore.remove('user_data');
			rootScope.user_data	= null;
			http.defaults.headers.common.Authorization = 'Basic ';
		}

		return {
			initialize: function() {
				Twitter.initialize();
				rootScope.user_data	= cookieStore.get('user_data');
			},
			is_logged: function() {
				return (rootScope.user_data);
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
				state.go('app.public.blog.list');
			}
		};

	}])
	.factory('Base64', function() {
		var keyStr = 'ABCDEFGHIJKLMNOP' +
			'QRSTUVWXYZabcdef' +
			'ghijklmnopqrstuv' +
			'wxyz0123456789+/' +
			'=';
		return {
			encode: function (input) {
				var output = "";
				var chr1, chr2, chr3 = "";
				var enc1, enc2, enc3, enc4 = "";
				var i = 0;

				do {
					chr1 = input.charCodeAt(i++);
					chr2 = input.charCodeAt(i++);
					chr3 = input.charCodeAt(i++);

					enc1 = chr1 >> 2;
					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
					enc4 = chr3 & 63;

					if (isNaN(chr2)) {
						enc3 = enc4 = 64;
					} else if (isNaN(chr3)) {
						enc4 = 64;
					}

					output = output +
						keyStr.charAt(enc1) +
						keyStr.charAt(enc2) +
						keyStr.charAt(enc3) +
						keyStr.charAt(enc4);
					chr1 = chr2 = chr3 = "";
					enc1 = enc2 = enc3 = enc4 = "";
				} while (i < input.length);

				return output;
			},

			decode: function (input) {
				var output = "";
				var chr1, chr2, chr3 = "";
				var enc1, enc2, enc3, enc4 = "";
				var i = 0;

				// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
				var base64test = /[^A-Za-z0-9\+\/\=]/g;
				if (base64test.exec(input)) {
					alert("There were invalid base64 characters in the input text.\n" +
						"Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
						"Expect errors in decoding.");
				}
				input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

				do {
					enc1 = keyStr.indexOf(input.charAt(i++));
					enc2 = keyStr.indexOf(input.charAt(i++));
					enc3 = keyStr.indexOf(input.charAt(i++));
					enc4 = keyStr.indexOf(input.charAt(i++));

					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;

					output = output + String.fromCharCode(chr1);

					if (enc3 != 64) {
						output = output + String.fromCharCode(chr2);
					}
					if (enc4 != 64) {
						output = output + String.fromCharCode(chr3);
					}

					chr1 = chr2 = chr3 = "";
					enc1 = enc2 = enc3 = enc4 = "";

				} while (i < input.length);

				return output;
			}
		};
	});
app.factory('Blog', ['$resource', '$rootScope', function(resource, rootScope) {
		return resource('http://178.62.102.219/blog/:post_id', {
			post_id:'@post_id'
		}, {});
	}]);
app.factory('DraftPosts', ['$resource', '$rootScope', function(resource, rootScope) {
		return resource('http://178.62.102.219/drafts', {
			post_id:'@post_id'
		}, {});
	}]);
app.factory('EdStphnsn', ['$resource', '$rootScope', function(resource, rootScope) {
		return resource('http://178.62.102.219/auth', {}, {});
	}]);
app.factory('LatestBlog', ['$resource', '$rootScope', function(resource, rootScope) {
		return resource('http://178.62.102.219/blog/latest', {}, {});
	}]);
app.factory('Playlists', ['$resource', '$rootScope', function(resource, rootScope) {
		return resource('http://178.62.102.219/playlists/:playlist_id', {
			playlist_id:'@playlist_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}]);
app.factory('PostTypes', ['$resource', '$rootScope', function(resource, rootScope) {
		return resource('http://178.62.102.219/core/post-types',{},{});
	}]);
app.factory('Posts', ['$resource', '$rootScope', function(resource, rootScope) {
		return resource('http://178.62.102.219/posts/:post_id', {
			post_id:'@post_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}]);
app.factory('Tags', ['$resource', '$rootScope', function(resource, rootScope) {
		return resource('http://178.62.102.219/tags/:tag_id', {
			tag_id:'@tag_id'
		}, {});
	}]);
app.factory('Tracks', ['$resource', '$rootScope', function(resource, rootScope) {
		return resource('http://178.62.102.219/tracks/:track_id', {
			track_id:'@track_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}]);
app.factory('Travel', ['$resource', '$rootScope', function(resource, rootScope) {
		return resource('http://178.62.102.219/travel/:post_id', {
			post_id:'@post_id'
		}, {});
	}]);
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
app.controller('BlogCtrl', ['$scope', '$state', 'LatestBlog', 'Tags', function(scope, state, LatestBlog, Tags) {

	scope.latest_posts_returned	= false;
	scope.tags_returned			= false;

	LatestBlog.get({}, {})
		.$promise.then(function(response) {
			scope.latest_posts 			= response.data;
			scope.latest_posts_returned	= true;
		});

	Tags.get({}, {})
		.$promise.then(function(response) {
			scope.tags					= response.data;
			scope.tags_returned			= true;
		});

}]);
app.controller('BlogListCtrl', ['$scope', '$state', '$sce', 'Blog', function(scope, sce, state, Blog) {

	scope.posts_returned 	= false;

	Blog.get()
		.$promise.then(function(response) {
			var third_length			= Math.ceil(response.data.length / 3);
			scope.posts_left			= response.data.slice(0, third_length);
			scope.posts_center			= response.data.slice(third_length, (third_length*2));
			scope.posts_right			= response.data.slice((third_length*2));
			scope.posts_returned 	= true;
		});


	window.twttr=(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],t=window.twttr||{};if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);t._e=[];t.ready=function(f){t._e.push(f);};return t;}(document,"script","twitter-wjs"));

}]);
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
app.controller('HomeCtrl', ['$scope', function($scope) {
  
}]);
app.controller('MusicCtrl', ['$scope', '$state', '$sce', 'Playlists', function(scope, sce, state, Playlists) {

	scope.page_title	= "Latest Music";

	Playlists.get()
		.$promise.then(function(response) {
			scope.playlists				= response.data;
			scope.playlists_returned 	= true;
		});

}]);
app.controller('MusicListCtrl', ['$scope', '$state', '$sce', 'Tracks', function(scope, sce, state, Tracks) {

	Tracks.get()
		.$promise.then(function(response) {
			var third_length		= Math.ceil(response.data.length / 3);
			scope.tracks_left		= response.data.slice(0, third_length);
			scope.tracks_center		= response.data.slice(third_length, (third_length*2));
			scope.tracks_right		= response.data.slice((third_length*2));
			scope.tracks_returned 	= true;
		});

}]);
app.controller('PlaylistCtrl', ['$scope', '$stateParams', 'Playlists', function(scope, stateParams, Playlists) {

	scope.$parent.page_title	= "Playlists";

	Playlists.get({playlist_id: stateParams.playlist_id})
		.$promise.then(function(response) {
			scope.playlist = response.data;
		});

}]);
app.controller('TravelCtrl', ['$scope', '$state', 'uiGmapGoogleMapApi', 'Travel', function(scope, state, uiGmapGoogleMapApi, Travel) {

	uiGmapGoogleMapApi.then(function(maps) {

		scope.map = {
			center: {
				latitude: 45,
				longitude: -73
			},
			zoom: 3
		};

	});

	scope.locations 	= [];

	Travel.get()
		.$promise.then(function(response) {
			var markers	= [];
			for (var i 	= 0; i < response.data.length; i++) {
				marker = {
					id: i,
					latitude: response.data[i].lat,
					longitude: response.data[i].lng,
					title: response.data[i].title,
					icon: {
						path: MAP_PIN,
						fillColor: '#0E77E9',
						fillOpacity: 1,
						strokeColor: '#FFF',
						strokeWeight: 1,
						scale: 0.2
					},
					label: '<i class="map-icon-parking"></i>'
				};
				marker['id'] 	= i;
				markers.push(marker);
			}
			scope.locations		= markers;
		});

}]);