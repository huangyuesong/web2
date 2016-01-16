var conn = require('../config/mysql');

function BusinessProductList(businessProductList) {
	this.business_id = businessProductList.business_id;
	this.product_id = businessProductList.product_id;
	this.business_product_create_time = businessProductList.business_product_create_time;
	this.business_product_change_time = businessProductList.business_product_change_time;
};

ProductList.get = function(callback) {
	var sql = [
		'select *',
		'from business_product_list',
	].join(' ');

	conn.query(sql, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

module.exports = BusinessProductList;
