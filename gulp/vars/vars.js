import gulp from 'gulp';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import path from '../path/path.js';
import webpackConfig from '../../webpack.config.js';

const $ = {
    gulp,
    path,
    webpackConfig,
    browserSync,
    del,
    yargs: yargs(hideBin(process.argv)).default({
        minify: false,
        minifyHtml: null,
        minifyCss: null,
        minifyJs: null,
    }).argv,
    plugins: gulpLoadPlugins({
        overridePattern: true,
        pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*', 'imagemin-*'],
        config: './package.json',
        scope: [
            'dependencies',
            'devDependencies',
            'optionalDependencies',
            'peerDependencies',
        ],
    }),
    variables: {
        bsyncBaseDir: 'dist/',
        bsyncOnline: false,
        bsyncTunnel: 'aviatx',
    },
};

export default $;
