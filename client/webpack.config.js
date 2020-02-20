const path = require('path');

const isDevelopment = process.env.NODE_ENV === 'development';
console.log(`>>>\n${isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION'}\n>>>`);

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'app.js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/js/',
        path: path.resolve(__dirname, 'dist/js'),
    },
    resolve: {
        alias: {
            '@shared': path.resolve('../server/shared/lib'),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: ['src', 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts|js|jsx)$/,
                exclude: /node_modules/,
                use: [
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
                                ]
                            ]
                        }
                    },
                    {
                        loader: 'ts-loader'
                    },
                ]
            },
        ]
    },
    plugins: [
    ]
};