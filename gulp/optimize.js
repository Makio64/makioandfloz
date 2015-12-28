// Optimize final files for production

var gulp 					= require('gulp');
var path 					= require('./config').path;
var imageOptimizationLevel 	= require('./config').imageOptimizationLevel;
var imagemin				= require('gulp-imagemin');
var rev 					= require('gulp-rev');
var collect 				= require('gulp-rev-collector');
var stylus 					= require( 'gulp-stylus' );
var nib						= require('nib');

gulp.task( 'copyToDist', function() {
	return gulp.src([
		path.static+'**/*.*',
		path.static+'.*',
		'!'+path.static+'img/**/*.*',
		'!'+path.static+'**/*.map',
		'!'+path.static+'css/**/*.*',
		path.build+'**/*.*',
		'!'+path.build+'css/**/*.*',
		'!'+path.build+'vendors/**/*.*',
		'!'+path.build+'css/**/*.*',
		'!'+path.build+'**/*.map',
		'!'+path.build+'js/bundle.js'
	])	.pipe(gulp.dest(path.dist))
})

gulp.task('imagemin', function() {
	return gulp.src(path.static+path.img+'**/*.*')
		.pipe(imagemin({ optimizationLevel: imageOptimizationLevel }))
		.pipe(gulp.dest(path.dist+path.img))
});

gulp.task('stylusOptim', function () {
	return gulp.src(path.stylus+'main.styl')
		.pipe(stylus({compress:true,use:[nib()]}))
		.pipe(rev())
		.pipe(gulp.dest(path.dist+'css/'))
		.pipe(rev.manifest({ path: 'manifest.json',merge: true }))
		.pipe(gulp.dest( path.dist+'rev/css' ) );
});

gulp.task('rev-js', function () {
	return gulp.src(path.build+'/js/bundle.js', {base:path.build})
		.pipe(rev())
		.pipe(gulp.dest(path.dist))
		.pipe(rev.manifest({ path: 'manifest.json',merge: true }))
		.pipe(gulp.dest( path.dist+'rev/js' ) );
});

gulp.task('rev', function() {
	return gulp.src([path.dist+'rev/**/*.json', path.dist+'**.html'])
		.pipe(collect({replaceReved: true}))
		.pipe(gulp.dest('dist'));
});
