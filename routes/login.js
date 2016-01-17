var express = require('express');
var router = express.Router();

var User = require('../models/User');

router.get('/', function(req, res, next) {
	res.clearCookie('user_name');
	res.clearCookie('user_type');

  res.render('personCenter');
});

router.post('/', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	User.getByUserName(username, function(users) {
		var user = new User(users[0]);
		if(password === user.user_password) {
			res.cookie('user_name', user.user_name);
			res.cookie('user_type', user.user_type);

			if(user.user_type === 'admin') {
				res.json({
					url: '/login',
				});
			} else if(user.user_type === 'customer') {
				res.json({
					url: '/clientCenter',
				});
			} else if(user.user_type === 'seller') {
				res.json({
					url: '/login',
				});
			}
		} else {
			res.json({
				passwordError: true,
			});
		}
	});
});

module.exports = router;
