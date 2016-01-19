var express = require('express');
var router = express.Router();

var moment = require('moment');

var User = require('../models/User');
var Business = require('../models/Business');

router.get('/', function(req, res, next) {
  res.render('userBusinessMessage');
});

router.post('/', function(req, res, next) {
  Business.get(function(business) {
  	business.map(function(b) {
      var time = moment(b.business_create_time);
      b.business_create_time = time.year() + '年' + (time.month() + 1) + '月' + time.date() + '日';

      b.business_levelCode = b.business_level;
      if(b.business_level === 0) {
        b.business_level = '旗舰店';
      } else if(b.business_level === 1) {
        b.business_level = '一般';
      } else if(b.business_level === 2) {
        b.business_level = '小商户';
      }
    });

  	res.json(business);
  });
});

router.post('/delete', function(req, res, next) {
  var business_id = req.body.business_id;

  User.delete(business_id, function(result) {
    Business.delete(business_id, function(result) {
      res.status(200).end();
    });
  });
});

router.post('/add', function(req, res, next) {
  var business_level = req.body.level;
  var business_phone = req.body.phone;
  var business_address = req.body.address;
  var user_id = req.body.id;
  var user_name = req.body.name;
  var user_type = 'seller';
  var user_password = req.body.password;

  User.add({
  	user_id: user_id,
  	user_name: user_id,
  	user_type: user_type,
  	user_password: user_password,
  }, function(result) {
    Business.addAll({
      business_id: user_id,
      business_name: user_name,
      business_address: business_address,
      business_phone: business_phone,
      business_level: business_level,
    }, function(result) {
      res.redirect('/userBusiness');
    });
  });
});

router.post('/update', function(req, res, next) {
  var business_id = req.body.id;
  var business_name = req.body.name;
  var business_level = req.body.level;
  var business_phone = req.body.phone;
  var business_address = req.body.address;
  
  Business.update({
    business_id: business_id,
    business_name: business_name,
    business_level: business_level,
    business_phone: business_phone,
    business_address: business_address,
  }, function(result) {
    res.redirect('/userBusiness');
  });
});

module.exports = router;
