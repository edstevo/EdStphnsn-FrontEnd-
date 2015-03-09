var gulp 		= require('gulp');
var sass 		= require('gulp-sass');
var uglify 		= require('gulp-uglify');
var concat 		= require('gulp-concat');
var watch 		= require('gulp-watch');
var minifyCSS 	= require('gulp-minify-css');
var beeper 		= require('beeper');

gulp.task('default', [
		'core',
		'scripts',
		'css',
		'html',
		'watch'
	]);

gulp.task('core', function () {
	gulp.src([	'bower_components/jquery/dist/jquery.min.js',
				'bower_components/angular/angular.min.js',
				'bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js' ])
		.pipe(gulp.dest('app/js'));

	gulp.src([	'bower_components/html5-boilerplate/css/main.css',
				'bower_components/html5-boilerplate/css/normalize.css' ])
		.pipe(gulp.dest('app/css'));

	gulp.src([	'bower_components/font-awesome/fonts/*',
				'bower_components/map-icons/fonts/*'])
		.pipe(gulp.dest('app/fonts'));
});

gulp.task('html', function() {
	gulp.src('lib/index.html')
		.pipe(gulp.dest('app'));

	gulp.src('lib/templates/**/*')
		.pipe(gulp.dest('app/templates'));
});

gulp.task('scripts', function() {
	gulp.src('lib/js/**/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest('app/js/'));

	gulp.src([	'bower_components/oauth-js/dist/oauth.js',
				'bower_components/angular-ui-router/release/angular-ui-router.js',
				'bower_components/angular-cookies/angular-cookies.js',
				'bower_components/angular-resource/angular-resource.js',
				'bower_components/lodash/dist/lodash.js',
				'bower_components/angular-google-maps/dist/angular-google-maps.js',
				'bower_components/moment/moment.js',
				'bower_components/angular-moment/angular-moment.js',
				'bower_components/typeahead.js/dist/typeahead.bundle.js',
				'bower_components/ngAutocomplete/src/ngAutocomplete.js',
				'bower_components/map-icons/js/map-icons.js'	])
		.pipe(concat('vendor.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js/'));
});

gulp.task('css', function () {
    gulp.src('lib/scss/*.scss')
        .pipe(concat('all.css'))
        .pipe(sass())
        .pipe(gulp.dest('app/css'));

	gulp.src([ 'bower_components/map-icons/css/map-icons.css' ])
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest('app/css'));
});

gulp.task('watch', function () {
	gulp.watch('lib/scss/**/*.scss', ['css']);
	gulp.watch('lib/js/**/*.js', ['scripts']);
	gulp.watch('lib/**/*.html', ['html']);
});