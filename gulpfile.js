var gulp         = require('gulp'),
	  stylus       = require('gulp-stylus'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),// for PostCSS
    animation    = require('postcss-animation'),// for PostCSS
    browserSync  = require('browser-sync').create(); 


gulp.task('html',function() {
  gulp.src('./vendor/index.html')
      .pipe(gulp.dest('./app/'));
});

gulp.task('js',function() {
  gulp.src('./vendor/js/main.js')
      .pipe(gulp.dest('./app/js/'));
});

gulp.task('stylus', function () {
  var processors=[
    animation,
    autoprefixer({browsers: ['last 2 versions']})
  ];

  gulp.src('./vendor/css/main.styl')
    .pipe(stylus())
    .pipe(postcss(processors))
    .pipe(gulp.dest('./app/css/'));
});


 gulp.task('watch', function() {
    gulp.watch('./vendor/index.html', ['html',browserSync.reload]);
    gulp.watch('./vendor/css/*.styl', ['stylus',browserSync.reload]);
    gulp.watch('./vendor/js/main.js', ['js',browserSync.reload]);
  });


 gulp.task('server',function() {
   browserSync.init({
        server: "./app",
        port:9000
    });
 });



gulp.task('default',['html','stylus','js','watch','server']);