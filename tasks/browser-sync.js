const browserSync = require('browser-sync');
const gulp        = require('gulp');

/**
 * Observa las tareas de SASS y PUG y refresca el navegador cuando terminan.
 */
gulp.task(
    'browser-sync',
    gulp.parallel(
        'javascript',
        'sass',
        'pug',
        done => {
            browserSync(
                {
                    server : {
                        baseDir : 'dist'
                    },
                    notify : false
                }
            );
            done();
        }
    )
);
gulp.watch('dist/**/*').on('change', browserSync.reload);
