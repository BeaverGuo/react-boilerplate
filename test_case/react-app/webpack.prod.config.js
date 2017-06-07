/**
 * Copyright (c) 2016-present, ecidi.
 * All rights reserved.
 * 
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

module.exports = require('./webpack.base.config')({
    entry: [
        path.join(process.cwd(), 'app/app.js'),
    ],

    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
    },

    // 提取 css 文件
    // ExtractTextPlugin.extract可以有三个参数
        // 第一个参数是可选参数，传入一个loader，当css样式没有被抽取的时候可以使用该loader。
        // 第二个参数则是用于编译解析的css文件loader，很明显这个是必须传入的。
        // 第三个参数是一些额外的备选项，貌似目前只有传入publicPath，用于当前loader的路径。
    // style-loader 将样式注入到style中
    // css-loader 使css-module工作，模块当中能使用对象的方式来使用css
        // modules 符合css-module规范
        // importLoaders 后面连接的loader数量
    cssLoaders: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader?modules&importLoaders=1!postcss-loader',
    }),

    postcssPlugins: [
        // 补充:focus伪类的功能
        postcssFocus(),
        // 让css支持最新的语法
        cssnext({
            browsers: ['last 2 versions', 'IE > 10'],
        }),
        // 编译出现问题时报出错误
        postcssReporter({
            clearMessages: true,
        }),
    ],
    plugins: [
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

        // 排序输出
        new webpack.optimize.OccurrenceOrderPlugin(true),

        // 删除与NPM重复的数据，有效减小文件大小
        new webpack.optimize.DedupePlugin(),

        // 压缩 JavaScript，去掉一些不必要的警告
        // 在 webpack -p 时自动执行
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false, // 去掉一些不必要的警告
            },
        }),

        // 生成一个html文件，如果需要生成多个html文件则多设定几次该插件
        new HtmlWebpackPlugin({
            template: 'app/index.html', // html模板来源
            minify: {
                removeComments: true, // 去掉注释信息
                collapseWhitespace: true, // 合并空白符
                removeRedundantAttributes: true, // 去掉多余的属性，比如某些默认属性
                useShortDoctype: true, // 使用 <!DOCTYPE html>
                removeEmptyAttributes: true, // 去掉空白的属性，比如 id = " "
                removeStyleLinkTypeAttributes: true, // 去掉 style 和 link 标签的 type="text/css"
                keepClosingSlash: true, // 保持标签闭合
                minifyJS: true, // 压缩 JavaScript (使用 UglifyJS)
                minifyCSS: true, // 压缩 CSS (uses clean-css)
                minifyURLs: true, // 压缩 URLs (uses relateurl)
            },
            inject: true, // 制定资源存放位置
            favicon: 'app/favico.ico', // 给html添加一个favicon
        }),

        // 针对提取出来的css文件进行操作，也是有三个变量
        // new ExtractTextPlugin([id: string], filename: string, [options])
            // 该插件实例的唯一标志，一般是不会传的，其自己会生成。
            // 文件名。可以是[name]、[id]、[contenthash]
                // [name]：将会和entry中的chunk的名字一致
                // [id]：将会和entry中的chunk的id一致
                // [contenthash]：根据内容生成hash值
            // options
                // allchunk： 是否将所有额外的chunk都压缩成一个文件
                // disable：禁止使用插件
        new ExtractTextPlugin('[name].[contenthash].css'),

        // 离线缓存机制
        new OfflinePlugin({
            excludes: ['.htaccess'],

            caches: {
                main: [':rest:'],
                additional: ['*.chunk.js'],
            },

            safeToUseOptionalCaches: true,

            AppCache: {
                caches: ['main', 'additional'],
            },
        }),
    ],
});
