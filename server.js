var express = require('express');
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var proxy = require('proxy-middleware');
var url = require('url');

var config = require('./webpack.config');

var port = 8080;
var siteUrl = 'http://react.base.dev';


var server = new WebpackDevServer(webpack(config), {
  quiet: false,
  noInfo: false,
  lazy: true,
  hot: true,
  filename: "bundle.js",
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  contentBase: config.output.path,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  },

  proxy: {
    siteUrl: "http://localhost:" + port
  }
});

server.listen(port);
console.log('Listening to port ' + port);
