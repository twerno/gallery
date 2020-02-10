var path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000,
        writeToDisk: true,
        proxy: {
            '/api': 'http://localhost:3333'
        }
    },
    devtool: 'source-map',
});
