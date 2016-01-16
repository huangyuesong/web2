var conn = require('../config/mysql');

function Product(product) {
	this.product_id = product.product_id;
	this.product_type = product.product_type;
	this.product_name = product.product_name;
	this.product_moder = product.product_moder;
	this.product_desc = product.product_decription;
	this.product_factory = product.product_factory;
	this.product_date = product.product_date;
	this.product_create_time = product.product_create_time;
	this.product_price = product.product_price;
};

Product.get = function(callback) {
	var sql = [
		'select *',
		'from products',
	].join(' ');

	conn.query(sql, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

module.exports = Product;
