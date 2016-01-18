var conn = require('../config/mysql');

function Product(product) {
	this.product_id = product.product_id;
	this.product_type = product.product_type;
	this.product_name = product.product_name;
	this.product_moder = product.product_moder;
	this.product_description = product.product_description;
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

Product.add = function(product, callback) {
	var sql = 'insert into products set ?';

	var inserts = {
		product_type: product.product_type,
		product_name: product.product_name,
		product_description: product.product_description,
		product_factory: product.product_factory,
		product_price: product.product_price,
		product_date: product.product_date,
	};

	conn.query(sql, inserts, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

Product.update = function(product, callback) {
	var sql = [
		'update products',
		'set product_type = ?,',
		'product_name = ?,',
		'product_factory = ?,',
		'product_date = ?,',
		'product_description = ?,',
		'product_price = ?',
		'where product_id = ?',
	].join(' ');

	var inserts = [
		product.product_type,
		product.product_name,
		product.product_factory,
		product.product_date,
		product.product_description,
		product.product_price,
		product.product_id,
	];

	conn.query(sql, inserts, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

module.exports = Product;
