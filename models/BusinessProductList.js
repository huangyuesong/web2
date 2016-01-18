var conn = require('../config/mysql');

function BusinessProductList(businessProductList) {
	this.business_id = businessProductList.business_id;
	this.product_id = businessProductList.product_id;
	this.business_product_create_time = businessProductList.business_product_create_time;
	this.business_product_change_time = businessProductList.business_product_change_time;
};

BusinessProductList.getByBusinessId = function(business_id, callback) {
	var sql = [
		'select *',
		'from business_product_list',
		'where business_id = ?',
	].join(' ');

	var inserts = [business_id];

	conn.query(sql, inserts, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

BusinessProductList.deleteByBusinessIdAndProductId = function(business_id, product_id, callback) {
	var sql = [
		'delete',
		'from business_product_list',
		'where business_id = ?',
		'and product_id = ?',
	].join(' ');

	var inserts = [business_id, product_id];

	conn.query(sql, inserts, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

BusinessProductList.add = function(business_id, product_id, callback) {
	var sql = 'insert into business_product_list set ?';

	var inserts = {
		business_id: business_id,
		product_id: product_id,
	};

	conn.query(sql, inserts, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

module.exports = BusinessProductList;
