process.env.NODE_ENV = 'development';

var path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');

module.exports = merge(common, {
    devServer: {
        contentBase: [
            path.join(__dirname, 'public'),
            path.join(__dirname, 'dist')
        ],
        port: 9000,
        writeToDisk: true,
        proxy: {
            '/api': 'http://localhost:3333'
        },
        historyApiFallback: true,
        host: "0.0.0.0",
        inline: true,
        hot: true,
        stats: {
            modules: false,
            chunks: false,
            children: false,
            chunkModules: false,
            hash: false,
        },
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        })
    ]
});
