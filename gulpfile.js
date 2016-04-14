var 
    gulp          = require('gulp'),
	stylus        = require('gulp-stylus'),
    rupture       = require('rupture'),// for Stylus

    postcss       = require('gulp-postcss'),
    autoprefixer  = require('autoprefixer'),// for PostCSS
    animation     = require('postcss-animation'),// for PostCSS
    alias         = require('postcss-alias'),// for PostCSS
    pxtorem       = require('postcss-pxtorem'),// for PostCSS
    path          = require('path'),

    webpack       = require('webpack'),
    webpackStream = require('webpack-stream'),
    webpackConfig = require('./webpack.config'),
    named         = require('vinyl-named')

    browserSync   = require('browser-sync').create(); 

    console.log(webpackConfig)

//HTML 
gulp.task('html',function() {
    gulp.src('./vendor/index.html')
    .pipe(gulp.dest('./app/'));
});
//HTML 

//CSS
gulp.task('stylus', function () {
    var processors=[
        alias,
        animation,
        autoprefixer({browsers: ['last 2 versions']})//,
        // pxtorem
    ];

    gulp.src('./vendor/css/main.styl')
        .pipe(stylus({use:[rupture()]}))
        .pipe(postcss(processors))
    .pipe(gulp.dest('./app/css/'));
});
//CSS

//JavaScript 
gulp.task('js',function() {
    gulp.src('./vendor/js/*.js')
        .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('./app/js/'));
});
//JavaScript 

//BrowserSync
gulp.task('watch', function() {
    gulp.watch('./vendor/index.html', ['html',browserSync.reload]);
    gulp.watch('./vendor/css/**/*.styl', ['stylus',browserSync.reload]);
    gulp.watch('./vendor/js/**/*.js', ['js',browserSync.reload]);
});


gulp.task('server',function() {
    browserSync.init({
        server: "./app",
        port:9000
    });
});
//BrowserSync



gulp.task('default',['html','stylus','js','watch','server']);