// BrowserSync
var gulp 		= require( 'gulp' );
var path 		= require( './config' ).path;
var port 		= require( './config' ).port;
var argv 		= require('yargs').string('module').argv;
var browserSync = require( 'browser-sync' );
var compression 	= require('compression');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: [path.build, path.src, path.static],
			// add gzip compression, for testing page speed
			middleware: [compression()]
		},
		startPath: argv.module?'/module_'+argv.module+'.html':'',
		port: port
	});
});
