//layout and static binding 
var bodyParser = require('body-parser')
var express = require('express')
var router = express.Router()
router.use(bodyParser.json());
router.use(express.static(__dirname+'/../asset'))
router.use(express.static(__dirname+'/../css'))
router.use(express.static(__dirname+'/../template'))
router.get('/', function (req, res) {
	res.sendfile('layouts/main.html');
})



module.exports = router
