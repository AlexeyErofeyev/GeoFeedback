import gulp from 'gulp';

// Stylus
import stylus  from 'gulp-stylus';
import rupture from 'rupture';
// Stylus

// PostCSS
import postcss      from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import animation    from 'postcss-animation';
import alias        from 'postcss-alias';
// PostCSS

// WebPack
import webpack       from 'webpack';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config';
// WebPack

//BrowserSync
const browserSync = require('browser-sync').create(); 
//BrowserSync
// ******************** GULP ************************//


//HTML 
gulp.task('html',() => {
    gulp.src('./vendor/index.html')
    .pipe(gulp.dest('./app/'));
});
//HTML 

//CSS
gulp.task('stylus',() => {
    let processors=[
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
gulp.task('js',() => {
    gulp.src('./vendor/js/*.js')
        .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('./app/js/'));
});
//JavaScript 

//BrowserSync
gulp.task('watch',() => {
    gulp.watch('./vendor/index.html', ['html',browserSync.reload]);
    gulp.watch('./vendor/css/**/*.styl', ['stylus',browserSync.reload]);
    gulp.watch('./vendor/js/**/*.js', ['js',browserSync.reload]);
});


gulp.task('server',() => {
    browserSync.init({
        server: "./app",
        port:9000
    });
});
//BrowserSync



gulp.task('default',['html','stylus','js','watch','server']);