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