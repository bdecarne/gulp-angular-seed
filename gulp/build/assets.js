'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*']
});

/**
 * images
 **/
gulp.task('images:dist', function () {
  return gulp.src('app/assets/images/**/*')
    /*.pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))*/
    .pipe(gulp.dest('dist/assets/images'))
    .pipe($.size());
});

/**
 * assets
 **/
gulp.task('assets:dist', ['images:dist'], function () {
  return gulp.src(['app/assets/**/*', '!app/assets/images/**/*'])
    .pipe(gulp.dest('dist/assets'))
    .pipe($.size());
});
