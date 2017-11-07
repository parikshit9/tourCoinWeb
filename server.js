var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('/home/ubuntu/ssl2/worldtourism.key', 'utf8');
var certificate = fs.readFileSync('/home/ubuntu/ssl2/57755d0011fb26b6.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};


//var port = process.env.PORT || 80;

app.use(bodyParser.json());

app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  //Path to your main file
  res.sendfile(path.join('./public/views/index.html')); 
});

//app.listen(port);
//console.log('app running on ' + port);
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
httpServer.listen(80);
httpsServer.listen(443);
