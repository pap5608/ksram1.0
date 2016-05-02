//layout and static binding 
var bodyParser = require('body-parser')
var express = require('express')
var router = express.Router()
var db = require('../db/db')
router.use(bodyParser.json());


router.get('/:id', function(req, res, next) {
		db.query('SELECT * FROM os_query where 폐기=0', function(error, results) {
				res.send(results);
		});
  		
 })

module.exports = router