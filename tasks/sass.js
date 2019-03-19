const autoprefixer = require('gulp-autoprefixer');
const gulp         = require('gulp');
const sass         = require('gulp-sass');

/**
 * Compila los archivos `.sass` generando el archivo `main.css`.
 */
gulp.task(
    'sass',
    () => gulp.src('src/style.sass')
        .pipe(
            sass(
                {
                    outputStyle : 'compressed'
                }
            )
        )
        .on('error', sass.logError)
        .pipe(
            autoprefixer(
                ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
                {
                    cascade : true
                }
            )
        )
        .pipe(gulp.dest('dist'))
);
