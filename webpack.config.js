'use strict';

const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    watch: true,
    target: 'electron-main',
    entry: [
        './app/src/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, './app/dist'),
        publicPath: path.join(__dirname, './app/src')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:[
                    {loader: 'style-loader'},
                    {loader: 'css-loader', options: {module: false}},
                ]
            },
            {
                test: /\.less$/,
                use:[
                    {loader: 'style-loader'},
                    {loader: 'css-loader', options:{module: false}},
                    {loader: 'less-loader'}
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {loader: "url-loader", options: {limit: 50000}}
            },
            {
                test: /\.jsx?$/,
                use: {loader: 'babel-loader'},
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['./app/dist']),
    ],
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    }
}
