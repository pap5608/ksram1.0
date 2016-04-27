var mysql = require('mysql');
var client = mysql.createConnection({
	user: 'root',
	password: 'help*2*2',
	database: 'ksram'
});
module.exports = client;