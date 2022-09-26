let path = require('./path/path.js');
let fs = require('fs');

module.exports = function () {
    $.gulp.task('twig:build', () => {
        return new Promise((resolve, reject) => {
            emittyPug.scan(global.emittyPugChangedFile).then(() => {
                $.gulp
                    .src(path.path.src.pug)
                    .pipe($.plugins.plumber())
                    .pipe(emittyPug.filter(global.emittyPugChangedFile))
                    .pipe($.plugins.data(() => JSON.parse(fs.readFileSync('./src/base/data/data.json', 'utf8')))) // Парсим JSON
                    .pipe(
                        $.plugins.pug({
                            pretty: !$.yargs.minifyHtml,
                        })
                    )
                    .pipe($.gulp.dest(path.path.build.root))
                    .on('end', () => {
                        $.browserSync.reload();
                        resolve();
                    })
                    .on('error', reject);
            });
        });
    });
};
