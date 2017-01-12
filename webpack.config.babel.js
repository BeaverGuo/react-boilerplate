const { resolve } = require('path');
const webpack = require('webpack');

export default {
    entry: [
        'react-hot-loader/patch',
        // activate HMR for React

        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
    ],
    output: {
        filename: 'client-bundle.js',
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
            },
        ],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally
        new webpack.NoErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
    ],

    resolve: {
        extension: ['', '.js', '.jsx'],
    },
};