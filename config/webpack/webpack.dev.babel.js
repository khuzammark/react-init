const webpack = require('webpack');
const Jarvis = require('webpack-jarvis');

const paths = require('./paths');

module.exports = {
    mode: 'development',
    output: {
        filename: '[name].js',
        path: paths.outputPath,
        chunkFilename: '[name].js'
    },
    performance: {
        hints: 'warning',
        maxAssetSize: 20000000,
        maxEntrypointSize: 8500000,
        assetFilter: assetFilename => {
            return (
                assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
            );
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        contentBase: paths.outputPath,
        compress: true,
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/api/**': 'http://localhost:3000'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new Jarvis({
            port: 1337
        })
    ]
};
