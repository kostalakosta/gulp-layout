import lazyLoad from './vendors/lazyload.js';

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.js--lazyload')) {
        lazyLoad();
    }
});
