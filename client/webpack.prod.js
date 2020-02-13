const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: 'app.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public/js'),
    },
    optimization: {
        minimize: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        })
    ]
});
