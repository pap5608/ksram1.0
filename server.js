var express = require('express');
var router = require('./controller/static');
var app = express();

app.use(router);

app.listen(3000, function() {
    console.log('Server listening on', 3000);

});
