/* eslint-disable max-len, global-require */
// Based off of https://github.com/jerrysu/webpack-boilerplate/blob/master/webpack.config.dev.js

const path = require('path');
const webpack = require('webpack');
const postcssImport = require('postcss-import');

const NODE_ENV = process.env.NODE_ENV;

const env = {
  production: NODE_ENV === 'production',
  staging: NODE_ENV === 'staging',
  test: NODE_ENV === 'test',
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined',
};

module.exports = {

  entry: [
    './src/app-mounter',
  ],

  output: {
    path: path.resolve(__dirname, ''),
    filename: 'bundle.js',
  },

  resolve: {
    root: path.join(__dirname, 'src'),
    modulesDirectories: ['node_modules', 'src/components', 'src', 'src/lib'],
    extensions: ['', '.js', '.jsx'],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss',
        ],
        exclude: /node_modules/,
      },
      { test: /\.css$/, loaders: ['style', 'css', 'postcss'], include: /node_modules/ },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: /\.gif/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
      { test: /\.jpg/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
      { test: /\.png/, loader: 'url-loader?limit=10000&mimetype=image/png' },
    ],
  },

  postcss: [
    postcssImport({ path: ['src/styles', 'src'] }),
    require('postcss-cssnext'),
    require('postcss-color-rgba-fallback'),
    require('postcss-focus'),
    require('postcss-hexrgba'),
    require('postcss-opacity'),
    require('postcss-nested'),
  ],

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: env.development,
      __STAGING__: env.staging,
      __PRODUCTION__: env.production,
      __CURRENT_ENV__: `\'${NODE_ENV}\'`,
    }),
  ],
};
