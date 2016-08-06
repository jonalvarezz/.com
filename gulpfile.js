'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var nib = require('nib');
var through = require('through');
var isDev = process.argv.indexOf('watch') !== -1;
var wintersmith = require('run-wintersmith');

var PORT = 8080;
var baseDir = './contents/';
wintersmith.settings.port = PORT;

// [DEV] Process CSS files and reload the web browser
gulp.task('styles:build', function() {
  return gulp.src(baseDir + 'stylus/main.styl')
    .pipe(! isDev ? through() : $.plumber())
    .pipe($.sourcemaps.init())
      .pipe($.stylus({
        'use': nib()
      }))
      .pipe(! isDev ? $.minifyCss() : through())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(baseDir + 'css/'));
});

gulp.task('publish', ['deploy'], function () {
  return gulp.src('./build/**/*')
    .pipe($.ghPages());
})

gulp.task('deploy', ['styles:build'], function() {
  wintersmith.build(function () {
    //
  })
});


gulp.task('watch', ['default'], function() {
  wintersmith.preview();
  gulp.watch( [baseDir + 'stylus/**/*.styl'], ['styles:build'] )
});

gulp.task('default', [ 'styles:build']);
