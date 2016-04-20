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
import cssnano      from 'cssnano';
// PostCSS

// WebPack
import webpack       from 'webpack';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config';
// WebPack

//Service
import plumber  from 'gulp-plumber';
import imagemin from 'gulp-imagemin';
import jsDoc    from 'gulp-jsdoc';

const NODE_ENV = process.env.NODE_ENV || 'development';
const browserSync = require('browser-sync').create(); 
//Service
// ******************** GULP ************************//


//HTML 
gulp.task('html',() => {
    gulp.src('./vendor/index.html')
    .pipe(plumber())
    .pipe(gulp.dest('./app/'));
});
//HTML 

//CSS
gulp.task('stylus',() => {
    let processors=[
        alias,
        animation,
        autoprefixer({browsers: ['last 2 versions']})
    ];

    if(NODE_ENV === 'production'){
        processors.push(cssnano);
    }

    gulp.src('./vendor/css/main.styl')
        .pipe(plumber())
        .pipe(stylus({use:[rupture()]}))
        .pipe(postcss(processors))
    .pipe(gulp.dest('./app/css/'));
});
//CSS
//Fonts
gulp.task('fonts',() => {
    gulp.src('./vendor/css/Fonts/*')
    .pipe(gulp.dest('./app//css/fonts/'));
});
//Fonts

//JavaScript 
gulp.task('js',() => {
    gulp.src('./vendor/js/*.js')
        .pipe(plumber())
        .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('./app/js/'));
});
//JavaScript

//imagemin
gulp.task('imagemin',() => {
    gulp.src('./vendor/images/*')
        .pipe(imagemin({progressive:true}))
    .pipe(gulp.dest('./app/images/'));
});
//imagemin 

//jsDOC
// gulp.task('jsDoc',() => {
//     gulp.src('./vendor/js/*.js')
//         .pipe(jsDoc('./documentation-output'))
//     .pipe(gulp.dest('./app/js/'));
// });
//jsDOC


//BrowserSync
gulp.task('watch',() => {
    gulp.watch('./vendor/index.html', ['html', browserSync.reload]);
    gulp.watch('./vendor/css/**/*.styl', ['stylus', browserSync.reload]);
    gulp.watch('./vendor/js/**/*.js', ['js',() => {
        setTimeout(browserSync.reload.bind(null),250)
    }]);
});

gulp.task('server',() => {
    browserSync.init({
        server: "./app",
        port:9000
    });
});
//BrowserSync



gulp.task('default',['html','stylus','js','imagemin','fonts','watch','server']);