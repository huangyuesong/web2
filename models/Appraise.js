var conn = require('../config/mysql');

function Appraise(appraise) {
	this.client_id = appraise.client_id;
	this.product_id = appraise.product_id;
	this.appraise_content = appraise.appraise_content;
	this.appraise_time = appraise.appraise_time;
	this.appraise_img = appraise.appraise_img;
};

Appraise.get = function(callback) {
	var sql = [
		'select *',
		'from appraise',
	].join(' ');

	conn.query(sql, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

Appraise.add = function(appraise, callback) {
	var sql = 'insert into appraise set ?';

	var inserts = {
		client_id: appraise.client_id,
		product_id: appraise.product_id,
		appraise_content: appraise.appraise_content,
	};

	conn.query(sql, inserts, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
}

module.exports = Appraise;
