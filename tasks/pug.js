const gulp  = require('gulp');
const pug   = require('gulp-pug');
const browserSync = require('browser-sync');
/**
 * Compila los archivos PUG.
 */
gulp.task(
    'pug',
    () => gulp
        .src('src/index.pug')
        .pipe(pug())
        .on(
            'error',
            function (err)
            {
                process.stderr.write(err.message + '\n');
                this.emit('end');
            }
        )
        .pipe(gulp.dest('dist'))
        .pipe(
            browserSync.reload(
                {
                    stream : true
                }
            )
        )
);
