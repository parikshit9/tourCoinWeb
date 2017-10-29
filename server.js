var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var port = process.env.PORT || 9999;

app.use(bodyParser.json());

app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res){
	res.sendfile('./public/views/index.html');
})

app.listen(port);
console.log('app running on ' + port);