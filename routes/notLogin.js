var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(undefined === req.cookies || undefined === req.cookies.user_id) {
  	res.render('login');
  }
  next();
});

module.exports = router;