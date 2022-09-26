import LazyLoad from 'vanilla-lazyload';

const lazyLoad = () => {
    const lazyLoadImages = new LazyLoad({
        elements_selector: '.js--lazyload',
        load_delay: 0,
    });
    return lazyLoadImages;
};

export default lazyLoad;
