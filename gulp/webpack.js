var gulp        	= require('gulp');
var path        	= require('./config').path;
var pp 				= require('path');
var port        	= require('./config').port;
var webpack 		= require('webpack');
var webpackSteam    = require('webpack-stream');
var argv        	= require('yargs').string('module').argv;
var fs				= require('fs');

var entryCoffee = path.coffee
var argvmodule = argv.module

if(argv.module) {
	var tasks = fs.readdirSync(entryCoffee+'modules/');
	reg = new RegExp(argv.module,"gi");
	tasks.forEach(function(task) {
		if(reg.test(task)){ argv.module = task;}
	})
	var entryFile = argv.module.toString()
		entryFile = entryFile.split("_")[1]
	entryCoffee += 'modules/'+argv.module+'/'+entryFile+'.coffee'
} else {
	entryCoffee += 'Preloader.coffee'
}

gulp.task('webpack', function() { return createWebpack(false,false)});
gulp.task('webpack-build', function() {return createWebpack(true,false)});

function createWebpack(build,watch){
	var plugins = []

	if(build){
		plugins.push( new webpack.optimize.OccurenceOrderPlugin() )
		plugins.push( new webpack.optimize.DedupePlugin() )
		plugins.push( new webpack.optimize.CommonsChunkPlugin({children: true, async: true}) )
		plugins.push( new webpack.optimize.UglifyJsPlugin({sourceMap:false,compress: {warnings: false}}) )
	}

	plugins.push(new webpack.ProvidePlugin({
		PIXI: "PIXI",
		THREE: "THREE",
		TweenMax: "TweenMax",
		dat: "dat",
		page: "page",
		isMobile: "isMobile"
	}))

	return gulp.src(entryCoffee).pipe(webpackSteam({
		devtool: 'source-map',
		debug: !build,
		cache:false,
		module: {
			loaders: [
				{ test: /\.(glsl|vs|fs)$/, loader: 'shader' },
				{ test: /\.coffee$/, loader: 'coffee' },
				{ test: /\.json$/, loader: 'json' },
				{ test: /\.jsx?$/, exclude:[/node_modules/,/vendors/], loader:'script'  }
			],
		},
		glsl: { chunkPath: __dirname+'/../'+path.glsl+'chunks' },
		output: {
			path: __dirname+'/../'+path.build+'js/',
			filename: argvmodule?'bundle'+argvmodule+'.js':'bundle.js',
			chunkFilename: "[id].[hash].bundle.js",
			publicPath:'./js/'
		},
		resolve: {
			extensions:['','.coffee','.glsl','.fs','.vs','.json','.js'],
			root:[
				__dirname+'/../'+path.coffee,
				__dirname+'/../'+path.data,
				__dirname+'/../'+path.vendors,
				__dirname+'/../'+path.glsl
			],
			alias: {
				PIXI: __dirname+'/../'+path.vendors+"pixi.js",
				THREE: __dirname+'/../'+path.vendors+"three.js",
				WAGNER: __dirname+'/../'+path.vendors+"wagner.js",
				dat: __dirname+'/../'+path.vendors+"dat.gui.js",
				page: __dirname+'/../'+path.vendors+"page.js",
				isMobile: __dirname+'/../'+path.vendors+"isMobile.js",
				TweenMax: __dirname+'/../'+path.vendors+"TweenMax.js",
			}
		},
		plugins:plugins
	})).pipe(gulp.dest(path.build+'js/'));
}
