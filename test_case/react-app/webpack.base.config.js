/**
 * Copyright (c) 2016-present, ecidi.
 * All rights reserved.
 * 
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
 
const path = require('path');
const webpack = require('webpack');

// PostCSS控件
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

module.exports = (options) => ({
    entry: options.entry,
    output: Object.assign({ // 编译到js/build.js中
        path: path.resolve(process.cwd(), 'build'),
        publicPath: '/',
    }, options.output), // 和开发传入的settings合并
    module: {
        rules: [{
            // 通过Babel转译在某些特定位置的所有 .js 文件
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: options.babelQuery,
        }, {
            test: /\.css$/,
            include: /node_modules/,
            use: ['style-loader', 'css-loader'],
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader',
        }, {
            test: /\.(jpg|png|gif)$/,
            use: [
                // 编译生成一个文件，并返回对应路径
                { loader:'file-loader' }, 
                // 将图片压缩
                { 
                    loader:'image-webpack-loader',
                    options:{
                        progressive:true, optimizationLevel: 7, interlaced: false, 
                        pngquant:{quality: "65-90", speed: 4}
                    }
                },
            ]
        }, {
            test: /\.html$/,
            loader: 'html-loader',
        }, {
            test: /\.(mp4|webm)$/,
            use: [{ loader:'url-loader', options: {limit: 10000} } ],
        }],
    },
    plugins: options.plugins.concat([
        new webpack.ProvidePlugin({
            // 启动 fetch
            fetch: 'exports?self.fetch!whatwg-fetch',
        }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
    ]),
    resolve: {
        modules: ['app', 'node_modules'],
        extensions: [
            '.js',
            '.jsx',
            '.react.js',
        ],
        mainFields: [
            'browser',
            'jsnext:main',
            'main',
        ],
    },
    devtool: options.devtool,
    target: 'web',
});