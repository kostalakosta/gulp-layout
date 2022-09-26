import gulp from 'gulp';
import * as dotenv from 'dotenv';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import gulpPlumber from 'gulp-plumber';
import gulpIf from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import csso from 'gulp-csso';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import webpackStream from 'webpack-stream';
import twig from 'gulp-twig';
import data from 'gulp-data';
import htmlmin from 'gulp-htmlmin';
import fs from 'fs';
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminJpegRecompress from 'imagemin-jpeg-recompress';
import gulpCheerio from 'gulp-cheerio';
import replace from 'gulp-replace';
import svgSprite from 'gulp-svg-sprite';
import favicons from 'gulp-favicons';
import webpackConfig from './webpack.config.js';

dotenv.config();

const sass = gulpSass(dartSass);

const args = {
    minify: false,
    minifyHtml: false,
    minifyCss: false,
    minifyJs: false,
};

const paths = {
    styles: {
        src: 'src/scss/styles.scss',
        dest: 'dist/assets/css',
        watch: 'src/files/**/*',
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/assets/scripts/', // not used
        watch: 'src/scripts/**/*.js',
    },
    html: {
        src: 'src/html/*.twig',
        dest: 'dist/',
        watch: 'src/html/**/*.twig',
    },
    images: {
        src: 'src/images/**/*.+(png|jpg|jpeg|gif|svg)',
        dest: 'dist/assets/images/',
        watch: 'src/images/**/*.+(png|jpg|jpeg|gif|svg)',
    },
    icons: {
        src: 'src/icons/*.svg',
        dest: 'dist/assets/icons/',
        watch: 'src/icons/*.svg',
    },
    favicons: {
        srcLg: 'src/favicons/favicon_lg.png',
        srcSm: 'src/favicons/favicon_sm.png',
        dest: 'dist/assets/favicon',
        watchLg: 'src/favicons/favicon_lg.png',
        watchSm: 'src/favicons/favicon_sm.png',
    },
    files: {
        src: 'src/files/**/*',
        dest: 'dist/assets/files/',
        watch: 'src/files/**/*',
    },
    fonts: {
        src: 'src/fonts/**/*',
        dest: 'dist/assets/fonts/',
        watch: 'src/fonts/**/*',
    },
};

args.minify = !!process.argv.includes('--minify');
args.minifyHtml =
    process.argv.includes('--minifyHtml') !== false
        ? !!process.argv.includes('--minifyHtml')
        : args.minify;
args.minifyCss =
    process.argv.includes('--minifyCss') !== false
        ? !!process.argv.includes('--minifyCss')
        : args.minify;
args.minifyJs =
    process.argv.includes('--minifyJs') !== false
        ? !!process.argv.includes('--minifyJs')
        : args.minify;

if (args.minifyJs) {
    webpackConfig.mode = 'production';
} else {
    webpackConfig.mode = webpackConfig.mode || 'development';
}

// Tasks
export const clean = () => del(['dist']);

function browsersync() {
    browserSync.init({
        server: { baseDir: 'dist/' },
        notify: false,
        online: process.env.BSYNC_ONLINE, // set 'true' to online demonstration
        tunnel: process.env.PROJECT_NAME || 'project', // http://aviatx.localtunnel.me
    });
}

export function styles() {
    return gulp
        .src(paths.styles.src)
        .pipe(gulpPlumber())
        .pipe(gulpIf(!args.minifyCss, sourcemaps.init({ largeFile: true })))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpIf(args.minifyCss, csso()))
        .pipe(
            gulpIf(
                !args.minifyCss,
                autoprefixer({
                    cascade: true,
                })
            )
        )
        .pipe(
            gulpIf(
                args.minifyCss,
                autoprefixer({
                    cascade: false,
                })
            )
        )
        .pipe(gulpIf(!args.minifyCss, sourcemaps.write('.')))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

export function scripts() {
    return gulp
        .src(paths.scripts.src)
        .pipe(gulpPlumber())
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest(webpackConfig.output.path))
        .pipe(browserSync.stream());
}

