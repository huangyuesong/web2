var express = require('express');
var router = express.Router();

var conn = require('../config/mysql');

var utils = require('../utils/index');

router.get('/', function(req, res, next) {
  res.render('clientCenter');
});

module.exports = router;
