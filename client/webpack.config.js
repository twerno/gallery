const path = require('path');
require('react-hot-loader/patch');

const isDevelopment = process.env.NODE_ENV === 'development';
console.log(`>>>\n${isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION'}\n>>>`);

module.exports = {
    entry: ['react-hot-loader/patch', './src/main/index.tsx'],
    output: {
        filename: 'app.js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/js/',
        path: path.resolve(__dirname, 'dist/main/js'),
    },
    resolve: {
        alias: {
            '@shared': path.resolve('../server/shared/lib'),
            'react-dom': '@hot-loader/react-dom',
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: ['src', 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.(tsx?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "react-hot-loader/webpack"
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', { "useBuiltIns": "usage", "corejs": "3.6.4" }],
                                '@babel/preset-react',
                                '@babel/preset-typescript',
                            ],
                            "plugins": [
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-proposal-object-rest-spread',
                                ["babel-plugin-styled-components",
                                    {
                                        "displayName": isDevelopment,
                                        "fileName": isDevelopment
                                    }
                                ],
                                "react-hot-loader/babel"
                            ]
                        }
                    },
                    {
                        loader: "ts-loader",
                    },
                ]
            },
        ]
    },
    plugins: [
    ]
};