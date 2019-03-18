require('./tasks/pug');
require('./tasks/sass');
require('./tasks/javascript');
require('./tasks/browser-sync');

const gulp  = require('gulp');

/**
 * Observa los cambios en los archivos JS, SASS y PUG para regenerarlo.
 */
gulp.task(
    'watch',
    () =>
    {
        gulp.watch('src/**/*.sass', gulp.parallel('sass'));
        gulp.watch('src/**/*.pug', gulp.parallel('pug'));
        gulp.watch('src/**/*.js', gulp.parallel('javascript'));
    }
);

/**
 * Tarea para compilar los archivos SASS y PUG.
 */
gulp.task('build', gulp.parallel('sass', 'pug', 'javascript'));

/**
 * Tarea por defecto.
 */
gulp.task('default', gulp.series('build', 'browser-sync', 'watch'));
