var express = require('express');
var router = express.Router();

var User = require('../models/User');
var Client = require('../models/Client');
var Order = require('../models/Order');
var Product = require('../models/Product');

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

  		Order.get(function(orders) {
  			orders.filter(function(order) {
  				return order.client_id === client_id;
  			});

  			Product.get(function(products) {
  				var orderInfo = orders;
  				var productInfo = products;

  				orderInfo.map(function(order) {
  					for(var i = 0; i < productInfo.length; ++i) {
  						if(productInfo[i].product_id === order.product_id) {
  							order.product_name = productInfo[i].product_name;
  						}
  					}
  				});

  				res.json({orderInfo: orderInfo});
  			});
  		});
  	});
  });
});

module.exports = router;
