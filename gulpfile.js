'use strict';

let gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    cssnano       = require('gulp-cssnano'),
    sourcemaps    = require('gulp-sourcemaps'),
    autoprefixer  = require('gulp-autoprefixer');

// Explicitly set up in case the default compiler changes
sass.compiler     = require('node-sass');

let srcFolder     = './src/',
    buildFolder   = './build/';

// Compile and move styles
gulp.task('styles', function () {
  gulp.src(srcFolder + 'styles/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 5 versions'],
        remove: false,
        cascade: false
      }))
      .pipe(cssnano())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(buildFolder + 'styles/'))
});

// Move template
gulp.task('template', function () {
  gulp.src(srcFolder + '**/*.html')
      .pipe(gulp.dest(buildFolder))
});



gulp.task('default', ['styles', 'template'], function () {

  gulp.watch(srcFolder + 'styles/**/*.scss', ['styles']);
  gulp.watch(srcFolder + '**/*.html', ['template']);

});