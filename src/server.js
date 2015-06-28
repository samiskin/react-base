var express = require('express');
var fs = require('fs');
var path = require('path');

var server = express();

var html = fs.readFileSync(path.join(__dirname, '/index.html'))

server.get('/*', function(req,res) {
    res.contentType = 'text/html; charset=utf8';
    res.end(html);
});

var port = 5000;
server.listen(port, function() {
    console.log('Listening to port ' + port);
});
