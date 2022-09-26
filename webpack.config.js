import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const webpackConfig = {
    entry: './src/js/scripts.js',
    output: {
        path: path.resolve(__dirname, 'dist/assets/js'),
        publicPath: '/',
        filename: 'scripts.js',
        chunkFilename: 'scripts.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    externals: {
        jquery: 'jQuery',
    },
    devtool: 'source-map',
};

export default webpackConfig;
