import path from '../path/path.js';
import $ from '../vars/vars.js';

// const watch = () => {
//     $.gulp.task('watch', ['files'], () => {
//         $.gulp.watch(path.watch.files, $.gulp.series('files'));
//         // $.gulp.watch(path.watch.json, { usePolling: true }, $.gulp.series('twig:build'));
//         // $.gulp.watch(path.watch.pug, { usePolling: true }, $.gulp.series('pug:build')).on('all', (event, file) => {
//         //     global.emittyPugChangedFile = event === 'unlink' ? undefined : file;
//         // });
//         // $.gulp.watch(path.watch.style, { usePolling: true }, $.gulp.series('style:build'))
//         // $.gulp.watch(path.src.js, { usePolling: true }, $.gulp.series('js:build'));
//         // $.gulp.watch([path.src.img, '!src/images/icons/**/*'], { usePolling: true }, $.gulp.series('img:build'));
//         // $.gulp.watch(path.src.imgComp, { usePolling: true }, $.gulp.series('img:build'));
//         // $.gulp.watch(path.src.pngIcons, $.gulp.series('spriteImg:build'));
//         // $.gulp.watch(path.src.svgIcons, $.gulp.series('spriteSvg:build'));
//         // $.gulp.watch(path.src.resources, $.gulp.series('resources:build'));
//     });
// };

// function watchFiles() {
//     gulp.watch(paths.scripts.src, scripts);
//     gulp.watch(paths.styles.src, styles);
// }

const watch = async () => {
    $.gulp.watch(path.watch.files, $.gulp.series('files'));
    $.gulp.watch(path.watch.style, $.gulp.series('styles'));
};

// $.gulp.task('watch', () =>
//     // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
//     $.plugins.watch(path.watch.files, () => {
//         $.gulp.series('files');
//     })
// );

// gulp.task('watch', ['wiredep', 'styles'] ,function () {
//   watch('app/components/**/*.sass', function() {
//     gulp.start('build');
//   });
//   watch('app/components/**/*.js', function() {
//     gulp.start('scripts');
//   });
//   watch('app/images/**/*', function() {
//     gulp.start('images');
//   });
//   watch('bower.json', function() {
//     gulp.start('wiredep');
//   });
// });

// .pipe(watch(sassData.watch, { /*other options*/ }, function() {

// const watch = $.gulp.task(
//     'watch',
//     async () => {
//         $.gulp.watch(
//             path.watch.files,
//             $.gulp.series('files')
//         );
//     }
//     // $.gulp.watch(path.watch.json, { usePolling: true }, $.gulp.series('twig:build'));
//     // $.gulp.watch(path.watch.pug, { usePolling: true }, $.gulp.series('pug:build')).on('all', (event, file) => {
//     //     global.emittyPugChangedFile = event === 'unlink' ? undefined : file;
//     // });
//     // $.gulp.watch(path.watch.style, { usePolling: true }, $.gulp.series('style:build'))
//     // $.gulp.watch(path.src.js, { usePolling: true }, $.gulp.series('js:build'));
//     // $.gulp.watch([path.src.img, '!src/images/icons/**/*'], { usePolling: true }, $.gulp.series('img:build'));
//     // $.gulp.watch(path.src.imgComp, { usePolling: true }, $.gulp.series('img:build'));
//     // $.gulp.watch(path.src.pngIcons, $.gulp.series('spriteImg:build'));
//     // $.gulp.watch(path.src.svgIcons, $.gulp.series('spriteSvg:build'));
//     // $.gulp.watch(path.src.resources, $.gulp.series('resources:build'));
// );

export default watch;
