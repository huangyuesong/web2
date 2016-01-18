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
    var level = (function () {
      if(business.business_level === 0) {
        return '旗舰店';
      } else if(business.business_level === 1) {
        return '一般';
      } else if(business.business_level === 2) {
        return '小商户';
      }
    })();

  	res.json({
  		business_name: business.business_name,
  		business_level: level,
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
