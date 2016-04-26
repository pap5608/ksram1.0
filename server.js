var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
//app.use('/api/posts',require('./controller/api/posts'));
//app.use('/',require('./controller/static'));
app.listen(3000, function() {
    console.log('Server listening on', 3000);

});
