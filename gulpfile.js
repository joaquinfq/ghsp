require('./tasks/pug');
require('./tasks/sass');
require('./tasks/javascript');

const gulp = require('gulp');
const net  = require('node-env-tools');

/**
 * Tarea para compilar los archivos SASS y PUG.
 */
gulp.task('build', gulp.parallel('sass', 'pug', 'javascript'));

if (!net.isPro())
{
    require('./tasks/browser-sync');
    /**
     * Observa los cambios en los archivos JS, SASS y PUG para regenerarlo.
     */
    gulp.task(
        'watch',
        () =>
        {
            gulp.watch('src/**/*.js', gulp.parallel('javascript'));
            gulp.watch('src/**/*.pug', gulp.parallel('pug'));
            gulp.watch('src/**/*.sass', gulp.parallel('sass'));
        }
    );

    /**
     * Tarea por defecto.
     */
    gulp.task('default', gulp.series('build', 'browser-sync', 'watch'));
}
