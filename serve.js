var http = require('http');
var express = require('express');
var app = express();
var compress = require('compression');

app.use(compress());
app.use('/', express.static(__dirname + '/dist'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() { console.log('listening');});
