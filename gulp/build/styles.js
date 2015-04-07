'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*']
});

/**
 * styles
 **/
gulp.task('styles', function () {
  return gulp.src('app/styles/**/*.scss')
    .pipe($.plumber(function(error) {
      $.util.log($.util.colors.red(error.message));
      // prevent task crash on error
      this.emit('end');
    }))
    .pipe($.sass({style: 'expanded'}))
    .pipe($.autoprefixer('last 1 version, ie 9, ie 10, ie 11'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size());
});

gulp.task('styles:dist', ['styles'], function() {
  return gulp.src('.tmp/styles/**/*.css')
    .pipe($.cssmin())
    .pipe(gulp.dest('dist/styles'))
    .pipe($.size());
});
