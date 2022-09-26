import $ from '../vars/vars.js';

// const files = $.gulp.task('files:build', async () =>
//     $.gulp.src(path.src.resources).pipe($.plugins.changed(path.build.root)).pipe($.gulp.dest(path.build.root))
// );

// const files = () => {
//     $.gulp.task('files:build', async () => {
//         return $.gulp.src(path.src.resources).pipe($.plugins.changed(path.build.root)).pipe($.gulp.dest(path.build.root));
//     }
// }

// const buildDocs = (mode) => (done) => {
//     pump(
//         [
//             gulp.src(srcPath('docs')),
//             gulp.dest(distPath('docs', false, mode)),
//             browserSync.stream(),
//         ],
//         done
//     );
// };

const files = async () => {
    $.gulp.task('files', () => {
        $.gulp
            .src($.path.src.files)
            .pipe($.plugins.plumber())
            // .pipe($.plugins.changed(path.build.files))
            .pipe($.gulp.dest($.path.build.files));
    });
};

export default files;
