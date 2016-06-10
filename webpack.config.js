const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: 'public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      proxy: 'localhost:3000'
    })
  ]
}
