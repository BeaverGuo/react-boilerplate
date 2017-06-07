import path from 'path'

import webpack from 'webpack'


import { WDS_PORT } from './src/shared/config'
import { isProd } from './src/shared/util'

//In development mode, we are going to use webpack-dev-server to take advantage of 
//Hot Module Reloading, and in production we'll simply use webpack to generate bundles. 

export default {
    entry: [
        'react-hot-loader/patch', //react hmr
        './src/client', //webpack entry default index.js
    ],

    output: {
        filename: 'js/bundle.js',  //bundle generated, in dist folder
        path: path.resolve(__dirname, 'dist'),//destination folder
        publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`, //URL
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
            {
              test: /\.(eot|svg|ttf|woff|woff2)$/,
              loader: 'file-loader',
            }, {
              test: /\.(jpg|png|gif)$/,
              use: [
                { loader: 'file-loader' },
                {
                  loader: 'image-webpack-loader',
                  options: {
                    progressive: true,
                    optimizationLevel: 7,
                    interlaced: false,
                    pngquant: {
                      quality: '65-90',
                      speed: 4,
                    },
                  },
                },
              ],
            }, {
              test: /\.html$/,
              loader: 'html-loader',
            }, {
              test: /\.(mp4|webm)$/,
              loader: 'url-loader',
              options: {
                limit: 10000,
              },
            }
        ]
    },

    devtool: isProd ? false : 'source-map',

    resolve: {
        extensions: ['.js', '.jsx'],
    },
    
    devServer: {
        port: WDS_PORT, //webpack-dev-server port number
        hot: true,  //hot reload
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
}
