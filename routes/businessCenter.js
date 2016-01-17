var express = require('express');
var router = express.Router();

var moment = require('moment');

var Business = require('../models/Business');

router.get('/', function(req, res, next) {
  res.render('businessCenter');
});

router.post('/', function(req, res, next) {
  var business_id = req.cookies.user_id;

  Business.getByBusinessId(business_id, function(business) {
  	business = business[0];
  	var time = moment(business.business_create_time);

  	res.json({
  		business_name: business.business_name,
  		business_level: business.business_level,
  		business_phone: business.business_phone,
  		business_address: business.business_address,
  		business_create_time: [time.year(), time.month() + 1, time.date()].join('-'),
  	});
  });
});

router.post('/saveChange', function(req, res, next) {
  var business_id = req.cookies.user_id;
  var business_phone = req.body['business-phone'];

  Business.savePhoneChange(business_id, business_phone, function(result) {
  	console.log(result)
  	res.redirect('/businessCenter');
  });
});

module.exports = router;
