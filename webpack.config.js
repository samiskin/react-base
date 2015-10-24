'use strict';

var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './src/app.js'
  ],

  output: {
    path: __dirname,
    filename: 'bundle.js',
  },

  resolve: {
    root: path.join(__dirname, 'src'),
    modulesDirectories: ['node_modules','components', 'src', 'lib'],
    extensions: ['', '.js'],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'keyMirror': 'keymirror'
    })
  ],

  module: {
    loaders: [
      {test: /\.jsx?$/, loaders: ['react-hot', 'babel?cacheDirectory&blacklist[]=validation.react&optional[]=es7.classProperties'], exclude: /node_modules/},
      {test: /\.json$/, loaders: ['json']},
      {test: /\.scss$/, loaders: ['style', 'css-loader?modules', 'postcss', 'sass']},
      {test: /\.css$/, loaders: ['style', 'css', 'postcss']}
    ]
  },

  devtool: "#inline-source-map"

}
