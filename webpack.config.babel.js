var ExtractTextPlugin = require('extract-text-webpack-plugin');
export default {
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
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: Extract.extract({
            loader: 'css-loader?sourceMap'
        })
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true })
  ]
};
