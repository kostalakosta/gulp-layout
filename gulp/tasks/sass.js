import autoprefixer from 'autoprefixer';
import sass from 'postcss-node-sass';
import $ from '../vars/vars.js';

const styles = async () => {
    $.gulp.task('styles', (done) => {
        $.gulp
            .src($.path.src.style)
            .pipe($.plugins.plumber())
            .pipe(
                $.plugins.if(
                    !$.yargs.minifyCss,
                    $.plugins.sourcemaps.init({ largeFile: true })
                )
            )
            .pipe($.plugins.postcss([sass().on('error', sass.logError)]))
            .pipe($.plugins.if($.yargs.minifyCss, autoprefixer()))
            .pipe(
                $.plugins.if(
                    !$.yargs.minifyCss,
                    $.plugins.sourcemaps.write('.')
                )
            )
            .pipe($.gulp.dest($.path.build.style))
            .pipe($.browserSync.reload({ stream: true }));
        done();
    });
};

// const styles = $.gulp.task('style:build', async () =>
//     $.gulp
//         .src($.path.src.style)
//         .pipe($.plugins.plumber())
//         .pipe(
//             $.plugins.if(
//                 !$.yargs.minifyCss,
//                 $.plugins.sourcemaps.init({ largeFile: true })
//             )
//         )
//         .pipe($.plugins.postcss([sass().on('error', sass.logError)]))
//         .pipe($.plugins.if($.yargs.minifyCss, autoprefixer()))
//         .pipe($.plugins.if(!$.yargs.minifyCss, $.plugins.sourcemaps.write('.')))
//         .pipe($.gulp.dest($.path.build.style))
//         .pipe($.browserSync.reload({ stream: true }))
// );

export default styles;
