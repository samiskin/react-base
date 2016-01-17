/* eslint-disable */
var config = require('./webpack.config.development');
var express = require('express');
var path = require('path');
var webpack = require('webpack');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(__dirname));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, './index.html'));
});

app.listen(8080, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:8080');
});
