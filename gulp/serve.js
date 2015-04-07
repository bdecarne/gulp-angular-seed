'use strict';

var gulp = require('gulp');

var browserSync = require('browser-sync');
var modRewrite = require('connect-modrewrite');

function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  // connect middlewares
  var middlewares = [modRewrite(['!\.html|\.woff|\.js|\.ttf|\.svg|\.css|\.png$ /index.html [L]'])];

  var options = {
    //startPath: '/index.html',
    server: {
      baseDir: baseDir,
      middleware: middlewares
    },
    browser: browser,
    open: true
  };

  if(files) {
    options.files = files;
  }

  browserSync(options);
}

gulp.task('serve', ['watch'], function () {
  browserSyncInit([
    '.tmp/templates',
    '.tmp',
    'app'
  ], [
    '.tmp/styles/styles.css',
    '.tmp/scripts/app.js',
    '.tmp/templates/**/*.html',
    'app/*.html',
    'app/images/**/*'
  ]);
});

gulp.task('serve:dist', ['build:dist'], function () {
  browserSyncInit('dist');
});