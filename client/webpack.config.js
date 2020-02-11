const path = require('path');
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'app.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/js'),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css"]
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                loader: "ts-loader",
                include: [
                    path.resolve(__dirname, 'src'),
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        /** Inject CSS into the DOM. */
                        loader: 'style-loader'
                    },
                    {
                        /** The css-loader interprets @import and url() like import/require() and will resolve them. */
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    }
                ],
            },
        ]
    },
    plugins: [
        new TypedCssModulesPlugin({
            globPattern: 'src/**/*.css',
        }),
    ]
};