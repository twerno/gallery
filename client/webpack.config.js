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
        alias: {
            '@shared': path.resolve('../server/shared/lib'),
        },
        extensions: [".ts", ".tsx", ".js", ".css"],
        modules: ['src', 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
                            plugins: ['babel-plugin-styled-components']
                        }
                    },
                    {
                        loader: 'ts-loader'
                    }
                ],
                exclude: [path.resolve(__dirname, 'node_modules')]
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
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            },
                        },
                    }
                ],
            },
        ]
    },
    plugins: [
        new TypedCssModulesPlugin({
            globPattern: 'src/**/*.module.css',
        }),
    ]
};