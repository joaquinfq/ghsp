const browserSync = require('browser-sync');
const gulp        = require('gulp');

/**
 * Recompila los archivos .pug y refresca el navegador.
 */
gulp.task(
    'rebuild',
    gulp.parallel(
        'pug',
        () => browserSync.reload()
    )
);

/**
 * Observa las tareas de SASS y PUG y refresca el navegador cuando terminan.
 */
gulp.task(
    'browser-sync',
    gulp.parallel(
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
