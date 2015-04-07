'use strict';

var gulp = require('gulp');
var lazypipe = require('lazypipe');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*']
});

/**
 * config
 **/
var configPipe = lazypipe()
  .pipe($.yaml)
  .pipe($.extend, 'config.js')
  .pipe($.wrap, 'angular.module(\'app\').constant(\'appConfig\', <%= contents %>);');

gulp.task('config', function() {
  return gulp.src('./config/config.yml')
    .pipe(configPipe())
    .pipe(gulp.dest('./.tmp/scripts'))
    .pipe($.size());
});

/**
 * scripts
 **/
gulp.task('scripts', ['config'], function() {
  return gulp.src(['app/scripts/app.js', '.tmp/scripts/config.js'])
    .pipe($.concat('app.js'))
    .pipe($.include())
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe($.size());
});

gulp.task('scripts:dist', ['config', 'templates:dist'], function() {
  return gulp.src(['app/scripts/app.js', '.tmp/scripts/config.js', '.tmp/templates/templates.js'])
    .pipe($.concat('app.js'))
    .pipe($.include())
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe($.size());
});