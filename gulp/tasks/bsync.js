import $ from '../vars/vars.js';

const bsync = () =>
    $.gulp.task('bsync', async () => {
        $.browserSync.init({
            server: {
                baseDir: $.variables.bsyncBaseDir,
            },
            notify: false,
            online: $.variables.bsyncOnline, // Work offline without internet connection
            tunnel: $.variables.bsyncTunnel, // Demonstration page: http://projectname.localtunnel.me
        });
    });

export default bsync;
