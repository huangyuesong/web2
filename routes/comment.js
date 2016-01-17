var express = require('express');
var router = express.Router();

var Appraise = require('../models/Appraise');
var Order = require('../models/Order');

router.post('/', function(req, res, next) {
	var client_id = req.cookies.user_id;
	var order_id = req.body.order_id;
	var product_id = req.body.product_id;
	var comment_content = req.body.comment_content;

	Appraise.add(new Appraise({
		client_id: client_id,
		product_id: product_id,
		appraise_content: comment_content,
	}), function(result) {
		Order.comment(order_id, function(result) {
			res.status(200).end();
		});
	});
});

module.exports = router;
