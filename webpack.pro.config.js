'use strict';

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('./package')

//生成package.json
fs.writeFileSync('./app/package.json', JSON.stringify({
    "name": config.name,
    "version" : config.version,
    "main": "main.js"
}))

module.exports = {
    target: 'electron-main',
    entry: [
        './app/src/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, './app/dist'),
        publicPath: '../'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        {loader: 'css-loader', options: {module: false, minimize: true}},
                    ]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:[
                        {loader: 'css-loader', options:{module: false, minimize: true}},
                        {loader: 'less-loader'}
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {loader: "url-loader", options: {limit: 1000, name: 'images/[name].[hash:4].[ext]'}}
            },
            {
                test: /\.jsx?$/,
                use: {loader: 'babel-loader'},
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles/main.css")
    ],
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    }
}