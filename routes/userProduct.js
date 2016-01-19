var express = require('express');
var router = express.Router();

var moment = require('moment');

var Product = require('../models/Product');

router.get('/', function(req, res, next) {
  res.render('userProductMessage');
});

router.post('/', function(req, res, next) {
  Product.get(function(products) {
  	products.map(function(product) {
      var date = moment(product.product_date);
      var create_time = moment(product.product_create_time);

      product.product_date = date.year() + '年' + (date.month() + 1) + '月' + date.date() + '日';
      product.product_create_time = create_time.year() + '年'
                                  + (create_time.month() + 1) + '月'
                                  + create_time.date() + '日';
      product.dateFormat = date.format('YYYY-MM-DD');
    });

  	res.json(products);
  });
});

router.post('/delete', function(req, res, next) {
  var product_id = req.body.product_id;

  Product.delete(product_id, function(result) {
    res.status(200).end();
  });
});

router.post('/add', function(req, res, next) {
  var product_type = req.body.type;
  var product_name = req.body.name;
  var product_moder = req.body.moder;
  var product_description = req.body.desc;
  var product_factory = req.body.factory;
  var product_date = req.body.date;
  var product_price = req.body.price;

  Product.add({
    product_type: product_type,
    product_name: product_name,
    product_moder: product_moder,
    product_description: product_description,
    product_factory: product_factory,
    product_date: product_date,
    product_price: product_price,
  }, function(result) {
    res.redirect('/userProduct');
  });
});

router.post('/update', function(req, res, next) {
  var product_id = req.body.id;
  var product_type = req.body.type;
  var product_name = req.body.name;
  var product_moder = req.body.moder;
  var product_description = req.body.desc;
  var product_factory = req.body.factory;
  var product_date = req.body.date;
  var product_price = req.body.price;

  Product.update({
    product_type: product_type,
    product_name: product_name,
    product_moder: product_moder,
    product_description: product_description,
    product_factory: product_factory,
    product_date: product_date,
    product_price: product_price,
    product_id: product_id,
  }, function(result) {
    res.redirect('/userProduct');
  });
});

module.exports = router;
