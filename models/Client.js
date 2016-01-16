var conn = require('../config/mysql');

function Client(client) {
	this.client_id = client.client_id;
	this.client_name = client.client_name;
	this.client_address = client.client_address;
	this.client_phone = client.client_phone;
	this.client_level = client.client_level;
	this.client_created_time = client.client_created_time;
};

Client.get = function(callback) {
	var sql = [
		'select *',
		'from clients',
	].join(' ');

	conn.query(sql, function(err, rows, fields) {
	  if (err) throw err;

	  return callback(rows);
	});
};

module.exports = Client;
