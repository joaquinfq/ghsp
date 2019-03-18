const browserSync = require('browser-sync');
const concat      = require('gulp-concat');
const gulp        = require('gulp');
const include     = require('gulp-include');
const sourcemaps  = require('gulp-sourcemaps');
const terser      = require('gulp-terser');

/**
 * Compila los archivos JS.
 */
gulp.task(
    'javascript',
    () => gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(include())
        .pipe(concat('script.js'))
        .pipe(terser())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
        .pipe(
            browserSync.reload(
                {
                    stream : true
                }
            )
        )
);
