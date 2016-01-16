var express = require('express');
var router = express.Router();

var User = require('../models/User');
var Client = require('../models/Client');

router.get('/', function(req, res, next) {
  res.render('clientOrder');
});

router.post('/', function(req, res, next) {
  var user_name = req.cookies.user_name;

  if(!user_name) {
  	res.redirect('/login');
  }

  User.get(user_name, function(users) {
  	var user = new User(users[0]);
  	var client_id = user.user_id;

  	Client.get(function(clients) {
  		clients.filter(function(client) {
  			return client.clientid === client_id;
  		});

  		console.log(clients)
  	});
  });
});

module.exports = router;
