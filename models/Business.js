var conn = require('../config/mysql');

function Business(business) {
	this.business_id = business.business_id;
	this.business_name = business.business_name
	this.business_address = business.business_address;
	this.business_phone = business.business_phone;
	this.business_create_time = business.business_create_time;
	this.business_level = business.business_level;
};

Business.getByBusinessId = function(business_id, callback) {
	var sql = [
		'select *',
		'from business',
		'where business_id = ?'
	].join(' ');

	var inserts = [business_id];

	conn.query(sql, inserts, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

Business.savePhoneChange = function(business_id, business_phone, callback) {
	var sql = [
		'update business',
		'set business_phone = ?',
		'where business_id = ?'
	].join(' ');

	var inserts = [business_phone, business_id];

	conn.query(sql, inserts, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

Business.delete = function(business_id, callback) {
	var sql = [
		'delete',
		'from business',
		'where business_id = ?',
	].join(' ');

	var inserts = [business_id];

	conn.query(sql, inserts, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

Business.add = function(business, callback) {
	var sql = 'insert into business set ?';

	var inserts = {
		business_id: business.business_id,
		business_name: business.business_name,
		business_level: 0,
	};

	conn.query(sql, inserts, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

module.exports = Business;
