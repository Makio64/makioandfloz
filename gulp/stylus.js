var gulp 	= require( 'gulp' );
var path	= require('./config').path;
var plumber = require( 'gulp-plumber' );
var stylus 	= require( 'gulp-stylus' );
var nib		= require('nib');

gulp.task( 'stylus', function() {
	return gulp.src( path.stylus+'main.styl' )
		.pipe( plumber() )
		.pipe(stylus({use:[nib()], sourcemap:{inline: true}}))
		.pipe( plumber.stop() )
		.pipe(gulp.dest(path.build+'css/'))
} );
