/**
 * New node file
 */

var http = require('http');
var fs = require('fs');
var express = require('express');
var socketio = require('socket.io');
var app = express();

var ejs = require('ejs');
var bodyParser = require('body-parser');

// db connection
var client = require('mysql').createConnection({
	user:'root',
	password:'help*2*2',
	database:'ksram'
	
});

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ exteneded: false}));

http.createServer(app).listen('5608',function() {
	console.log('Server Start');
});


app.get('/',function(request, response) {
	fs.readFile('index.html','utf8',function(error, data){
		client.query('SELECT * FROM os_query', function(error, results) {    
			response.send(ejs.render(data, {
				data : results
			}));
		});
		
	});
});

//var io = socketio.listen(server);



// db connection required..sorry
//io.sockets.on('connection', function(socket){
	

	
	
//});

