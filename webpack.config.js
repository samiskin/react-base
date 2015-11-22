'use strict';

var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var postcssImport = require('postcss-import');

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
    new webpack.HotModuleReplacementPlugin()
  ],

  postcss: function (webpack) {
    return [
      postcssImport({
        addDependencyTo: webpack,
        path: '/'
      }),
      autoprefixer,
      precss
    ];
  },

  module: {
    loaders: [
      {test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.json$/, loader: 'json'},
      {test: /\.css$/, loaders: ['style', 'css?modules', 'postcss']}
    ]
  },

  devtool: "#inline-source-map"

}
