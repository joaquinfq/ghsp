const fs        = require('fs');
const gulp      = require('gulp');
const path      = require('path');
const pug       = require('gulp-pug');
const Transform = require('stream').Transform;
const tpldir    = path.join(__dirname, '..', 'src', 'tpl');

function getTpls()
{
    const _tpls = {};
    if (fs.existsSync(tpldir))
    {
        fs.readdirSync(tpldir).forEach(
            tplfile =>
            {
                const _ext  = path.extname(tplfile);
                const _name = _ext.substr(1);
                const _tpl  = `
<script id="${ path.basename(tplfile, _ext) }" type="text/x-tpl-${ _name }" data-type="${ _name }">
${ fs.readFileSync(path.join(tpldir, tplfile)) }
</script>`;
                if (_name in _tpls)
                {
                    _tpls[_name].push(_tpl);
                }
                else
                {
                    _tpls[_name] = [_tpl];
                }
            }
        );
    }

    return _tpls;

}

function replace()
{
    const _transform      = new Transform({ objectMode : true });
    _transform._transform = function (file, encoding, callback)
    {
        if (file.isNull())
        {
            callback(null, file);
        }
        else if (file.isStream())
        {
            this.emit('error', 'Sin soporte para streams!');
        }
        else if (file.isBuffer())
        {
            const _tpls  = getTpls();
            const _types = Object.keys(_tpls);
            if (_types.length)
            {
                let _contents = file.contents.toString(encoding);
                _types.forEach(
                    type => _contents = _contents.replace(`{{${ type }}}`, _tpls[type].join('\n'))
                );
                file.contents = Buffer.from(_contents, encoding);
            }
            callback(null, file);
        }
    };

    return _transform;
}

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
        .pipe(replace())
        .pipe(gulp.dest('dist'))
);
