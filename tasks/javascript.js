const concat     = require('gulp-concat');
const gulp       = require('gulp');
const gulpif     = require('gulp-if');
const include    = require('gulp-include');
const net        = require('node-env-tools');
const sourcemaps = require('gulp-sourcemaps');
const terser     = require('gulp-terser');

/**
 * Compila los archivos JS.
 */
gulp.task(
    'javascript',
    () => gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(include())
        .pipe(concat('script.js'))
        .pipe(gulpif(!net.isPro(), terser()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
);
