var express = require('express');
var router = express.Router();

var User = require('../models/User');
var Client = require('../models/Client');
var Business = require('../models/Business');

router.get('/', function(req, res, next) {
  res.render('userClientMessage');
});

router.post('/', function(req, res, next) {
  User.get(function(users) {
  	users = users.filter(function(user) {
  		return user.user_type !== 'admin';
  	});

  	res.json(users);
  });
});

router.post('/delete', function(req, res, next) {
  var user_id = req.body.user_id;
  var user_type = req.body.user_type;

  User.delete(user_id, function(result) {
    if(user_type === 'customer') {
      Client.delete(user_id, function(result) {
        res.status(200).end();
      });
    } else if(user_type === 'seller') {
      Business.delete(user_id, function(result) {
        res.status(200).end();
      });
    }
  });
});

router.post('/add', function(req, res, next) {
  var user_id = req.body.name;
  var user_name = req.body.name;
  var user_type = req.body.type;
  var user_password = req.body.password;

  User.add({
  	user_id: user_id,
  	user_name: user_name,
  	user_type: user_type,
  	user_password: user_password,
  }, function(result) {
    if(user_type === 'customer') {
      Client.add({
        client_id: user_id,
        client_name: user_name,
      }, function(result) {
        res.redirect('/userClient');
      });
    } else if(user_type === 'seller') {
      Business.add({
        business_id: user_id,
        business_name: user_name,
      }, function(result) {
        res.redirect('/userClient');
      });
    }
  });
});

router.post('/update', function(req, res, next) {
  var user_id = req.body.id;
  var user_password = req.body.password;

  User.update({
  	user_id: user_id,
  	user_password: user_password,
  }, function(result) {
  	res.redirect('/userClient');
  });
});

module.exports = router;
