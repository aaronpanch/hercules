const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: 'public',
    filename: 'assets/app.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins:[
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
    new ExtractTextPlugin('assets/styles.css'),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ]
}
