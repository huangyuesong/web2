var express = require('express');
var router = express.Router();

var User = require('../models/User');

router.get('/', function(req, res, next) {
	res.clearCookie('user_id');
	res.clearCookie('user_type');

   res.render('login');
});

router.post('/', function(req, res, next) {
	var userId = req.body.username;
	var password = req.body.password;

	User.getByUserId(userId, function(users) {
		var user = new User(users[0]);
		
		if(password === user.user_password) {
			res.cookie('user_id', user.user_id);
			res.cookie('user_type', user.user_type);

			if(user.user_type === 'admin') {
				res.json({
					url: '/login',
				});
			} else if(user.user_type === 'customer') {
				res.json({
					url: '/clientOrder',
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
