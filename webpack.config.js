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
    path: "./",
    filename: 'bundle.js',
  },

  resolve: {
    root: path.join(__dirname, 'src'),
    modulesDirectories: ['node_modules', 'src'],
    extensions: ['', '.js', '.jsx'],
    alias: {
      'React': 'react/addons'
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'React': 'react/addons'
    })
  ],

  module: {
    loaders: [
      {test: /\.jsx?$/, loaders: ['react-hot', 'babel?stage=0'], exclude: /node_modules/},
      {test: /\.json$/, loaders: ['json']},
      {test: /\.scss$/, loaders: ['style', 'css', 'sass']},
      {test: /\.css$/, loaders: ['style', 'css']}
    ]
  },

  devtool: "#inline-source-map"

}
