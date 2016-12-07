var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var NODE_ENV = JSON.stringify(process.env.NODE_ENV || 'development');

var exportsObject = {
  devtool: (NODE_ENV == 'production') ? false : 'eval',

  context: __dirname,

  entry: {
    bundle: './app/core.js',
    style: './assets/sass/index.sass'
  },

  output: {
    filename: '[name].js',
    path: './assets',
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': NODE_ENV,
    }),
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    })
  ],
};

if (NODE_ENV == 'production') {
  exportsObject.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      comments: false,
      compress: {
        warnings: false
      }
    })
  );
    exportsObject.plugins.push(
    new webpack.optimize.DedupePlugin()
  );
}

module.exports = exportsObject;