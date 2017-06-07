/**
 * Copyright (c) 2016-present, ecidi.
 * All rights reserved.
 * 
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
 
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const logger = require('./server/logger');
const pkg = require(path.resolve(process.cwd(), 'package.json'));
const dllPlugin = pkg.dllPlugin;

const plugins = [
    // 生成热部署替换所需的模块
    new webpack.HotModuleReplacementPlugin(),
    // 报错但不退出webpack进程
    new webpack.NoErrorsPlugin(),
    // 生成一个html文件，如果需要生成多个html文件则多设定几次该插件
    new HtmlWebpackPlugin({
        inject: true,  // 通过webpack生成一个注入所有文件的文件, e.g. bundle.js
        templateContent: templateContent(),  // html模板来源
        favicon: 'app/favicon.ico', // 给html添加一个favicon
    }),
    // new webpack.SourceMapDevToolPlugin({
    //     filename: '[file].map',
    //     include: ['app.js'],
    //     exclude: ['vendor.js'],
    //     columns: false
    // }),
];

module.exports = require('./webpack.base.config')({
    // 在开发中添加热部署
    entry: [
        'eventsource-polyfill', // 兼容能在IE下实现热部署
        'webpack-hot-middleware/client',
        path.join(process.cwd(), 'app/app.js'), // 从 app/app.js 开始
    ],

    // 为了最佳性能，不要在开发模式下使用hashes
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },

    // 添加开发所需插件
    plugins: dependencyHandlers().concat(plugins),

    // babel-loader的配置信息
    // 配置babel，我们需要热部署
    babelQuery: {
        presets: ['react-hmre'],
    },

    // 为了debugging更加方便，开放出资源布局
    devtool: 'source-map',
});

/**
 * 选择使用插件CommonsChunkPlugin来优化bundle's去处理对第三方依赖
 */
function dependencyHandlers() {
    return [
        // 提取公共模块，然后将公共模块打包到 vendor.js。
        // main1.js => a,b,c
        // main2.js => a,b
        // 结果：
        // vendor.js => a,b
        // main1.js => c
        // main2.js => 空
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', // The chunk name of the commons chunk. 
            children: true, // If true all children of the commons chunk are selected. 
            minChunks: 2, // 至少被多少个模块使用的组件才能被包含到公共区域当中
            async: true, // 异步加载
        }),
    ];
}

function templateContent() {
    const html = fs.readFileSync(
        path.resolve(process.cwd(), 'app/index.html')
    ).toString();

    return html;
}
