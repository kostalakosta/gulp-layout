const path = {
    src: {
        // Source files
        twig: 'src/twig/*.twig',
        style: 'src/scss/styles.scss',
        img: 'src/images/**/*.+(png|jpg|jpeg|gif|svg)',
        svg: 'src/images/*.svg',
        svgIcons: 'src/icons/*.svg',
        js: 'src/js/**/*.js',
        sriptsJs: 'src/js/scripts.js',
        fonts: 'src/fonts/*',
        favicon_lg: 'src/favicon/favicon_lg.png',
        favicon_sm: 'src/favicon/favicon_sm.png',
        files: 'src/files/**/*',
    },
    build: {
        // Build files
        root: 'dist/',
        style: 'dist/assets/css',
        img: 'dist/assets/images',
        imgWebp: 'dist/assets/images/webp',
        svgIcons: 'dist/assets/icons/svg',
        imgFavicon: 'dist/assets/favicon',
        js: 'dist/assets/js',
        fonts: 'dist/assets/fonts',
        files: 'dist/assets/files',
        zip: 'zip',
    },
    watch: {
        // Watch files
        json: 'src/data/*.json',
        twig: 'src/twig/**/*.pug',
        style: 'src/**/*.+(scss|css)',
        files: 'src/files/**/*',
    },
    clean: {
        all: 'dist/',
    },
};

export default path;
