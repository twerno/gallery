const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'app.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/js'),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/, loader: "ts-loader",
                include: [
                    path.resolve('src'),
                ]
            },
        ]
    }
};