import path from 'path'

import webpack from 'webpack'


import { WDS_PORT } from './src/shared/config'
import { isProd } from './src/shared/util'

export default {
    entry: [
        'react-hot-loader/patch', //react hmr
        './src/client', //webpack entry default index.js
    ],

    output: {
        filename: 'js/bundle.js',  //bundle generated
        path: path.resolve(__dirname, 'dist'),//destination folder
        publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`, //URL
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
        ],
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
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
}
