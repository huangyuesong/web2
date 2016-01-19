var express = require('express');
var router = express.Router();

var moment = require('moment');

var Business = require('../models/Business');
var BusinessProductList = require('../models/BusinessProductList');
var Product = require('../models/Product');

router.get('/', function(req, res, next) {
  res.render('businessProductList');
});

router.post('/', function(req, res, next) {
  var business_id = req.cookies.user_id;
  
  Business.getByBusinessId(business_id, function(business) {
  	business = business[0];

  	BusinessProductList.getByBusinessId(business.business_id, function(lists) {
  		Product.get(function(products) {
  			lists.map(function(list) {
  				for(var i = 0; i < products.length; ++i) {
  					if(products[i].product_id === list.product_id) {
  						var time = moment(products[i].product_date);

  						list.product_name = products[i].product_name;
  						list.product_type = products[i].product_type;
  						list.product_description = products[i].product_description;
  						list.product_factory = products[i].product_factory;
  						list.product_price = products[i].product_price;
  						list.product_date = time.year() + '年' + (time.month() + 1) + '月' + time.date() + '日';
              list.dateFormat = time.format('YYYY-MM-DD');
  					}
  				}
  			});
  			res.json(JSON.stringify(lists));
  		});
  	});
  });
});

router.post('/delete', function(req, res, next) {
  var business_id = req.cookies.user_id;
  var product_id = req.body.product_id;
  
  BusinessProductList.deleteByBusinessIdAndProductId(business_id, product_id, function(result) {
  	console.log(result)
  	res.status(200).end();
  });
});

router.post('/add', function(req, res, next) {
  var business_id = req.cookies.user_id;
  var product_type = req.body.type;
  var product_name = req.body.name;
  var product_factory = req.body.factory;
  var product_date = req.body.date;
  var product_description = req.body.desc;
  var product_price = req.body.price;

  Product.add({
		product_type: product_type,
		product_name: product_name,
		product_description: product_description,
		product_factory: product_factory,
		product_price: product_price,
		product_date: product_date,
	}, function(result) {
		var product_id = result.insertId;

		BusinessProductList.add(business_id, product_id, function(result) {
			res.redirect('/businessProductList');
		});
	});
});

router.post('/change', function(req, res, next) {
  var business_id = req.cookies.user_id;
  var product_type = req.body.type;
  var product_name = req.body.name;
  var product_factory = req.body.factory;
  var product_date = req.body.date;
  var product_description = req.body.desc;
  var product_price = req.body.price;
  var product_id = req.body.id;

  Product.update({
  	product_type: product_type,
  	product_name: product_name,
  	product_factory: product_factory,
  	product_date: product_date,
  	product_description: product_description,
  	product_price: product_price,
  	product_id: product_id,
  }, function(result) {
  	console.log(result)
  	res.redirect('/businessProductList');
  });
});

module.exports = router;