export function html() {
    return gulp
        .src(paths.html.src)
        .pipe(gulpPlumber())
        .pipe(
            data(() => JSON.parse(fs.readFileSync('./src/html/data/data.json')))
        )
        .pipe(twig())
        .pipe(gulpIf(args.minifyHtml, htmlmin({ collapseWhitespace: true })))
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream());
}

export function images() {
    return gulp
        .src(paths.images.src)
        .pipe(gulpPlumber())
        .pipe(
            imagemin([
                imagemin.jpegtran({ progressive: true }),
                imagemin.optipng(),
                imagemin.svgo(),
                imageminPngquant(),
                imageminJpegRecompress(),
            ])
        )
        .pipe(gulp.dest(paths.images.dest))
        .pipe(webp())
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browserSync.stream());
}

export function icons() {
    return gulp
        .src(paths.icons.src)
        .pipe(gulpPlumber())
        .pipe(
            gulpCheerio({
                run($) {
                    $('[fill]').removeAttr('fill');
                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                },
                parserOptions: { xmlMode: true },
            })
        )
        .pipe(replace('&gt;', '>'))
        .pipe(
            svgSprite({
                mode: {
                    stack: {
                        sprite: '../sprite.svg',
                        example: true,
                    },
                },
            })
        )
        .pipe(gulp.dest(paths.icons.dest))
        .pipe(browserSync.stream());
}

export function faviconSm() {
    return gulp
        .src(paths.favicons.srcLg, { allowEmpty: true })
        .pipe(gulpPlumber())
        .pipe(
            favicons({
                html: 'favicon-logo.html',
                pipeHTML: true,
                path: '/assets/favicon/',
                replace: true,
                start_url: '/',
                icons: {
                    appleIcon: false,
                    favicons: true,
                    online: false,
                    appleStartup: false,
                    android: false,
                    firefox: false,
                    yandex: false,
                    windows: false,
                    coast: false,
                },
            })
        )
        .pipe(gulp.dest(paths.favicons.dest))
        .pipe(browserSync.stream());
}

export function faviconLg() {
    return gulp
        .src(paths.favicons.srcSm, { allowEmpty: true })
        .pipe(gulpPlumber())
        .pipe(
            favicons({
                appName: 'aviatx',
                appShortName: 'aviatx',
                appDescription: 'aviatx',
                html: 'favicon.html',
                pipeHTML: true,
                url: 'aviatx',
                path: '/assets/favicon/',
                replace: true,
                version: 3,
                lang: 'ru-RU',
                start_url: '/',
                icons: {
                    appleIcon: true,
                    favicons: false,
                    online: false,
                    appleStartup: false,
                    android: true,
                    firefox: true,
                    yandex: true,
                    windows: true,
                    coast: true,
                },
            })
        )
        .pipe(gulp.dest(paths.favicons.dest))
        .pipe(browserSync.stream());
}

export function files() {
    return gulp
        .src(paths.files.src)
        .pipe(gulpPlumber())
        .pipe(gulp.dest(paths.files.dest))
        .pipe(browserSync.stream());
}

export function fonts() {
    return gulp
        .src(paths.fonts.src)
        .pipe(gulpPlumber())
        .pipe(gulp.dest(paths.fonts.dest))
        .pipe(browserSync.stream());
}

// Watcher
export function watchFiles() {
    gulp.watch(paths.styles.watch, styles);
    gulp.watch(paths.scripts.watch, scripts);
    gulp.watch(paths.html.watch, html);
    gulp.watch(paths.images.watch, images);
    gulp.watch(paths.icons.watch, icons);
    gulp.watch(paths.favicons.watchSm, faviconSm);
    gulp.watch(paths.favicons.watchLg, faviconLg);
    gulp.watch(paths.files.watch, files);
    gulp.watch(paths.fonts.watch, fonts);
}

const build = gulp.series(
    clean,
    gulp.parallel(
        styles,
        scripts,
        images,
        icons,
        html,
        faviconSm,
        faviconLg,
        files,
        fonts,
        browsersync,
        watchFiles
    )
);

export default build;
