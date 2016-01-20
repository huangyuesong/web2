var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(req.cookies === undefined || req.cookies.user_id === undefined) {
  	res.render('login');
  }
  next();
});

module.exports = router;