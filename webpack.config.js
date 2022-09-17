const path = require('path')
const webpack = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')

const APP_DIR = path.join(__dirname, 'src')
const BUILD_DIR = path.join(__dirname, 'dist')

module.exports = {
    devServer: {
        hot: true,
        port: 9002,
        static: path.join(__dirname, 'dist'),
    },
    entry: {
        app: APP_DIR + '/index.tsx',
        vendor: [
            '@reduxjs/toolkit',
            '@redux-saga/core',
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'redux',
            'styled-components',
        ],
    },
    mode: process.env.NODE_ENV || 'development',
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [{ loader: 'url-loader' }],
            },
            {
                exclude: /node_modules/,
                include: APP_DIR,
                test: /\.(js|jsx|ts|tsx)$/,
                use: [{ loader: 'babel-loader' }],
            },
        ],
    },
    output: {
        filename: '[name].prod.js',
        path: BUILD_DIR,
    },
    plugins: [new ESLintPlugin()],
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src', 'components'),
            sagas: path.resolve(__dirname, 'src', 'sagas'),
            store: path.resolve(__dirname, 'src', 'store'),
            theme: path.resolve(__dirname, 'src', 'theme'),
        },
        extensions: ['.css', '.js', '.jsx', '.json', '.scss', '.ts', '.tsx'],
        modules: ['node_modules'],
    },
}
