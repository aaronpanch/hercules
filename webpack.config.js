const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    main: './src/client/index.js',
  },
  devtool: devMode ? 'cheap-module-eval-source-map' : '',
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    port: 8080,
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode
        ? 'assets/[name].css'
        : 'assets/[name].[contenthash].css',
      chunkFilename: devMode
        ? 'assets/[id].css'
        : 'assets/[id].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify:
        process.env.NODE_ENV === 'production'
          ? {
            minifyCSS: true,
            collapseWhitespace: true,
            removeComments: true,
          }
          : false,
    }),
  ],
  output: {
    filename: devMode ? 'assets/[name].js' : 'assets/[name].[chunkhash].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
};
