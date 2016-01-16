var conn = require('../config/mysql');

function Business(business) {
	this.business_id = business.business_id;
	this.business_name = business.business_name
	this.business_address = business.business_address;
	this.business_phone = business.business_phone;
	this.business_create_time = business.business_create_time;
	this.business_level = business.business_level;
};

Business.get = function(callback) {
	var sql = [
		'select *',
		'from business',
	].join(' ');

	conn.query(sql, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

module.exports = Business;
