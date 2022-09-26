import path from '../path/path.js';
import $ from '../vars/vars.js';

const clean = async () => $.gulp.task('clean', () => $.del([path.clean.all]));

export default clean;
