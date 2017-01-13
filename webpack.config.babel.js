const { resolve } = require('path');
var path = require('path');
const webpack = require('webpack');

export default {

    output: {
        filename: 'client-bundle.js',
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel'],
                exclude: [/node_modules/],
            },
        ],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),// enable HMR globally
        new webpack.NoErrorsPlugin(),
        new webpack.NamedModulesPlugin(),// prints more readable module names in the browser console on HMR updates
    ],

    resolve: {
        extension: ['', '.js', '.jsx'],
    },
};