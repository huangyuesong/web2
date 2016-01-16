var conn = require('../config/mysql');

function Appraise(appraise) {
	this.client_id = appraise.client_id;
	this.product_id = appraise.product_id;
	this.appraise_content = appraise.appraise_content;
	this.appraise_time = appraise.appraise_time;
	this.appraise_image = appraise.appraise_image;
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

module.exports = Appraise;
