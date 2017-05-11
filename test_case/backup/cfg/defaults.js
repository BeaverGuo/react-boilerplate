/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 8080;

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
  return {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: "pre",
        loader: "eslint-loader",
        options: { includePaths: srcPath }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.sass/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.less/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.styl/,
        use: ['style-loader','css-loader','stylus-loader']
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        use: [{loader:'url-loader', options: {limit: 8192} }]
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      }
    ]
  };
}

module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',
  port: dfltPort,
  getDefaultModules: getDefaultModules
};
