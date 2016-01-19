var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(!req.cookies.user_id) {
  	res.redirect('/login');
  }
  next();
});

module.exports = router;