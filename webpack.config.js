var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',

  context: __dirname,

  entry: {
    bundle: './app/core.js',
    style: './assets/sass/index.sass'
  },

  output: {
    filename: '[name].js',
    path: './assets/js',
    publicPath: '/assets/'
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: [/node_modules/],
      loader: "babel",
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.sass$/,
      loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap')
    }]
  },

  plugins: [
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    })
  ],

  devServer: {
    inline: true,
    port: 3003
  }
};