// Based off of https://github.com/jerrysu/webpack-boilerplate/blob/master/webpack.config.dev.js

var path = require('path');
var webpack = require('webpack');
var postcssImport = require('postcss-import');

module.exports = {

  entry: [
    './src/app'
  ],

  output: {
    path: path.resolve(__dirname, ""),
    filename: 'bundle.js'
  },

  resolve: {
    root: path.join(__dirname, 'src'),
    modulesDirectories: ['node_modules', 'src/components', 'src', 'src/lib'],
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          cacheDirectory: true
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss'
        ],
        exclude: /node_modules/
      },
      {test: /\.css$/, loaders: ['style', 'css', 'postcss'], include: /node_modules/},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {test: /\.gif/, loader: 'url-loader?limit=10000&mimetype=image/gif'},
      {test: /\.jpg/, loader: 'url-loader?limit=10000&mimetype=image/jpg'},
      {test: /\.png/, loader: 'url-loader?limit=10000&mimetype=image/png'}
    ]
  },

  postcss: [
    require('autoprefixer'),
    postcssImport({path: ['src/styles', 'src']}),
    require('postcss-cssnext'),
    require('postcss-color-rgba-fallback'),
    require('postcss-focus'),
    require('postcss-hexrgba'),
    require('postcss-opacity'),
    require('postcss-nested')
  ]
};
