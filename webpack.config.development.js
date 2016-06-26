const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');

const config = Object.create(baseConfig);

config.entry = [
  'babel-polyfill',
  'webpack-hot-middleware/client',
  './src/app-mounter',
];

config.devtool = 'cheap-module-eval-source-map';

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: true,
  })
);

module.exports = config;
