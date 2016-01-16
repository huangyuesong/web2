var express = require('express');
var router = express.Router();

var conn = require('../config/mysql');

var utils = require('../utils/index');

router.get('/', function(req, res, next) {
	res.clearCookie('user_name');
	res.clearCookie('user_type');

  res.render('login');
});

router.post('/', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	var sql = [
		'select user_name, user_type',
		'from users',
		'where user_name = ', utils.formatDBString(username),
		'and user_password = ', utils.formatDBString(password),
	].join(' ');

	conn.query(sql, function(err, rows, fields) {
	  if (err) throw err;

	  if(rows.length) {
	  	res.cookie('user_name', rows[0]['user_name']);
	  	res.cookie('user_type', rows[0]['user_type']);

	  	var type = rows[0].user_type;
	  	if(type === 'admin') {
	  		res.redirect('/login');
	  	} else if(type === 'customer') {
	  		res.render('clientCenter');
	  	} else if(type === 'seller') {
	  		res.redirect('/login');
	  	} else {
	  		res.redirect('/login');
	  	}
	  }
	});
});

module.exports = router;
