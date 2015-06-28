var express = require('express');
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var proxy = require('proxy-middleware');
var url = require('url');

var server = express();
var config = require('../webpack.config');

var port = 3000;
var host = "127.0.0.1";
var siteUrl = 'http://react.base.dev';

server.use('/assets', proxy(url.parse('http://localhost:3001/assets')));

server.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});


new WebpackDevServer(webpack(config), {
  contentBase: config.output.path,
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: false,
  quiet: false,
  watchDelay: 200,
  stats: {
    colors: true
  }
}).listen(3001, host, function(err) {
  if (err) {
    console.log(err);
  }
});

server.listen(port);
console.log('Listening to port ' + port);
